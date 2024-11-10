from functools import wraps
from flask import request, jsonify, redirect
import firebase_admin
from firebase_admin import auth, credentials
import os
from dotenv import load_dotenv

load_dotenv()

cred = credentials.Certificate(os.environ['JSON_PATH'])
firebase_admin.initialize_app(cred)

def check_firebase_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'error': 'No authorization token provided'}), 401
        try:
            token = auth_header.split('Bearer ')[1]
        except IndexError:
            return jsonify({'error': 'Invalid token format'}), 401
        try:
            decoded_token = auth.verify_id_token(token)
            request.user = {
                'uid': decoded_token['uid'],
                'email': decoded_token.get('email'),
                'email_verified': decoded_token.get('email_verified', False),
                'name': decoded_token['name']
            }
            
            return f(*args, **kwargs)
            
        except Exception as e:
            print(f"Error verifying token: {e}")
            return jsonify({'error': 'Invalid token'}), 401
            
    return decorated_function