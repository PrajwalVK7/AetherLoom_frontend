import React from 'react'
import Homecarousel from '../components/Homecarousel'
import { Button, Col, Row } from 'react-bootstrap'
import "../style/Home.css"
import ProductCategory from '../components/ProductCategory'
function Home() {
  return (
    <>
      <div className='home-container'>
        <Homecarousel />
        <div className='top-content text-center'>
          <p  className='text-info shadow rounded' style={{fontSize:'2rem',fontWeight:'700'}}>Illuminating Spaces with Celestial <span className='text-primary'>Elegance</span></p>          
          <Button >Shop Now</Button>
        </div>
      </div>
      <div className='mt-5 container-fluid'>
        <h2 className='ms-5'><u>Explore</u></h2>
        <Row >
          <Col lg={2} md={4} sm={6} xs={6}>
          <ProductCategory category={"Floor Lamps"}/>
          </Col>
          <Col lg={2} md={4} sm={6} xs={6}>
          <ProductCategory category={"Floor Lamps"}/>
          </Col><Col lg={2} md={4} sm={6} xs={6}>
          <ProductCategory category={"Floor Lamps"}/>
          </Col><Col lg={2} md={4} sm={6} xs={6}>
          <ProductCategory category={"Floor Lamps"}/>
          </Col><Col lg={2} md={4} sm={6} xs={6}>
          <ProductCategory category={"Floor Lamps"}/>
          </Col><Col lg={2} md={4} sm={6} xs={6}>
          <ProductCategory category={"Floor Lamps"}/>
          </Col>

        </Row>
      </div>

    </>
  )
}

export default Home
