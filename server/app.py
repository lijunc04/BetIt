from flask import Flask, jsonify, request
from gptCalls.getImageVerification import gptresponse
from check_firebase_auth import check_firebase_auth

app = Flask(__name__)
app.register_blueprint(gptresponse)

@app.route("/")
def landing():
    return '<p>helloworld</p>'

@app.route("/dashboard")
@check_firebase_auth
def dashboard():
    user = request.user
    return jsonify({
        'message': f'Hello {user["email"]}! This is your dashboard',
        'user': user
    })


if __name__ == '__main__':
    app.run(debug=True)
    
