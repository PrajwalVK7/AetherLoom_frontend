import React from 'react'
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { getAllCategories } from '../services/allAPI'
import { useState, useEffect } from 'react';
import { baseURL } from '../services/baseURL';
function ProductCategory() {
  // const {category} = useParams
  const [categories, setCategories] = useState([])
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
      if (sessionStorage.token) {
          setToken(sessionStorage.getItem("token"))
      }
      else {
          navigate('/')
      }
  }, [])
  const getAllCategoriesFromDb = async () => {

    const result = await getAllCategories();
    console.log(result.data)
    if (result.status === 200) {
      setCategories(result.data)
      console.log(categories)
    }
  }
  useEffect(() => {
    getAllCategoriesFromDb()
  }, [])
  // console.log("cacac", categories)


  return (
    <>
      <Row>
        {categories?.length > 0 ?
          categories.map((item) => (
            <Col lg={2} md={4} sm={6} xs={6}>
              <div className='d-flex justify-content-center mb-3'>
                <Link to={`/dashboard/${item.title}`} style={{textDecoration:'none'}}>    
                <Card sx={{ minHeight: '250px', width: 170 }} style={{backgroundColor:'white'}}>
                  <CardCover >
                    <img  className='img-fluid p-2' style={{zIndex:'1000'}}
                      src={`${baseURL}uploads/${item.thumbnail}`}
                      alt=""
                    />
                  </CardCover>
                  <CardCover
                    sx={{
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                    }}
                  />
                  <CardContent sx={{ justifyContent: 'flex-end' }}>
                    <Typography level="title-lg" >
                      <span className='text-white bg-primary p-2 w-50 rounded'>{item.title}</span>
                    </Typography>
                  </CardContent>
                </Card></Link>
              </div></Col>
          ))
          : <p>No data</p>
        }
      </Row>
    </>
  )
}

export default ProductCategory
