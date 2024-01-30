import React from 'react'
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
import { addToCart } from '../redux/cartSlice';
function Product({ product, wishList }) {
    const dispatch = useDispatch();
    const isWishList = wishList ? true : false;
    console.log(isWishList)
    const loginStatus = useSelector((state) => state.loginStatusReducer.isLoggedin);
    console.log("Login status:", loginStatus);
    const navigate = useNavigate()

    if (!product) {
        return null;
    }
    const handleAddToCart = ()=>{
        // only add to cart, if logged in
        if(loginStatus){
            dispatch(addToCart(product))

        }
        else{
            alert("Please login");
            navigate('/login')

        }
    }
    const handleAddToWishlist = ()=>{
        if(loginStatus){
            dispatch(addToWishList(product))
        }
        else{
            alert("Please login");
            navigate('/login')

        }
    }
    return (
        <>
            <Card key={product.id} sx={{ width: 320 }} className="mt-5">
                <div>
                    <Typography level="title-lg">{product.title}</Typography>
                    <IconButton
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                    >
                        {!isWishList ?
                            <div onClick={handleAddToWishlist } >
                            <i className="fa-solid fa-heart me-2"></i>
                        </div>
                            :
                            <div onClick={() => dispatch(removeFromWishList(product.id))} >
                                <i class="fa-solid fa-trash me-2"></i>
                            </div>
                            

                        }
                    </IconButton>
                </div>
                <Link to={`/product/${product.id}`} >
                    <AspectRatio minHeight="250px" maxHeight="260px">
                        <img className='img-fluid'
                            src={exLight}
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
