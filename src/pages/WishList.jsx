import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useSelector } from 'react-redux';
import { addToWishList } from '../redux/wishListSlice';
import { Link } from 'react-router-dom';

function WishList() {
  const wishListArray = useSelector((state) => state.wishListReducer);
  console.log("widh list array", wishListArray)
  return (
    <>
      <h2 className='text-center'>Wishlist</h2>
      <div className='container'>
        <Link to={'/'} style={{textDecoration:'none'}}><h5><span><i class="fa-solid fa-arrow-left me-3"></i></span>Back to Home</h5>
        </Link>
        <Row>
          {wishListArray?.length > 0 ?
            wishListArray.map((item) => (
              <Col key={item.id} lg={4} md={4} sm={6} xs={12}>
                <Product wishList={"wishList"} key={item.id} product={item}  />
              </Col>
            ))
            : <p>no data</p>
          }
        </Row>
      </div>
    </>
  );
}

export default WishList;
