import express from "express";
import { sellerAddProduct } from "../controllers/sellerController.js";


const router = express.Router()


router.post("/add-products",sellerAddProduct)


export default router