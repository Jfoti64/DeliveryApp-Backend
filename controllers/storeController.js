import asyncHandler from 'express-async-handler';
import Store from '../models/Store.js';

// Get all store names
export const getStoreNames = asyncHandler(async (req, res) => {
  const stores = await Store.find({}, 'name'); // Fetch only the store names
  res.json(stores);
});

// Get store details by name
export const getStoreDetails = asyncHandler(async (req, res) => {
  const { storeName } = req.params;
  const store = await Store.findOne({ name: storeName });

  if (store) {
    res.json(store);
  } else {
    res.status(404).json({ message: 'Store not found' });
  }
});
