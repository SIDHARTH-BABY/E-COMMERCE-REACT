import express  from "express"
import { getAllProducts } from "../controllers/buyerController.js"

const router = express.Router()

router.get("/getAllProducts",getAllProducts)

export default router