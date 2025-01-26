import { Chat } from '../models/chat.model.js';

// create chat b/w 2 users...
export const createChatFor2Users = async (req, res, next) =>{
    const user1 = req.userId;
    const user2 = req.params.id;
    try{
        const chatExists = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [user1, user2] }
        });
        if (chatExists) 
            return res.status(400).json({ 
                success: false, 
                message: 'Chat already exists' 
            });
        const chat = new Chat({users: [user1, user2]});
        await chat.save();
        const populatedChat = await Chat.findById(chat._id).populate('users', 'username email photo');
        res.json({
            success: true,
            data: populatedChat,
        });
    }
    catch(err){
        console.log(err.message);
        next(err);
    }
}   

// get chat b/w 2 users...
export const getChatFor2Users = async (req, res, next) => {
    const user1 = req.userId;
    const user2 = req.params.id;
    try {
        const chat = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [user1, user2] }
        }).populate('users', 'username email').populate('latestMessage');

        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found' });
        }
        res.json({
            success: true,
            data: chat
        });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};

// get all chats of a user...
export const getAllChatsOfAUser = async (req, res, next) => {
    try {
        const currUser = req.userId;
    
        const filteredChats = await Chat.find({
            isGroupChat: false,
            users: { $in: [currUser] }
        })
        .populate('users', 'username email photo')
        .select('-password');
        
        res.json({
            success: true,
            data: filteredChats,
        });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};
 
