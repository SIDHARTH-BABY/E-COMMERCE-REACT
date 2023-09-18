import  express  from "express";
import { createOrder } from "../controllers/razorpayController.js";

const router = express()

router.post("/createOrder",createOrder)

export default router