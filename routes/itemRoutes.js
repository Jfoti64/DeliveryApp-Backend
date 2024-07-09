import express from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemsByCategory,
} from '../controllers/itemController.js';
import auth from '../middleware/auth.js'; // Ensure this path is correct

const router = express.Router();

router.get('/', getItemsByCategory); // Removed auth for testing purposes

router
  .route('/')
  .post(auth, createItem) // Protect this route with the auth middleware
  .get(getItems);

router
  .route('/:itemId')
  .get(getItemById)
  .put(auth, updateItem) // Protect this route with the auth middleware
  .delete(auth, deleteItem); // Protect this route with the auth middleware

export default router;
