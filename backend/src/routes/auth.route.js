import express from 'express';
import { logOut, signIn, signUp } from '../controllers/auth.controller.js';
import { validateSignIn, validateSignUp } from '../utils/validate.js';
import { verifyToken } from '../utils/verification.js';

const router = express.Router();
router.post('/signup', validateSignUp, signUp);
router.post('/signin', validateSignIn, signIn);
router.post('/logout', logOut);

export default router;