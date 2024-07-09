// populateDatabase.js
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import Item from '../models/Item.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Fetch data from Fake Store API
const fetchItems = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Fake Store API:', error);
    return [];
  }
};

// Insert data into MongoDB
const insertItems = async (items) => {
  try {
    await Item.insertMany(items);
    console.log('Items inserted successfully');
  } catch (error) {
    console.error('Error inserting items into MongoDB:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Main function
const populateDatabase = async () => {
  const items = await fetchItems();
  const formattedItems = items.map((item) => ({
    title: item.title,
    description: item.description,
    price: item.price,
    category: item.category,
    image: item.image,
    stockQuantity: 100, // Set a default stock quantity
    ratings: item.rating.rate,
  }));
  await insertItems(formattedItems);
};

populateDatabase();
