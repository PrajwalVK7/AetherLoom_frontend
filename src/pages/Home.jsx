import React, { useEffect } from 'react'
import Homecarousel from '../components/Homecarousel'
import { Button, Col, Row } from 'react-bootstrap'
import "../style/Home.css"
import ProductCategory from '../components/ProductCategory'
import Product from '../components/Product'
import Gallery from '../components/Gallery'
import Customeevent from '../components/Customeevent'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/allProductSlice'
function Home() {

  const gallerySize = 1000;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useSelector((state) => state.allProductSlice.allProducts.products);
  // console.log("products:", products);
  const categories = products?.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index)


  return (
    <>
      <div className='home-container'>
        <Homecarousel />
        <div className='top-content text-center shadow rounded-5 pb-3 '>
          <p id='home-text' className=' rounded' style={{ fontSize: '45px', fontWeight: '900', color: '#4caf50' }}>Illuminating Spaces with Celestial <span className='text-primary'>Elegance</span></p>
          <Link to={'/dashboard'}><Button >Shop Now</Button></Link>
        </div>
      </div>
      <div className='mt-5 mb-5 container-fluid'>
        <h2 className='ms-5 mb-3'><u>Explore</u></h2>
        <Row >
          {
            categories?.length > 0 ?
              categories.map((category) => (
                <Col lg={2} md={4} sm={6} xs={6}>
                  <Link to={`/dashboard/${category}`}><ProductCategory category={category} />
                  </Link>
                </Col>
              )) : <p></p>
          }

        </Row>
      </div>
      <div id="latest_product" className='container'>
        <div className='text-center'>
          <h2>View our latest models
          </h2>
          <h6>Light your Way with Design by A. Curtis</h6>
        </div>
        <div className=' mt-5 mb-5'>
          <Row>
            {
              products?.length > 0 ?
                products.slice().reverse().slice(0, 6).map((product) => (
                  <Col lg={4} md={4} sm={12} xs={12} className='d-flex justify-content-center align-items-center'>
                    <Product product={product} />
                  </Col>
                )) : <p>No data</p>
            }
          </Row>
        </div>

      </div>
      <div id='new_product' className='mt-5 mb-5 container'>
        <div className='mb-5 text-center'>
          <h3>Featured Products</h3>
          <h6>Lorem ipsum dolor sit amet.</h6>
        </div>

        <div className=' mt-5 mb-5'>
          <Row>

            <Col lg={4} md={4} className='d-flex justify-content-center align-items-center'>
              <Product />

            </Col>
            <Col lg={4} md={4} className='d-flex justify-content-center align-items-center'>
              <Product />

            </Col>
            <Col lg={4} md={4} className='d-flex justify-content-center align-items-center'>
              <Product />

            </Col>


          </Row>
        </div>

      </div>
      <div id='gallery' className='d-flex justify-content-center mt-5 mb-5 container-fluid '>
        <Gallery width={gallerySize} />
      </div>

      {/* to add custom events or offers */}

      <div id='event'>
        {/* <h2 className='text-center'>Event</h2> */}
        <Customeevent />
      </div>
      <div className='container-fluid mt- mb-5 pt-5'>
        <Row className='pt-5 text-center'>
          <Col lg={3} md={3} xs={12} sm={12}>
            <h5><i class="fa-solid fa-arrow-rotate-left me-3 mb-3"></i>14 days Full Return Policy</h5>
          </Col>
          <Col lg={3} md={3} xs={12} sm={12}>
            <h5> <i class="fa-solid fa-truck me-3 mb-3"></i>Free and Fast Delivery</h5>
          </Col>
          <Col lg={3} md={3} xs={12} sm={12}>
            <h5><i class="fa-solid fa-globe me-3 mb-3"></i> 100% Safe Online Shopping</h5>
          </Col>
          <Col lg={3} md={3} xs={12} sm={12}>
            <h5><i class="fa-solid fa-circle-info me-3 mb-3"></i>Helpdessk +91 1234567890</h5>
          </Col>
        </Row>

      </div>
    </>
  )
}

export default Home
