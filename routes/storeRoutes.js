import express from 'express';
import { getStoreNames, getStoreDetails } from '../controllers/storeController.js';

const router = express.Router();

// Route to get all store names
router.get('/storeNames', getStoreNames);

// Route to get store details by name
router.get('/:storeName', getStoreDetails);

export default router;
