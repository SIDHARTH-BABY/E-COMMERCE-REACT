import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      items: String,
      itemName: String,
      itemPrice: Number,
      quantity: Number,
      itemImage: String,
      totalQuantityPrice: Number,
    },
  ],
  userId: String,
  checkoutPrice: Number,
  count: {
    type: Number,
  },
  address: [
    {
      userAddress: String,
    },
  ],
});

const Order = mongoose.model("order", orderSchema);
export default Order;
