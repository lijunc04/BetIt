import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, Blueprint


load_dotenv()


leaderboard = Blueprint('leaderboard_v', __name__)

@leaderboard.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    try:
        db = firestore.client()
        users_ref = db.collection('users')
        users = users_ref.stream()

        user_list = []
        for user in users:
            user_data = user.to_dict()
            name = user_data.get('name')
            score = user_data.get('score', 0) 
            user_list.append({'name': name, 'score': score})

        sorted_users = sorted(user_list, key=lambda x: x['score'], reverse=True)

        leaderboard = []
        for rank, user in enumerate(sorted_users, start=1):
            leaderboard.append({
                'rank': rank,
                'name': user['name'],
                'score': user['score']
            })

        return jsonify(leaderboard=leaderboard), 200

    except Exception as e:
        return jsonify(error=str(e)), 500


    