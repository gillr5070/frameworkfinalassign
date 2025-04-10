// routes/itemRoutes.js

import express from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} from '../controllers/itemController.js';

const router = express.Router();

// POST /api/items - Create
router.post('/items', createItem);

// GET /api/items - Read all
router.get('/items', getItems);

// GET /api/items/:id - Read one
router.get('/items/:id', getItemById);

// PUT /api/items/:id - Update
router.put('/items/:id', updateItem);

// DELETE /api/items/:id - Delete
router.delete('/items/:id', deleteItem);

export default router;
