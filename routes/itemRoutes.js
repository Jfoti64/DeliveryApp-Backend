import express from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Routes for item management
router.post('/', auth, createItem); // Create a new item
router.get('/', getItems); // Get all items

router
  .route('/:itemId')
  .get(getItemById) // Get an item by ID
  .put(auth, updateItem) // Update an item
  .delete(auth, deleteItem); // Delete an item

export default router;
