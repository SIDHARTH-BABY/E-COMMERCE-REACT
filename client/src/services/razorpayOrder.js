import axios from "axios";


const API = axios.create({baseURL:"http://localhost:4000"})


export const createOrderRazorpay = (amount,userId, cartItems,currentAddress)=>API.post("/razorpay/createOrder",{amount,userId, cartItems,currentAddress})