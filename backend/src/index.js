import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import messageRouter from './routes/message.route.js'
import chatRouter from './routes/chat.route.js'
import chatAnalysisRouter from './routes/chatAnalysis.route.js'
import cookieParser from 'cookie-parser';
import { connectDB } from './utils/db.js';
import cors from 'cors';
import{server, app} from './utils/socket.js';
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,  
}));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);
app.use('/api/chat', chatRouter);
app.use('/api/analyze-chat', chatAnalysisRouter);

server.listen(PORT, ()=>{
    console.log('Server up and running at port:', PORT);
    connectDB();
})

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
