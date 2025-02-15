import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },
    type:{
        type:String,
        default:null,
    }
},{timestamps:true});

export const Message = mongoose.model("Message",messageSchema);
