import express from 'express';
import { verifyToken } from '../utils/verification.js';
import { allUsers, updateProfile } from '../controllers/user.controller.js';

const router = express.Router();
router.post('/update/:userId', verifyToken, updateProfile);
router.post('/',verifyToken, allUsers)
export default router;