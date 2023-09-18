import Cart from "../models/cart.js";
import mongoose from "mongoose";
import Product from "../models/product.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.prodId;
    const productName = req.body.prodName;
    const productPrice = req.body.prodPrice;
    const productImage = req.body.prodImage;
    const totalQuantityPrice = req.body.prodPrice;
    console.log(userId);
    // const products = {
    //   items: productId,
    //   itemName: productName,
    //   itemPrice: productPrice,
    //   quantity: 1,
    //   itemImage: productImage,
    // };
    // // TO CREATE A NEW USER OR USER ID ----USE THIS STEP
    // const product = new Cart({
    //   _id: new mongoose.Types.ObjectId(),
    //   userId: new mongoose.Types.ObjectId("6314630a58e6fcf3fbb6e0a7"),
    //   products: products,
    // });
    // const productResponse = await product.save();

    const user = await Cart.findOne({ userId: userId });

    if (!user) {
      const products = {
        items: productId,
        itemName: productName,
        itemPrice: productPrice,
        quantity: 1,
        itemImage: productImage,
        totalQuantityPrice: totalQuantityPrice,
      };
      let checkoutPrice = 0;
      const addProducts = new Cart({
        userId: userId,
        products: products,
        checkoutPrice: checkoutPrice,
      });
      const productAdded = await addProducts.save();
      res.status(200).json({
        success: true,
        message: "Added To Cart",
        productAdded,
      });
    } else {
      const products = {
        items: productId,
        itemName: productName,
        itemPrice: productPrice,
        quantity: 1,
        itemImage: productImage,
        totalQuantityPrice: totalQuantityPrice,
      };

      const product = await Cart.findOne({ "products.items": products.items });

      if (!product) {
        let checkoutPrice = 0;

        const addProducts = await user.updateOne({
          $push: { products },
          $set: { checkoutPrice: checkoutPrice },
        });
        res.status(200).json({
          success: true,
          product,
          message: "Added To Cart",
        });
      } else {
        res.status(200).json({ message: "Item once added, Check Cart", success: false });
      }
    }
    //  const newProductAdded= await Cart.findById(userId)
  } catch (error) {
    console.log(error.message);
  }
};

export const getCartItems = async (req, res) => {
  try {
    // const userId = req.params.userId;
    const userId = req.params.userId;

    const getItems = await Cart.findOne({ userId: userId });

    const productData = getItems.products;

    // Add the product to the shopping cart
    const shoppingCart = [...productData];

    // Calculate the total checkout price by iterating over the shopping cart
    let checkoutPrice = 0;

    shoppingCart.map((product) => {
      checkoutPrice += product.totalQuantityPrice;
    });

    const saveData = await Cart.findOneAndUpdate(
      { userId: userId },
      { $set: { checkoutPrice: checkoutPrice } },
      { new: true }
    );

    checkoutPrice = saveData.checkoutPrice;
    const address = saveData.address;
    const _id = saveData._id;

    res.status(200).json({
      message: "successfully fetched items",
      success: true,
      productData,
      checkoutPrice,
      address,
      _id,
    });

    //first plan was to fetch the product details from the product database using the product._id getting from cart., we use $in here  to fetch data

    // FISRT IDEA
    //map will not wait for all the asynchronous operations to complete before continuing.
    //  you can use Promise.all

    // const prod =await Promise.all( productData.map(async(item) => {
    //   const data = await Product.findOne({ _id: item.items });
    //   return data;
    // }));
    // const data = await Product.findOne({ _id: prod });

    // SECOND IDEA
    // const prodIds = productData.map((item) => item.items);

    // Product.find({ _id: { $in: prodIds } })
    //   .then((data) => {
    //     console.log(data);
    //     res
    //       .status(200)
    //       .json({ message: "successfully fetched items", success: true, data });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  } catch (error) {}
};

export const removeCartItem = async (req, res) => {
  try {
    const prodId = req.params.prodId;
    const userId = req.params.userId;

    const itemDeleted = await Cart.findOneAndUpdate(
      { userId: userId },
      { $pull: { products: { _id: prodId } } }
    );

    res
      .status(200)
      .json({ success: true, message: "Item removed from cart", itemDeleted });
  } catch (error) {}
};

export const changeQuantityCart = async (req, res) => {
  try {
    const prodId = req.params.prodId;
    const userId = req.params.userId;
    const newQuantity = req.params.newQuantity;
    const itemPrice = req.params.itemPrice;

    const totalQuantityPrice = itemPrice * newQuantity;

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: userId, "products._id": prodId },
      {
        $set: {
          "products.$.quantity": newQuantity,
          "products.$.totalQuantityPrice": totalQuantityPrice,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "quantity updated", updatedCart });
  } catch (error) {}
};

export const addAddress = async (req, res) => {
  try {
    console.log("hello");
    const userId = req.params.userId;
    const newAddress = req.body.address;
    console.log(newAddress, "newwwww");
    const address = { userAddress: newAddress };
    const user = await Cart.findOne({ userId: userId });
    if (user) {
      const addAddress = await user.updateOne({
        $push: { address },
      });
      res
        .status(200)
        .json({ success: true, message: "Address updated", addAddress });
    } else {
      res.status(200).json({ success: false, message: "add items to cart" });
    }
  } catch (error) {}
};

export const removeAllCartItem = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    console.log(cartId, "delete all itm");

    const cartDeleted = await Cart.findByIdAndDelete({ _id: cartId });
    res
      .status(200)
      .json({ success: true, message: "cart item deleted", cartDeleted });
  } catch (error) {}
};
