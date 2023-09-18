import axios from "axios";

const API = axios.create({baseURL:"http://localhost:4000"})

export const addProductCart =(prodId,userId,prodName,prodPrice,prodImage)=>API.post("/cart/addToCart",{prodId,userId,prodName,prodPrice,prodImage})

export const fetchCartItems =(userId) =>API.get(`/cart/getCartItems/${userId}`)

export const removeCartItems =(proId,userId)=>API.put(`/cart/removeCartItem/${proId}/${userId}`)

export const changeQuantityCart =(userId, prodId,newQuantity,itemPrice)=>API.put(`/cart/changeQuantityCart/${prodId}/${userId}/${newQuantity}/${itemPrice}`)

export const addAddress =(userId,address)=>API.post(`/cart/addAddress/${userId}`,{address})

export const removeAllCartItem =(cartId)=>API.post(`/cart/removeAllCartItem/${cartId}`)

