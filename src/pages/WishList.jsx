import React, { useContext, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, getAllFromWishlists, gettAllFromWishlist, gettAllFromWishlists } from '../redux/wishListSlice';
import { Link, useNavigate } from 'react-router-dom';
import { deleteItemWishlistContext } from '../context/ContextShare';
import Empty from '../components/Empty';

function WishList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {deleteItemWishlistResponse,setDeleteItemWishlistResponse} = useContext(deleteItemWishlistContext)
  useEffect(() => {
    if (sessionStorage.token) {
        const token =sessionStorage.getItem("token")
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        dispatch(getAllFromWishlists(reqHeader))
        setDeleteItemWishlistResponse("")
        
    }
    else {
      navigate('/login')
    }
  }, [deleteItemWishlistResponse])
  const wishListArray = useSelector((state) => state.wishListReducer.allProducts);
  // console.log("widh list array", wishListArray)
  return (
    <>
      <h2 className='text-center'>Wishlist</h2>
      <div className='container'>
        <Link to={'/'} style={{ textDecoration: 'none' }}><h5><span><i class="fa-solid fa-arrow-left me-3"></i></span>Back to Home</h5>
        </Link>
        <Row>
          {wishListArray?.length > 0 ?
            wishListArray.map((item) => (
              <Col key={item._id} lg={4} md={4} sm={6} xs={12}>
                <Product wishList={"wishList"} key={item.id} product={item.product} />
              </Col>
            ))
            : <div className='d-flex justify-content-center container' style={{width:'600px'}}><Empty/></div>
          }
        </Row>
      </div>
    </>
  );
}

export default WishList;
