import random
import string
from flask import Blueprint, jsonify, request
from check_firebase_auth import check_firebase_auth
from firebase_admin import firestore
betResponse = Blueprint('bets', __name__)

@betResponse.route('/bet', methods=['POST'])
def addBets():
    id_token = request.headers.get('Authorization')
    if not id_token:
        return None
    data = request.json
    db = firestore.client()
    random_id = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
    
    bet_ref = db.collection('bets').document(random_id)
    bet_ref.set(data)
    
    user_ref = db.collection('user').document(id_token)
    user_ref.set({'bets': firestore.ArrayUnion([random_id])})

    return jsonify({'Success'})

@betResponse.route('/bet', method='POST')
def addBets():
    id_token = request.headers.get('Authorization')
    if not id_token:
        return None
    data = request.json
    db = firestore.client()
    random_id = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
    
    bet_ref = db.collection('bets').document(random_id)
    bet_ref.set(data)
    
    user_ref = db.collection('user').document(id_token)
    user_ref.set({'bets': firestore.ArrayUnion([random_id])})

    return jsonify({'Success'})