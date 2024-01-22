import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../redux/allProductSlice';
function Dashboard() {
    const { categoryName } = useParams()
    const dispatch = useDispatch()
    // console.log("category name from url", categoryName)
    const [category, setCategory] = useState('')
    // console.log('usestate', category)
    const products = useSelector((state) => state.allProductSlice.allProducts.products);
    // console.log(products)
    const categories = products?.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index) // filtering only unique categories from data
    // console.log(categories)
    const filteredProducts = category ? products?.filter(item => item.category === category) : products;
    // console.log(filteredProducts)
    useEffect(() => {
        if(categoryName){
            // console.log("insid",categoryName)
            setCategory(categoryName)

        }
    },[])

    return (
        <>
            <div className='container mt-5 mb-5'>
                <h2 className='text-center' >Explore Our Products</h2>
                <div className='d-flex justify-content-center align-items-center mt-3 mb-2'>
                    <input type='type' className='form-control w-50 ' placeholder='Search our products' onChange={(e)=>dispatch(search(e.target.value))} />
                    <div>

                    </div>
                    <i class="fa-solid fa-magnifying-glass "></i>
                    
                </div>
                <div className='d-flex justify-content-evenly container-fluid mt-4 pb-3' style={{ overflowX: 'scroll' }}>
                    {categories?.length > 0 ?
                        categories.map((item, index) => (
                            <Button key={index} variant="primary" onClick={() => setCategory(item)
                            }>{item}</Button>
                        )
                        ) : <p>..</p>

                    }
                </div>
                <div>
                    <Row>
                        {filteredProducts?.length > 0 ?
                            filteredProducts.map((item) => (
                                <Col key={item.id} lg={4} md={4} sm={6} xs={12} className='d-flex justify-content-center'>
                                        <Product product={item}  />
                                </Col>
                            )) : <p>no data</p>
                        }
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Dashboard
