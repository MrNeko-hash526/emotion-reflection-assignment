from flask import Flask, request, jsonify
from flask_cors import CORS
from model import analyze_emotion
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "Text is required"}), 400

    emotion, confidence = analyze_emotion(text)
    return jsonify({"emotion": emotion, "confidence": confidence})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use PORT env variable or default to 5000
    app.run(debug=True, port=port)
