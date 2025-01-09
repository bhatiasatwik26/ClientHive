import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

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
        });

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
            photo: photoUrl
        })
        await newMsg.save();
        res.status(201).json({success: true, data: newMsg});
    }
    catch(err)
    {
        console.log(err.message);
        next(err);
    }
}

