import express from 'express';
import { createOrder } from '../controllers/ordersController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createOrder);

export default router;
