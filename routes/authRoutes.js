import express from 'express';
import { registerUser, authUser, getUserProfile } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser); // Register new user
router.post('/login', authUser); // Authenticate user & get token
router.get('/profile', auth, getUserProfile); // Get user profile

export default router;
