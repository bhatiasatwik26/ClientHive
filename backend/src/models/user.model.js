import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    photo:{
        type: String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s'
    },
    description:{
        type:String
    },
    unreadMsg:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
}, {timestamps: true})

export const User = mongoose.model('User', userSchema);
