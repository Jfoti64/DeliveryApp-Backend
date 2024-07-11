import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    deliveryAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    items: [
      {
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
