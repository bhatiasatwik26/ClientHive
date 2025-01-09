import express from 'express';
import { verifyToken } from '../utils/verification.js';
import { updateProfile } from '../controllers/user.controller.js';

const router = express.Router();
router.post('/update/:userId', verifyToken, updateProfile);

export default router;