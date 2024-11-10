import boto3
from openai import OpenAI
import base64
from flask import Blueprint, jsonify, request
import os
import json
from dotenv import load_dotenv

load_dotenv()

rekognition_client = boto3.client('rekognition')
client = OpenAI()
client.api_key = os.getenv("OPENAI_API_KEY")


verify = Blueprint('verify_line', __name__) 

@verify.route('/verify', methods=['POST', 'GET'])
def getImageVerification():
    print('here')
    if request.method == 'GET':
        return "Please send a POST request with an image and task description."
    
    image_file = request.files.get('image')
    task_description = request.form.get('task_description')
    print('here1')
    if not image_file or not task_description:
        return jsonify({"error": "Image and task description are required"}), 400

    image_bytes = image_file.read()
    print('here2')
    # AWS rekoginition
    rekognition_response = rekognition_client.detect_labels(
        Image={'Bytes': image_bytes},
        MaxLabels=10
    )

    labels = [label['Name'] for label in rekognition_response['Labels']]
    labels_description = ', '.join(labels)

    text_prompt = (
        f"Considering the image labeled with {labels_description}, determine if it sufficiently matches the requirements of the task described as {task_description}, allowing a high degree of flexibility regarding similarity and terminology. Respond only with either 'True' or 'False'."
    )
    print(labels_description)
    print('here3')
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                    {
                    "role": "user",
                    "content": f"{text_prompt}"
                }
                ],
                max_tokens=10
        )
        print('here44')
        result = json.dumps(response.choices[0].message.content)
        print('here5')
        response_dict = {"result": json.loads(result)}
        print(response_dict)
        return json.dumps(response_dict, indent=4)

    
    except Exception as e:  
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
