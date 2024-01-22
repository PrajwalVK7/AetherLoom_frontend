import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Gallery from '../components/Gallery'
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProductData() {
    const gallerySize = 300;
    const { id } = useParams()
    console.log(id)
    const products = useSelector((state) => state.allProductSlice.allProducts.products);
    const selectedProduct = products?.filter(item=>item?.id==id)
    console.log("sele",selectedProduct)
    console.log("products", products)
    return (
        <>
            <Row className='container'>
                <Col lg={6} className='d-flex justify-content-center align-items-center flex-column mt-5 mb-5 container-fluid '>
                    <h1>{selectedProduct[0]?.title}</h1>
                    <div id='gallery ' >
                        <Gallery images = {selectedProduct[0]?.images} width={gallerySize} />
                    </div>
                </Col>
                <Col>
                    <div className='p-5'>
                        <div className=' mt-3 p-2'>
                            <h1>Price : {selectedProduct[0]?.price}</h1>
                        </div>
                        <p>project description <br />
                        {selectedProduct[0]?.description}                        tags : ..</p>
                        <div className='card rounded d-inline-block p-3 '>
                            <button className='btn'><i class="fa-solid fa-minus"></i></button>
                            <span className='shade me-5 ms-5'>0</span>
                            <button className='btn'><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div className=' mt-3 p-2'>
                            <h3>Total Price : 5000</h3>
                        </div>
                        <div>
                            <Button variant='success' style={{ backgroundColor: 'green ', color: 'white' }} className='mt-5'>Buy Now</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className='mt-4 container'>
                <h3>Related Products</h3>
                <div style={{ overflowX: 'scroll', display: 'flex', gap: '50px', paddingBottom: '5px' }}>
                    <Product />
                    <Product />
                    <Product />

                </div>
            </div>
        </>
    )
}

export default ProductData
