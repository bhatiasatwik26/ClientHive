import re
import pandas as pd
from flask import Flask, request, jsonify
from urlextract import URLExtract

# Optional: if you need emoji support in further analysis
import emoji

app = Flask(__name__)

def analyze_chat_api(chat_text, stop_words_path='C:\Projects\ClientHive\chatAnalysis\stop_hinglish.txt'):
    """
    Analyzes the WhatsApp chat text and returns key statistics.
    
    The expected chat text format is:
       DATE, TIME - USER: MESSAGE
    For example:
       12/31/20, 23:59 - John Doe: Happy New Year!
       
    This function:
      - Splits the chat text into messages and associated dates.
      - Extracts the sender (or labels as system_notification).
      - Computes total messages, messages per user, word count,
        media messages (if a message equals '<Media omitted>\n'),
        and the total number of URLs found.
      
    Parameters:
      chat_text (str): The full chat text as a string.
      stop_words_path (str): Path to a file with stop words (one per line)
                             if you wish to remove common words. (Currently not used.)
      
    Returns:
      dict: A dictionary with analysis results.
    """
    
    # Define pattern that matches the beginning date/time portion
    # Example format: "12/31/20, 23:59 - "
    pattern = r'\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}\s-\s'
    
    # Find all date/time stamps that match the pattern
    dates = re.findall(pattern, chat_text)
    
    # Split the chat text into messages; the first split element is empty if chat starts with a date.
    messages = re.split(pattern, chat_text)[1:]
    
    # Ensure the number of dates and messages match
    if len(dates) != len(messages):
        raise ValueError("Mismatch between number of date stamps and messages")
    
    # Create a DataFrame with the extracted dates and messages.
    df = pd.DataFrame({
        'user_message': messages,
        'message_date': dates
    })
    
    # Remove the trailing " - " from the date string before converting to datetime.
    df['message_date'] = df['message_date'].str.replace(" - ", "")
    # Convert the date using the format. Adjust the format if your dates differ.
    # For example: '12/31/20, 23:59' corresponds to '%m/%d/%y, %H:%M'
    df['date'] = pd.to_datetime(df['message_date'], format='%m/%d/%y, %H:%M')
    df.drop(columns=['message_date'], inplace=True)
    
    # Extract sender and message text from 'user_message'
    users = []
    texts = []
    for message in df['user_message']:
        # Split on first occurrence of ": " to separate user and message
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
    
    # Compute basic statistics:
    total_messages = df.shape[0]
    messages_by_user = df['user'].value_counts().to_dict()
    
    # Count total words in all messages
    all_words = []
    for text in df['text']:
        all_words.extend(text.split())
    total_words = len(all_words)
    
    # Count media messages (if message exactly equals '<Media omitted>\n')
    num_of_media = df[df['text'] == '<Media omitted>\n'].shape[0]
    
    # Count total URLs using URLExtract
    extractor = URLExtract()
    all_links = []
    for text in df['text']:
        all_links.extend(extractor.find_urls(text))
    total_links = len(all_links)
    
    # Optionally, you can also load stop words and filter words for further analysis.
    # (This example does not include a detailed stop word removal step.)
    try:
        with open(stop_words_path, 'r', encoding='utf-8') as f:
            stop_words = f.read().splitlines()
    except Exception:
        stop_words = []
    
    # Prepare and return the results as a dictionary
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
    """
    Expects a JSON payload with a key "chat_text" containing the entire chat as a string.
    Example:
       {
         "chat_text": "12/31/20, 23:59 - John Doe: Happy New Year!\n01/01/21, 00:00 - Jane Doe: Happy 2021!"
       }
    Returns:
       A JSON object with analysis results.
    """
    data = request.get_json()
    if not data or 'chat_text' not in data:
        return jsonify({'error': 'Missing "chat_text" parameter in JSON body'}), 400

    chat_text = data['chat_text']
    try:
        result = analyze_chat_api(chat_text)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# f = open('C:\Projects\ClientHive\chatAnalysis\WhatsApp Chat with Satwik Geu.txt','r',encoding='utf-8')
# data = f.read()
# response = analyze_chat_api(data)
# print(response)

if __name__ == '__main__':
    app.run(debug=True)
