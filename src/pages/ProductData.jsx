import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Gallery from '../components/Gallery'
import Product from '../components/Product';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Orderbox from '../components/Orderbox';

function ProductData() {
    const galleryWidth = 300;
    const galleryHeight = 300;
    const { id } = useParams()
    console.log(id)
    const products = useSelector((state) => state.allProductSlice.allProducts.products);
    const selectedProduct = products?.filter(item => item?.id == id)
    console.log("sele", selectedProduct)
    console.log("products", products)
    const [count, setCount] = useState(1)
    let total_price = count * selectedProduct[0]?.price
    const increment = () => {
        setCount(count + 1)
    }
    const decrement = () => {
        if (count > 1) {
            setCount(count - 1)

        }
    }
    
    return (
        <>
            <Row className='container'>
                <Col lg={6} className='d-flex justify-content-center align-items-center flex-column mt-5 mb-5 container-fluid '>
                    <h1>{selectedProduct[0]?.title}</h1>
                    <div id='gallery ' >
                        <Gallery images={selectedProduct[0]?.images} width={galleryWidth} height={galleryHeight} />
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
                            <button className='btn' onClick={decrement} ><i class="fa-solid fa-minus"></i></button>
                            <span className='shade me-5 ms-5'>{count}</span>
                            <button className='btn' onClick={increment}><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div className=' mt-3 p-2'>
                            <h3>Total Price : {total_price}</h3>
                        </div>
                        <div>
                             <Button variant='success' style={{ backgroundColor: 'green ', color: 'white' }} className='mt-5'><Orderbox /></Button>
                            
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
