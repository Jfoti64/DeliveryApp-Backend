import express from 'express';
import { createOrder, getUserOrders } from '../controllers/ordersController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/user', auth, getUserOrders); // New endpoint to get user orders

export default router;
