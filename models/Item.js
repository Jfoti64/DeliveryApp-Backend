import mongoose from 'mongoose';

const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    storeName: {
      type: String,
      required: true,
    },
    // Add any additional fields as needed like reviews
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;
