// src/controllers/categoryController.js
import asyncHandler from 'express-async-handler';
import Item from '../models/Item.js';

// Get all categories
export const getStoreNames = asyncHandler(async (req, res) => {
  const storeName = await Item.distinct('storeName');
  res.json(storeName);
});
