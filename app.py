from flask import Flask, request, jsonify, render_template, url_for
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')  # this must be defined!

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    text = data.get('text')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    summary = summarizer(text, max_length=150, min_length=40, do_sample=False)
    return jsonify({'summary': summary[0]['summary_text']})

if __name__ == '__main__':
    app.run(debug=True)
