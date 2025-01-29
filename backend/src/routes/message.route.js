import express from 'express'
import { verifyToken } from '../utils/verification.js';
import { getAllMessageOf2Users, sendMessage, sendScheduledMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/:id', verifyToken, getAllMessageOf2Users);
router.post('/:id', verifyToken, sendMessage);
router.post('/delay/:id', verifyToken, sendScheduledMessage);


export default router;
