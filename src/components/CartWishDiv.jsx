import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import defaultDp from '../assets/defualt_dp.png'
import { Button } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import OrderHistory from './OrderHistory';
import userProfile from './userProfile';
import UserProfile from './userProfile';
import { getAllFromCart } from '../redux/cartSlice';
import { getAllFromWishlists } from '../redux/wishListSlice';
import { addToWishlistContext } from '../context/ContextShare';
function CartWishDiv() {
    const {addToWishlistResponse,setAddToWishlistResponse} = useContext(addToWishlistContext)
    const wishlist = useSelector((state) => state.wishListReducer.allProducts);
    const cartArray = useSelector((state) => state.cartReducer.allProducts);
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const token = sessionStorage.getItem('token');
    // console.log("token", token);
    
    const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
  
    useEffect(() => {
      dispatch(getAllFromCart(reqHeader));
    }, [dispatch]);
    useEffect(()=>{
        dispatch(getAllFromWishlists(reqHeader))
    },[dispatch,addToWishlistResponse])

    const handleLogout = ()=>{
        sessionStorage.removeItem("token")
        navigate('/')
        handleClose()
    }
    return (
        <>
            <div className='ms-auto me-2'>
            <UserProfile/>
                <Link to={'/wishlist'}><button type="button" class="btn btn-primary me-3">
                    <i class="fa-solid fa-heart me-2"></i>
                    <span class="badge text-bg-primary">{wishlist?.length}</span>
                </button></Link>
                <Link to={'/cart'}><button type="button" class="btn btn-primary me-3">
                    <i class="fa-solid fa-cart-shopping me-2 "></i>
                    <span class="badge text-bg-primary">{cartArray?.length}</span>
                </button></Link>
            </div>

        </>
    )
}

export default CartWishDiv
