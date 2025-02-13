import { Message } from "../models/message.model.js";


async function fetchChatMessages(user1, user2) {
    // Example using Mongoose:
    return Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 }
      ]
    }).sort({ createdAt: 1 });
  
  
}

function convertToWhatsAppFormat(messages) {
    let whatsappChatText = "";
    messages.forEach(msg => {
      const dt = new Date(msg.createdAt);
      const formattedDate = dt.toLocaleDateString('en-US', {
        month: '2-digit', day: '2-digit', year: '2-digit'
      });
      const formattedTime = dt.toLocaleTimeString('en-US', {
        hour12: false, hour: '2-digit', minute: '2-digit'
      });
      whatsappChatText += `${formattedDate}, ${formattedTime} - ${msg.senderId}: ${msg.text}\n`;
    });
    return whatsappChatText;
}

export const chatAnalyze = async (req, res,next) => {
    try {
      
      const { user1, user2 } = req.body;
      console.log(user1, user2);
      if (!user1 || !user2) {
        return res.status(400).json({ error: 'user1 and user2 are required' });
      }
      
      const messages = await fetchChatMessages(user1, user2);
      
      const chatText = convertToWhatsAppFormat(messages);
      
      const flaskResponse = await fetch('http://127.0.0.1:5000/api/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chat_text: chatText })
    });
    
    const flaskData = await flaskResponse.json();
      console.log(flaskData);
      // Return the analysis result to the frontend.
      res.json({sucess: true, data: flaskData});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};