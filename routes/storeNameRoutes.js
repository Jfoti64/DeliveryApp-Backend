import express from 'express';
import { getStoreNames } from '../controllers/storeNameController.js';

const router = express.Router();

router.get('/', getStoreNames);

export default router;
