import requests
import os
from flask import Blueprint, jsonify, request

gptresponse = Blueprint('openai_api', __name__)

@gptresponse.route('/gptresponse/<string:route_param>', methods=['GET'])
def getImageVerification():
    api_key = os.environ['OPEN_AI_KEY']
    url = 'https://api.openai.com/v1/chat/completions'
    
    param = request.args.get('query_param')
    model = "gpt-3.5-turbo",
    
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    data = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are ChatGPT, a helpful assistant."},
            {"role": "user", "content": param}
        ],
        "temperature": 0.7
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        return api_key
    