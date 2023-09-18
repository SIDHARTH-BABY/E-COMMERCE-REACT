import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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
  address: [
    {
      userAddress: String,
    },
  ],

  userId: String,
  checkoutPrice: Number,
  count: {
    type: Number,
  },
});

const Cart = mongoose.model("cart", cartSchema);
export default Cart;
