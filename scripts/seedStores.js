import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Store from '../models/Store.js';

dotenv.config();

const stores = [
  { name: "George's Haus", bannerImage: 'https://via.placeholder.com/1200x300' },
  { name: 'Evans Electronics', bannerImage: 'https://via.placeholder.com/1200x300' },
  { name: "Josh's Jewelry", bannerImage: 'https://via.placeholder.com/1200x300' },
  { name: "Pete's Pet Products", bannerImage: 'https://via.placeholder.com/1200x300' },
  { name: "Tony's Ready Meals", bannerImage: 'https://via.placeholder.com/1200x300' },
  { name: "Sam's Health Shop", bannerImage: 'https://via.placeholder.com/1200x300' },
  { name: 'The Tasting Room', bannerImage: 'https://via.placeholder.com/1200x300' },
  { name: "Bella's Boutique", bannerImage: 'https://via.placeholder.com/1200x300' },
];

const seedStores = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Store.deleteMany();
    await Store.insertMany(stores);

    console.log('Stores seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding stores:', error);
    process.exit(1);
  }
};

seedStores();
