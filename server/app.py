from flask import Flask
from gptCalls.getImageVerification import gptresponse

app = Flask(__name__)
app.register_blueprint(gptresponse)

@app.route("/")
def landing():
    # anything
    pass


if __name__ == '__main__':
    app.run(debug=True)
    
