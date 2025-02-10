import express from 'express';
import { verifyToken } from '../utils/verification.js';
import { chatAnalyze } from '../controllers/chatanalyzer.controller.js';

const router = express.Router();

router.post('/', verifyToken, chatAnalyze)

export default router;