// src/controllers/categoryController.js
import asyncHandler from 'express-async-handler';
import Item from '../models/Item.js';

// Get all categories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Item.distinct('category');
  res.json(categories);
});

// Get category by store name
export const getCategoriesByStoreName = asyncHandler(async (req, res) => {
  const { storeName } = req.query;
  const categories = await Item.distinct('category', { storeName: storeName });
  res.status(200).json(categories);
});
