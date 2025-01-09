import express from 'express'
import { verifyToken } from '../utils/verification.js';
import { createChatFor2Users, getAllChatsOfAUser, getChatFor2Users } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/create/:id', verifyToken, createChatFor2Users);
router.get('/:id', verifyToken, getChatFor2Users);
router.get('/', verifyToken, getAllChatsOfAUser);

export default router;
