import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Gallery from '../components/Gallery'
import Product from '../components/Product';
import { Link, useParams } from 'react-router-dom';
import Orderbox from '../components/Orderbox';
import { getProductById, getProductsByCategory } from '../services/allAPI';
import ProductImages from '../components/ProductImages';

function ProductData() {
    const topRef = useRef(null)
    const galleryWidth = 800;
    const galleryHeight = 800;
    const { id } = useParams()
    const [count, setCount] = useState(1)
    const [product, setProduct] = useState()
const [productsByCategory,setProductsByCategory] = useState([])
    let total_price = count * product?.price 


    const increment = () => {
        setCount(count + 1)
    }
    const decrement = () => {
        if (count > 1) {
            setCount(count - 1)

        }
    }
    const getProduct = async () => {
        if (id) {
            const result = await getProductById(id);
            if (result.status === 200) {
                setProduct(result.data)

            }
        }
    }
    console.log(product, "asdfghjkl");

    useEffect(() => {
        getProduct()
    }, [id])

    const [orderSummary,setOrderSummary] = useState({
        productID:"",
        total:"",
        itemCount:1,
        gst:""

    })   
     console.log("order Summary..",orderSummary)
     const getAllProductsByCategoryFromDb = async () => {
        const result = await getProductsByCategory(product?.category)
        if (result.status === 200) {
            setProductsByCategory(result.data)
        }
        
    }
    useEffect(()=>{
        getAllProductsByCategoryFromDb()
    },[])
    const scrollToTop = () => {
        console.log("to Top")
        topRef.current.scrollIntoView({ behaviour: 'smooth', block: 'start' })
    }

    const setOrderSummaryPlace =()=>{
        setOrderSummary({
            productID:product?._id,
            total:total_price,
            itemCount:count,
            gst:product?.gst
    
        })
    }
    return (
        <>
        <div style={{marginTop:'120px'}}>

        </div>
            {product && <Row ref={topRef} className='container' id='top'>
                <Col lg={6} className='d-flex justify-content-center align-items-center flex-column mt-5 mb-5 container-fluid '>
                    <h1>{product?.name}</h1>
                    <div id='gallery ' >
                        <ProductImages imagesData={product?.images} />
                        {/* <Gallery images={product.images} width={galleryWidth} height={galleryHeight} /> */}
                    </div>
                </Col>
                <Col>
                    <div className='p-5'>
                        <div className=' mt-3 p-2'>
                            <h1>Price : {product?.price} </h1>
                        </div>
                        <p>{product.description} <br />
                            tags : ..</p>
                        <div className='card rounded d-inline-block p-3 '>
                            <button className='btn' onClick={decrement} ><i class="fa-solid fa-minus"></i></button>
                            <span className='shade me-5 ms-5'>{count}</span>
                            <button className='btn' onClick={increment}><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div className=' mt-3 p-2'>
                            <h3>Total Price : {total_price}</h3>
                        </div>
                        <div>
                            <Button onClick={setOrderSummaryPlace} variant='success' style={{ backgroundColor: 'green ', color: 'white' }} className='mt-5'><Orderbox orderSummary={orderSummary} /></Button>

                        </div>
                    </div>
                </Col>
            </Row>}
            <div className='mt-4 container'>
                <h3>Related Products</h3>
                <div style={{ overflowX: 'scroll', display: 'flex', gap: '50px', paddingBottom: '5px' }}>
                    {productsByCategory?.length > 0 ?
                        productsByCategory.map((item) => (
                            <div onClick={scrollToTop}>
                                <Product  product={item} />
                            </div>
                        )) : <p>aa</p>

                    }
                </div>
            </div>
        </>
    )
}

export default ProductData
