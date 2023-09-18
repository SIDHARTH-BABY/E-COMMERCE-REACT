import Razorpay from "razorpay";
import shortid from "shortid";
import Order from "../models/order.js";
export const createOrder = async (req, res) => {
  try {
    var razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_SECRET_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_SECRET_KEY,
    });

    const payment_capture = 1;
    const amount = req.body.amount;
    const currency = "INR";
    const orderCreated = await razorpay.orders.create({
      amount: amount * 100,
      currency: currency,
      receipt: shortid.generate,
      payment_capture,
      // notes: {
      //   key1: "value3",
      //   key2: "value2",
      // },
    });

    const userId = req.body.userId;
    const cartItems = req.body.cartItems;
    const currentAddress = req.body.currentAddress;
    console.log(userId, cartItems, currentAddress, "latest");

    const address = { userAddress: currentAddress };
    const products = {
      items: cartItems.items,
      itemName: cartItems.itemName,
      itemPrice: cartItems.itemPrice,
      quantity: cartItems.quantity,
      itemImage: cartItems.itemImage,
      totalQuantityPrice: cartItems.totalQuantityPrice,
    };

    const addOrder = new Order({
      products: products,
      userId: userId,
      address: address,
      checkoutPrice: amount,
    });

    const orderAdded = await addOrder.save();
    console.log(orderAdded,'newORder');
    res
      .status(200)
      .json({ message: "creates order", success: true, orderCreated });
  } catch (error) {
    console.log(error);
  }
};
