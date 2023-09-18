import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
  },

  productDetails: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    maxlength: 25,
  },
  productImages: {
    type: String,
    required: true,
    trim: true,

  },
});

const Product = mongoose.model("products", productSchema);

export default Product;
