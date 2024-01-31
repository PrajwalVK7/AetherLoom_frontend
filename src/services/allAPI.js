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