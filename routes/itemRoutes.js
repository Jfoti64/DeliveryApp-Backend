// src/routes/itemRoutes.js
import express from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemsByCategory,
  getItemsByStoreName,
  searchItems,
} from '../controllers/itemController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', searchItems); // Define search route before routes with parameters

router.get('/categories', getItemsByCategory);

router.get('/storeName', getItemsByStoreName);

router.route('/').post(auth, createItem).get(getItems);

router.route('/:itemId').get(getItemById).put(auth, updateItem).delete(auth, deleteItem);

export default router;
