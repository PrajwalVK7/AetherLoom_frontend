import Lottie from 'lottie-react'
import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import authAnimation from '../assets/animations/Animation - 1705074827320.json'
import { Link } from 'react-router-dom'
function Auths({ register }) {
    const isregister = register ? true : false
    console.log(isregister)
    return (
        <>
            <div className='container-fluid'>
                <Row className='mt-5 '>
                    <Col lg={6}>
                        <div >
                            {isregister ? <h1 className='text-center'>Signup</h1> : <h1 className='text-center'>Signin</h1>}
                            <div className='mt-4 mb-5 d-flex justify-content-center '>
                                <Form className='w-75'>
                                    {isregister &&
                                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                                            <Form.Label className='text-primary'>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Your Name" />
                                        </Form.Group>
                                    }
                                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                                        <Form.Label className='text-primary'>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Your Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                                        <Form.Label className='text-primary'>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter Your Name" />
                                    </Form.Group>

                                    {
                                        isregister ?
                                            <div>
                                                <div className=' d-flex justify-content-center'>
                                                    <Button variant='success' className=' rounded text-primary mb-5'>Signup</Button>
                                                </div> <p>Already a User Click here to  <Link to='/login' style={{ textDecoration: 'none', color: 'blue' }}>Login</Link></p>
                                            </div> :
                                            <div>
                                                <Link to='/dashboard' style={{textDecoration:'none'}}>                                    <div className=' d-flex justify-content-center'>
                                                    <Button variant='success' className=' rounded text-primary mb-5'>Signin</Button>
                                                </div></Link>
                                                <p> New User ? Click here to <Link to='/register' style={{ textDecoration: 'none', color: 'blue' }}>Register</Link></p>

                                            </div>

                                    }
                                </Form>

                            </div>

                        </div>
                    </Col>
                    <Col lg={6} className='d-flex align-items-center justify-content-center'>
                        <Lottie animationData={authAnimation} style={{ height: '350px' }} />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Auths
