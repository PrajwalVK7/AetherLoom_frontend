import React, { useContext, useState } from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
// import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import exLight from '../assets/Product-Single-img25-768x768.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList } from '../redux/wishListSlice';
import { addToCart, getAllFromCart } from '../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '../services/baseURL';
import { addToCartAPI, addToWishlist, removeFromWishlist } from '../services/allAPI';
import { addToWishlistContext, deleteItemWishlistContext } from '../context/ContextShare';


function Product({ product, wishList }) {
    const {deleteItemWishlistResponse,setDeleteItemWishlistResponse} = useContext(deleteItemWishlistContext)
    const {addToWishlistResponse,setAddToWishlistResponse} = useContext(addToWishlistContext)


    const dispatch = useDispatch();
    const isWishList = wishList ? true : false;
    console.log(product)
    // const loginStatus = useSelector((state) => state.loginStatusReducer.isLoggedin);
    // console.log("Login status:", loginStatus);
    const navigate = useNavigate()

    if (!product) {
        return null;
    }
    const handleAddToCart = async () => {
        const count = 1;
        if (sessionStorage.token) {
            try {
                const token = sessionStorage.getItem('token');
                // console.log("token", token);

                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                };

                const response = await addToCartAPI(product._id, reqHeader, { count });
                console.log(response)
                if (response.status === 200) {
                    dispatch(getAllFromCart(reqHeader))
                }

            } catch (err) {
                console.error('Error adding to cart:', err);
            }
        } else {
            toast.warning(' Please login!', { delay: 1000 });
            navigate('/login');
        }
    };


    const handleAddToWishlist = async (productID) => {
        if (sessionStorage.token) {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const response = await addToWishlist(productID, reqHeader);
            // console.log("wishlist fesponse ",response)
            if (response.status === 200) {
                toast.success("Item is added to wishlist")
                setAddToWishlistResponse(response.data)
            }
            else {
                toast.warning(response.response.data)
            }
        }
        else {
            toast.warning("Please Login !!")
            navigate('/login')
        }
    }
    const handleRemoveFromWishList = async (itemID) => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const response = await removeFromWishlist(itemID, reqHeader);

        if (response.status === 200) {
            toast.success("Removed from wishlist")
            setDeleteItemWishlistResponse(response)
        }
        else{
            console.log(response.response.data)
        }
    }
    return (
        <>
            <ToastContainer />

            <Card key={product._id} sx={{ width: 320 }} className="mt-5">
                <div>
                    <Typography level="title-lg">{product.name}</Typography>
                    <IconButton
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                    >
                        {!isWishList ?
                            <div onClick={() => handleAddToWishlist(product._id)} >
                                <i className="fa-solid fa-heart me-2"></i>
                            </div>
                            :
                            <div onClick={() => handleRemoveFromWishList(product._id)} >
                                <i class="fa-solid fa-trash me-2"></i>
                            </div>


                        }
                    </IconButton>
                </div>
                <Link to={`/product/${product._id}`} >
                    <AspectRatio minHeight="250px" maxHeight="260px">
                        <img className='img-fluid'
                            src={`${baseURL}uploads/${product.thumbnail}`}
                            loading="lazy"
                            height={"100%"}
                            alt=""
                        />
                    </AspectRatio>
                </Link>
                <CardContent orientation="horizontal">
                    <div>
                        <Typography level="body-xs">Total price:</Typography>
                        <Typography fontSize="lg" fontWeight="lg">
                            {product.price}
                        </Typography>
                    </div>
                    <Button
                        variant="solid"
                        size="md"
                        color="primary"
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                        onClick={handleAddToCart}
                    >
                        <i class="fa-solid fa-cart-shopping me-2 "></i>
                    </Button>
                </CardContent>
            </Card>

        </>
    )
}

export default Product
