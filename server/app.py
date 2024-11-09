from flask import Flask, jsonify, request
from gptCalls.getImageVerification import gptresponse
from dashboard import dashboardResponse
from check_firebase_auth import check_firebase_auth
from bets import betResponse
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

app.register_blueprint(gptresponse)
app.register_blueprint(dashboardResponse)
app.register_blueprint(betResponse)


@app.route("/")
def landing():
    return '<p>helloworld</p>'


if __name__ == '__main__':
    app.run(debug=True)