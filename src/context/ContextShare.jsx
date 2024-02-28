import React, { createContext, useState } from 'react'


export const editUserProfileContext = createContext();
export const deleteItemWishlistContext = createContext();
export const addToWishlistContext = createContext()

function ContextShare({ children }) {
    const [editProfileResponse, seteditProfileResponse] = useState({})
    const [deleteItemWishlistResponse,setDeleteItemWishlistResponse] = useState({})
    const [addToWishlistResponse,setAddToWishlistResponse] = useState({})

  return (
    <editUserProfileContext.Provider value={{editProfileResponse, seteditProfileResponse}}>
        <deleteItemWishlistContext.Provider value={{deleteItemWishlistResponse,setDeleteItemWishlistResponse}}>
          <addToWishlistContext.Provider value={{addToWishlistResponse,setAddToWishlistResponse}}>
          {children}

          </addToWishlistContext.Provider>
        </deleteItemWishlistContext.Provider>
    </editUserProfileContext.Provider>
  )
}

export default ContextShare