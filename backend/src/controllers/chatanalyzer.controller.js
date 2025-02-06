

async function fetchChatMessages(user1, user2) {
    // Example using Mongoose:
    return ChatModel.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 }
      ]
    }).sort({ createdAt: 1 });
  
    // return [
    //   { senderId: user1, receiverId: user2, text: "Hello!", createdAt: new Date("2025-01-01T10:00:00Z") },
    //   { senderId: user2, receiverId: user1, text: "Hi!", createdAt: new Date("2025-01-01T10:05:00Z") }
    // ];
}

function convertToWhatsAppFormat(messages) {
    let whatsappChatText = "";
    messages.forEach(msg => {
      // Format the date to MM/DD/YY, HH:MM (24hr format)
      // Use your preferred date formatting library (or vanilla JS)
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
      // Get the two users from the request body (from your frontend)
      const { user1, user2 } = req.body;
      if (!user1 || !user2) {
        return res.status(400).json({ error: 'user1 and user2 are required' });
      }
      
      // Fetch chat messages from MongoDB between these two users.
      const messages = await fetchChatMessages(user1, user2);
      
      // Convert messages to WhatsApp format
      const chatText = convertToWhatsAppFormat(messages);
      
      // Now send this chatText to the Flask API.
      const flaskResponse = await axios.post('http://127.0.0.1:5000/api/analyze', {
        chat_text: chatText
      });
      
      // Return the analysis result to the frontend.
      res.json({sucess: true, data: flaskResponse.data});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};