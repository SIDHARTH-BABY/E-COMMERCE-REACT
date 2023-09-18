import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
 
  const products = await Product.find();


  res.status(201).json({ products, success: true });
};
