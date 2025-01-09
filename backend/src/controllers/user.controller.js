import { errorHandler } from "../utils/error.js";
import cloudinary from '../utils/cloudinary.js'
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const updateProfile = async (req, res, next)=>{ 
    const {photo, description} = req.body;
    const userId = req.userId;
    if(userId != req.params.userId)
        return next(errorHandler(401, 'ID MISMATCH: Unauthorised update request'))
    const updateConfig = {};
    let newPhoto = null, newDescription = null;
    try
    {
        if(photo)
        {
            const uploadResponse = await cloudinary.uploader.upload(photo);
            newPhoto = uploadResponse.secure_url;
            updateConfig.photo = newPhoto;
        }
        if(description)
        {
            newDescription = description;
            updateConfig.description = newDescription;
        }
        if(Object.keys(updateConfig).length === 0)
            return next(errorHandler(400, 'EMPTY REQUEST: nothing to update'))
        const updatedUser = await User.findByIdAndUpdate(userId, updateConfig, {new: true});
        res.json({
            success: true,
            msg: 'Updated user successfully',
            data: {description: updatedUser.description, photo: updatedUser.photo}
        })
    }
    catch(err){
        console.log(err);
        return next(err.msg);
    }

}