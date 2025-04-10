import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Schema for items
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true }
});

// Item model based on schema
const Item = mongoose.model('Item', itemSchema);

// Sample route to check API
app.get('/api/items', async (req, res) => {
  try {
    // Fetch all items from the database
    const items = await Item.find();
    res.status(200).json(items); // Return the list of items
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items', error });
  }
});

// Sample POST route to create an item
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body); // Create a new item from the request body
    await newItem.save(); // Save the new item to MongoDB
    res.status(201).json(newItem); // Return the created item
  } catch (error) {
    res.status(500).json({ message: 'Error saving item', error });
  }
});

// Route to seed the database with sample data
app.post('/api/items/seed', async (req, res) => {
  const items = [
    { name: 'Laptop', category: 'Computers', quantity: 25, price: 1600, inStock: true },
    { name: 'Smartphone', category: 'Mobile Phones', quantity: 50, price: 1050, inStock: true },
    { name: 'Smartwatch', category: 'Wearables', quantity: 15, price: 250, inStock: true },
    { name: 'Headphones', category: 'Audio', quantity: 100, price: 140, inStock: true },
    { name: 'LED TV', category: 'Home Appliances', quantity: 10, price: 650, inStock: false }
  ];

  try {
    await Item.insertMany(items); // Insert multiple items into the database
    res.status(201).json({ message: 'Items added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding items', error });
  }
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
