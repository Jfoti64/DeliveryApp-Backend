import express from 'express';
import { getCategories, getCategoriesByStoreName } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);

router.get('/storeCategories', getCategoriesByStoreName);

export default router;
