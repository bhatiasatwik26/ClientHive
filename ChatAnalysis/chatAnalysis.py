import re
import pandas as pd
from flask import Flask, request, jsonify
from urlextract import URLExtract

import emoji

app = Flask(__name__)

def analyze_chat_api(chat_text, stop_words_path='C:\Projects\ClientHive\chatAnalysis\stop_hinglish.txt'):
    
    pattern = r'\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}\s-\s'
    
    dates = re.findall(pattern, chat_text)
    
    messages = re.split(pattern, chat_text)[1:]
    
    if len(dates) != len(messages):
        raise ValueError("Mismatch between number of date stamps and messages")
    
    df = pd.DataFrame({
        'user_message': messages,
        'message_date': dates
    })
    
    df['message_date'] = df['message_date'].str.replace(" - ", "")
    df['date'] = pd.to_datetime(df['message_date'], format='%m/%d/%y, %H:%M')
    df.drop(columns=['message_date'], inplace=True)
    
    users = []
    texts = []
    for message in df['user_message']:
        entry = re.split(r':\s', message, maxsplit=1)
        if len(entry) == 2:
            users.append(entry[0])
            texts.append(entry[1])
        else:
            users.append('system_notification')
            texts.append(entry[0])
    df['user'] = users
    df['text'] = texts
    df.drop(columns=['user_message'], inplace=True)
    
    total_messages = df.shape[0]
    messages_by_user = df['user'].value_counts().to_dict()
    
    all_words = []
    for text in df['text']:
        all_words.extend(text.split())
    total_words = len(all_words)
    
    num_of_media = df[df['text'] == '<Media omitted>\n'].shape[0]
    
    extractor = URLExtract()
    all_links = []
    for text in df['text']:
        all_links.extend(extractor.find_urls(text))
    total_links = len(all_links)
    
    try:
        with open(stop_words_path, 'r', encoding='utf-8') as f:
            stop_words = f.read().splitlines()
    except Exception:
        stop_words = []
    
    results = {
        "total_messages": total_messages,
        "messages_by_user": messages_by_user,
        "total_words": total_words,
        "num_of_media_messages": num_of_media,
        "total_links": total_links
    }
    return results

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    if not data or 'chat_text' not in data:
        return jsonify({'error': 'Missing "chat_text" parameter in JSON body'}), 400

    chat_text = data['chat_text']
    try:
        result = analyze_chat_api(chat_text)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
