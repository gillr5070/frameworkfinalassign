// controllers/itemController.js

import Item from '../models/itemModel.js';

// CREATE a new item
export const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item); // Return created item
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items); // Return all items
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ one item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(item); // Return item
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE item by ID
export const updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(updated); // Return updated item
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE item by ID
export const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
