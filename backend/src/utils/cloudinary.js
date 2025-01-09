import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDNINARY_ID,
    api_key: process.env.CLOUDNINARY_API_KEY,
    api_secret: process.env.CLOUDNINARY_API_SECRET
});
export default cloudinary