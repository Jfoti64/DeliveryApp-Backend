import express from 'express';
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser); // Register new user
router.post('/login', authUser); // Authenticate user & get token
router.get('/profile', auth, getUserProfile); // Get user profile
router.put('/profile', auth, updateUserProfile); // Update user profile

export default router;
