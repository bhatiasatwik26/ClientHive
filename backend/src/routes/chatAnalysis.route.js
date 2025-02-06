import express from 'express';
import { verifyToken } from '../utils/verification';
import { chatAnalyze } from '../controllers/chatanalyzer.controller';

const router = express.Router();

router.post('/', verifyToken, chatAnalyze)

export default router;