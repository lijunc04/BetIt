import random
import string
from flask import Blueprint, jsonify, request
from check_firebase_auth import check_firebase_auth
from firebase_admin import firestore
import datetime
betResponse = Blueprint('bets', __name__)

@betResponse.route('/bet', methods=['POST'])
@check_firebase_auth
def addBets():
    id_token = request.headers.get('Authorization')
    if not id_token:
        return None
    data = request.get_json()
    db = firestore.client()
    random_id = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
    
    bet_ref = db.collection('bets').document(random_id)
    bet_ref.set(data)
    
    user = request.user
    user_ref = db.collection('users').document(user['uid'])
    user_ref.set({'bets':firestore.ArrayUnion([bet_ref])}, merge=True)
    user_ref.update({'balance': firestore.Increment(-bet_ref.get().to_dict()['wager'])})

    return jsonify({'Success': ''})

@betResponse.route('/getbet', methods=['GET'])
@check_firebase_auth
def getBets():
    id_token = request.headers.get('Authorization')
    if not id_token:
        return jsonify({'error': 'No authorization token provided'}), 401
    bet_id = request.headers.get('bet_id')
    if not bet_id:
        return jsonify({'error': 'No bet_id provided'}), 401
    
    db = firestore.client()
    
    bet_ref = db.collection('bets').document(bet_id)
    bet = bet_ref.get()
    if not bet:
        return jsonify({'error': 'No bet found'}), 401
    return jsonify(bet.to_dict())

@betResponse.route('/completebet', methods=['PUT'])
@check_firebase_auth
def completeBets():
    id_token = request.headers.get('Authorization')
    if not id_token:
        return jsonify({'error': 'No authorization token provided'}), 401
    put_data = request.get_json()
    bet_index = put_data['bet_index']
    
    if bet_index == None:
        return jsonify({'error': 'No bet_id provided'}), 401
    
    db = firestore.client()
    
    user = request.user
    user_ref = db.collection('users').document(user['uid'])
    data = user_ref.get().to_dict()
    bets_refs = data.get('bets', [])
    bet_ref = bets_refs[bet_index]
    
    cur_time = datetime.datetime.now()
    print(cur_time.isoformat())
    
    bet_ref.update({'status': 'done', 'dueBy': cur_time.isoformat()})
        
    user_ref.update({
        'score': firestore.Increment(100), 
        'balance': firestore.Increment(bet_ref.get().to_dict()['wager']),
    })
    return jsonify({'Success': ''})


@betResponse.route('/invalidatebet', methods=['PUT'])
@check_firebase_auth
def invalidateBets():
    id_token = request.headers.get('Authorization')
    if not id_token:
        return jsonify({'error': 'No authorization token provided'}), 401
    put_data = request.get_json()
    bet_index = put_data['bet_index']
    print(bet_index)
    
    if bet_index == None:
        return jsonify({'error': 'No bet_id provided'}), 401
    
    db = firestore.client()
    
    user = request.user
    user_ref = db.collection('users').document(user['uid'])
    data = user_ref.get().to_dict()
    bets_refs = data.get('bets', [])
    bet_ref = bets_refs[bet_index]
    bet_ref.update({'status': 'pastdue'})
    user_ref.update({
        'score': firestore.Increment(-100), 
    })
    return jsonify({'Success': ''})