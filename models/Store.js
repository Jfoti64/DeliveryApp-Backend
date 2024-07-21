// models/Store.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const storeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  bannerImage: { type: String, required: true },
});

const Store = mongoose.model('Store', storeSchema);

export default Store;
