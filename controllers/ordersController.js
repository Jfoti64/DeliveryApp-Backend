import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

// Create new order
export const createOrder = asyncHandler(async (req, res) => {
  const { deliveryAddress, paymentMethod, phoneNumber, items, total } = req.body;

  try {
    const order = new Order({
      user: req.user._id,
      deliveryAddress,
      paymentMethod,
      phoneNumber,
      items,
      total,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order:', error); // Log the error
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
