import Item from '../models/Item.js';
import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';

// Create a new item
export const createItem = [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('price', 'Price is required').isFloat({ gt: 0 }),
  check('category', 'Category is required').not().isEmpty(),
  check('image', 'Image URL is required').not().isEmpty(),
  check('stockQuantity', 'Stock Quantity is required').isInt({ min: 0 }),
  check('storeName', 'StoreName is required').not().isEmpty(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, price, category, image, stockQuantity, storeName } = req.body;

    const newItem = new Item({
      title,
      description,
      price,
      category,
      image,
      stockQuantity,
      storeName,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  }),
];

// Get all items
export const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  res.status(200).json(items);
});

// Get items by category
export const getItemsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const items = await Item.find({ category });
  res.status(200).json(items);
});

// Get items by storeName
export const getItemsByStoreName = asyncHandler(async (req, res) => {
  console.log(req.query);
  const { storeName } = req.query;
  console.log(storeName);
  const items = await Item.find({ storeName });
  res.status(200).json(items);
});

// Get a specific item by ID
export const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.itemId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.status(200).json(item);
});

// Search items
export const searchItems = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const items = await Item.find({
      title: { $regex: q, $options: 'i' }, // Case-insensitive search
    });

    res.json(items);
  } catch (error) {
    console.error('Error searching items:', error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an item
export const updateItem = [
  check('title', 'Title is required').optional().not().isEmpty(),
  check('description', 'Description is required').optional().not().isEmpty(),
  check('price', 'Price is required').optional().isFloat({ gt: 0 }),
  check('category', 'Category is required').optional().not().isEmpty(),
  check('image', 'Image URL is required').optional().not().isEmpty(),
  check('stockQuantity', 'Stock Quantity is required').optional().isInt({ min: 0 }),
  check('storeName', 'StoreName is required').optional().not().isEmpty(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, price, category, image, stockQuantity, storeName } = req.body;

    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.title = title || item.title;
    item.description = description || item.description;
    item.price = price || item.price;
    item.category = category || item.category;
    item.image = image || item.image;
    item.stockQuantity = stockQuantity || item.stockQuantity;
    item.storeName = storeName || item.storeName;

    const updatedItem = await item.save();
    res.json(updatedItem);
  }),
];

// Delete an item
export const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.itemId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  await Item.deleteOne({ _id: req.params.itemId });
  res.json({ message: 'Item removed' });
});
