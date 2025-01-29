import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { getSocketIdFromUserId } from "../utils/socket.js";
import { io } from "../utils/socket.js";
import cloudinary from "../utils/cloudinary.js";

// get all msg sent b/w 2 users...
export const getAllMessageOf2Users = async (req, res, next) => {
    try{
        const {id: userToChatId } = req.params;
        const myId = req.userId;

        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ],
        }).sort({createdAt: 1})
        
        res.status(200).json({success: true , data: message})
    }
    catch(err){
        console.log(err.message);
        next(err.message)
    }
}

// send msg to a specific user...
export const sendMessage = async (req, res, next) => {
    const {text, image} = req.body;
    const receiverId = req.params.id;
    const senderId = req.userId;
    let photoUrl;
    try{
        
        if(image)
        {
            const uploadResponse = await cloudinary.uploader.upload(image);
            photoUrl = uploadResponse.secure_url;
        }
        const newMsg = new Message({
            senderId,
            receiverId,
            text,
            image: photoUrl
        })
        await newMsg.save();
        io.to(getSocketIdFromUserId(senderId)).emit('recieveMessage', newMsg);
        if(getSocketIdFromUserId(receiverId))
            io.to(getSocketIdFromUserId(receiverId)).emit('recieveMessage', newMsg);
        res.status(201).json({success: true, data: newMsg});
    }
    catch(err)
    {
        console.log(err.message);
        next(err);
    }
}

export const sendScheduledMessage = async(req, res, next) => {
    
    const {text, image, delay} = req.body;
    const receiverId = req.params.id;
    const senderId = req.userId;
    let photoUrl;
    try{
        
        if(image)
        {
            const uploadResponse = await cloudinary.uploader.upload(image);
            photoUrl = uploadResponse.secure_url;
        }
        const newMsg = new Message({
            senderId,
            receiverId,
            text,
            image: photoUrl,
            type: 'delay'
        })
        const result = await newMsg.save();
        io.to(getSocketIdFromUserId(senderId)).emit('recieveMessage', {...newMsg._doc, type: 'delay'});
        res.status(201).json({success: true, data:newMsg, type: 'delay'});
        
        setTimeout(async() => {
            newMsg['type'] = null;
            const newMsg2 = new Message({
                senderId,
                receiverId,
                text,
                image: photoUrl
            })
            await Message.findByIdAndDelete(result._id)
            await newMsg2.save();
            io.to(getSocketIdFromUserId(senderId)).emit('recieveMessage', newMsg2);
            if(getSocketIdFromUserId(receiverId))
                io.to(getSocketIdFromUserId(receiverId)).emit('recieveMessage', newMsg2);
        }, delay*1000);

    }
    catch(err)
    {
        console.log(err.message);
        next(err);
    }

}

