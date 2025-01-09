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
    type:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s'
    },
    description:{
        type:String
    },
    trustScore:{
        type: Number
    },
    companyName:{
        type: String
    }
}, {timestamps: true})

export const User = mongoose.model('User', userSchema);
