import re
import pandas as pd
from flask import Flask, request, jsonify
from urlextract import URLExtract
from collections import Counter
import emoji

app = Flask(__name__)

def analyze_chat_api(chat_text, stop_words_path='ChatAnalysis/stop_hinglish.txt'):
    
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
    df['year'] = df['date'].dt.year
    df['month'] = df['date'].dt.month_name()
    df['day'] = df['date'].dt.day
    df['hour'] = df['date'].dt.hour
    df['minute'] = df['date'].dt.minute
    df['second'] = df['date'].dt.second
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

    # most active user
    x = df['user'].value_counts().head()
    name = x.index
    count = x.values
    
    extractor = URLExtract()
    all_links = []
    for text in df['text']:
        all_links.extend(extractor.find_urls(text))
    total_links = len(all_links)
    
    
    #top used words
    temp = df[df['user'] != 'system_notification']
    temp = temp[temp['text']!= '<Media omitted>\n']
    temp = temp[temp['text']!='You deleted this message\n']
    temp

    #found a file complied with multiple hinglish word 
    with open(stop_words_path, 'r', encoding='utf-8') as f:
        stop_words = f.read().splitlines()


    words = []
    for message in df['text']:
        for word in message.lower().split():
            if word not in stop_words:
                words.append(word)
    
    Counter(words) # to get freq of each word

    most_common_wordsDF = pd.DataFrame(Counter(words).most_common(30)) # most common 20 words 
    most_common_wordsDF

  
    most_common_wordsDF[0] = most_common_wordsDF[0].str.replace(r'[^\w\s]', '', regex=True)
    most_common_words = most_common_wordsDF[0].tolist()
    most_common_words_count = most_common_wordsDF[1].tolist()

    #monthly timeline 
    df['month_num'] = df['date'].dt.month
    timeline = df.groupby(['year','month_num','month']).count()['text'].reset_index()
    time = []
    for i in range(timeline.shape[0]):
        time.append(timeline['month'][i]+ "-"+str(timeline['year'][i]))

    timeline['time'] = time
    message =timeline['text']

    df['day_name'] = df['date'].dt.day_name()
    x = df['day_name'].value_counts()
    day_name = x.index
    day_msg_count = x.values

    results = {
        "total_messages": total_messages,
        "messages_by_user": messages_by_user,
        "total_words": total_words,
        "num_of_media_messages": num_of_media,
        "total_links": total_links,
        "most_active_users": {
            "name": name.tolist(),
            "count": count.tolist(),
        },
        "most_common_words": {
        "word": most_common_words,
        "count": most_common_words_count,
        },
        "monthly_timeline": {
            "time": time,
            "message": message.tolist(),
        },
        "most_active_day":{
            "day_name": day_name.tolist(),
            "day_msg_count": day_msg_count.tolist(),
        }

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
        print(result)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
