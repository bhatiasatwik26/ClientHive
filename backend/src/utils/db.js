import mongoose from 'mongoose';
export const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connection established to Database');
        console.log('-----------------------------------');
    }
    catch(error){
        console.log('Error: '+error.message);
    }
}