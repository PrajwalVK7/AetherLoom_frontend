//============List of all APIs

import { baseURL } from "./baseURL"
import { commonAPI } from "./commonAPI"

// User Signup
export const registerAPI = async (user) => {
    return await commonAPI("POST", `${baseURL}user/register`, user, "")
}
// user signin
export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${baseURL}user/login`,user,"")
}
// get categories
export const getAllCategories = async()=>{
    return await commonAPI("GET",`${baseURL}categories/list`,"","")
 }

 // get recent products in home
 export const getRecentProducts = async()=>{
   return await commonAPI("GET",`${baseURL}products/list/recent`,"","")
 }
// get featured products
export const getFeatured = async()=>{
   return await commonAPI("GET",`${baseURL}products/featured`,"","")
}
 // get all products
export const getAllProducts = async(searchKey)=>{
    return await commonAPI("GET",`${baseURL}products/list?search=${searchKey}`,"","")
 }
 // get products by category
 export const getProductsByCategory = async(category)=>{
    return await commonAPI("GET",`${baseURL}products/category/user/${category}`,"","")
 }

 // get product by id

 export const getProductById = async(_id)=>{
    return await commonAPI("GET",`${baseURL}products/user/${_id}`,"","")
 }

 // get userData

 export const getUserData = async(reqHeader)=>{
   return await commonAPI("GET",`${baseURL}user/profile`,"",reqHeader)
 }

// update user profile
export const updateProfileData = async(reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${baseURL}user/profile/edit`,reqBody,reqHeader)
}

// => cart
// add to cart
export const addToCartAPI = async(productID,reqHeader,reqBody)=>{
   // console.log(reqHeader)
   // console.log(productID)
   // console.log(reqBody)
   return await commonAPI("POST",`${baseURL}user/add/cart/${productID}`,reqBody,reqHeader)
}

// get all from cart 
export const getAllFromCartAPI = async(reqHeader)=>{
   return await commonAPI("GET",`${baseURL}user/cart/getAll`,{},reqHeader)
}
// remove from cart
export const removeFromCart = async(itemID,reqHeader)=>{
   console.log(itemID,reqHeader)
   return await commonAPI("DELETE",`${baseURL}user/cart/remove/${itemID}`,{},reqHeader)
}

// update cart
export const editCartAPI = async(itemID,reqBody,reqHeader)=>{
   // console.log(reqHeader)
   // console.log(itemID)
   // console.log("req body",reqBody)
   return await commonAPI("PUT",`${baseURL}cart/edit/${itemID}`,reqBody,reqHeader)
}

// wishlist
// add to wishlist
export const addToWishlist =async(productID,reqHeader)=>{
   return await commonAPI("POST",`${baseURL}user/wishlist/add/${productID}`,{},reqHeader)
}
// get from wishlist
export const getAllFromWishlist = async(reqHeader)=>{
   return await commonAPI("GET",`${baseURL}user/wishlist`,{},reqHeader)
}
// remove from wishlist 
export const removeFromWishlist = async(itemID,reqHeader)=>{
   return await commonAPI("DELETE",`${baseURL}user/wishlist/remove/${itemID}
   `,{},reqHeader)
}
 //// Place order 
 export const placeOrder = async(orderData,reqHeader)=>{
    return await commonAPI("POST",`${baseURL}product/order/true`,orderData,reqHeader)
 }

export const getOrdersAPI = async(reqHeader)=>{
   return await commonAPI("GET",`${baseURL}orders`,{},reqHeader)
}