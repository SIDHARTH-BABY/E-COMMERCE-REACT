import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });



export const addProduct = (prodName,prodDetails, prodPrice,ImageCloudUrl) => API.post("/seller/add-products",{prodName,prodDetails, prodPrice,ImageCloudUrl})
    
    
   

export const addImage = (image,cloudName) => axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`,image)

    