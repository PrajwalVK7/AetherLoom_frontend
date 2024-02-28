import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { Link, useParams } from 'react-router-dom';
import { getAllCategories, getAllProducts, getProductsByCategory } from '../services/allAPI';
function Dashboard() {
    const title = useParams()
    const [categoryName, setCategoryName] = useState('')
    const [allProducts, setAllProducts] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [error,setError] = useState('')
    useEffect(() => {
        if (title) {
            setCategoryName(title.categoryName)
        }
        else {
            setCategoryName('')
        }
    }, [])
    const [category, setCategory] = useState('')
    const getCategories = async () => {
        const categories = await getAllCategories()
        if (categories.status === 200) {
            setCategory(categories.data)
        }
        else {
            console.log(categories.response.data)
        }
    }
    const getAllProductsFromDb = async () => {
        const result = await getAllProducts(searchKey);
        console.log(result)

        if (result.status === 200) {
            setAllProducts(result.data)
        }
        else{
            setAllProducts([])
            setError(result.response.data)
        }
    }
    const getAllProductsByCategoryFromDb = async () => {
        const result = await getProductsByCategory(categoryName)
        if (result.status === 200) {
            setAllProducts(result.data)
        }
        else{
            setAllProducts([])
            setError(result.response.data)
        }
    }
    useEffect(()=>{
        getCategories()
    },[])
    useEffect(() => {
        getAllProductsFromDb()
    }, [searchKey])

useEffect(()=>{
    getAllProductsByCategoryFromDb()
},[categoryName])
console.log("Length of allProducts:", allProducts?.length);

    return (
        <>
            <div className='container mt-5 mb-5'>
                <h2 className='text-center' >Explore Our Products</h2>
                <div className='d-flex justify-content-center align-items-center mt-3 mb-2'>
                    <input type='type' className='form-control w-50 ' placeholder='Search our products' onChange={(e) => setSearchKey(e.target.value)} />
                    <i class="fa-solid fa-magnifying-glass " style={{ marginLeft: '-70px' }}></i>

                </div>
                < div className='d-flex justify-content-evenly p-3' style={{ overflowX: 'scroll', scrollbarColor: 'yellow' }}>
                    {category?.length > 0 ?
                        category.map((item) => (
                            <div className=' ms-2'>
                                <button className='btn w-100 ms-2 me-3' onClick={() => setCategoryName(item.title)} >{item.title}</button>
                            </div>

                        )) :
                        <p>No data</p>
                    }
                </div>
                <div>
                    <Row>
                        {allProducts?.length > 0 ? 
                            allProducts.map((product) => (
                                <Col lg={4} md={4} sm={6} xs={12} className="d-flex justify-content-center" key={product._id}>
                                    <Product product={product} />
                                </Col>
                            )) : <p>No Product</p>

                        }
                    </Row>

                </div>
            </div>
        </>
    )
}

export default Dashboard
