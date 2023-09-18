import  express  from "express";
import { addAddress, addToCart, changeQuantityCart, getCartItems, removeAllCartItem, removeCartItem } from "../controllers/cartController.js";

const router= express.Router()


router.post("/addToCart",addToCart)
router.get("/getCartItems/:userId",getCartItems)
router.put("/removeCartItem/:prodId/:userId",removeCartItem)
router.put("/changeQuantityCart/:prodId/:userId/:newQuantity/:itemPrice",changeQuantityCart)
router.post("/addAddress/:userId",addAddress)
router.post("/removeAllCartItem/:cartId",removeAllCartItem)


export default router