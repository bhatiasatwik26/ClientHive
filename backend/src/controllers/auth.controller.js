import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookies } from "../utils/verification.js";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next)=>{
    const {username, email, password, type} = req.body;
    // temporary method
    const description = `Hello there i am ${username}`;
    const photo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s';
    //end
    try{
        const userExist = await User.findOne({email});
        if(userExist)
            return next(errorHandler(400, 'User already exists'));
        const hashPass = bcrypt.hashSync(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPass,
            type,
            description,
            photo
        });
        await newUser.save();
        signIn(req, res, next);
    }
    catch(err){
        console.log(err);
    }
}
export const signIn = async (req, res, next)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user)
            return next(errorHandler(400, 'User not found'));
        if(!bcrypt.compareSync(password, user.password))
            return next(errorHandler(400, 'Invalid password'));
        generateTokenAndSetCookies(res, user._id);
        console.log(user._doc);
        
        const {_id, email: resEmail, username, type, description, photo, createdAt} = user._doc;
        res.status(200).json({
            success: true,
            message: 'Signed into account',
            user:{ _id, email: resEmail, username, type, description, photo, createdAt }
        });
    }
    catch(err){
        console.log(err);
    }
}
export const logOut = async (req, res)=>{
    res.clearCookie('CLIENTHIVE_JWT').status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
}