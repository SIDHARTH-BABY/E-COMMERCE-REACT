import Product from "../models/product.js";

export const sellerAddProduct = async (req, res) => {
  //   const { prodName, prodDetails, prodPrice, ImageCloudUrl } = req.body;

  const productName = req.body.prodName;
  const productDetails = req.body.prodDetails;
  const price = req.body.prodPrice;
  const productImages = req.body.ImageCloudUrl;
  const product = new Product(
  {  productName,
    productDetails,
    price,
    productImages}
  );
  const productResponse = await product.save();
  console.log(productResponse, "ppoufdasfdsaio");
res.status(200).json({productResponse,success:true,message:"successfully added the product"})
  //   console.log(productResponse, "product");
  //   res.status({ productResponse, success: true });
};
