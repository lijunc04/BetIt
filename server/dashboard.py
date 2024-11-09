from flask import Blueprint, jsonify, request
from check_firebase_auth import check_firebase_auth
from firebase_admin import firestore
dashboardResponse = Blueprint('dashboard', __name__)

def getAllInfo(uid):
    db = firestore.client()
    doc_ref = db.collection('users').document(uid)
    doc = doc_ref.get()
    if not doc.exists:
        doc_ref.set({
            'uid': uid,
            'balance': 0,
            'bets': {},
            'score': 0
        })
    return doc.to_dict()

@dashboardResponse.route("/dashboard", methods=['GET'])
@check_firebase_auth
def dashboard():
    user = request.user
    user_info = getAllInfo(user['uid'])
    return jsonify({
        'uid': user['uid'],
        'info': user_info,
    })