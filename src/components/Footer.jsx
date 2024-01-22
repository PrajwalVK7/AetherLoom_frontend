import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='container'>
            <Row>
                <Col lg={4} md={4} xs={12} sm={12} className='text-center mt-3' >
                    <h3>AetherLoom</h3>
                    <Link style={{textDecoration:'none'}}><h6>Home</h6></Link>
                    <Link  style={{textDecoration:'none'}}><h6>Login</h6></Link>
                    <Link  style={{textDecoration:'none'}}><h6>Register</h6></Link>


                    </Col>
                <Col lg={4} md={4} xs={12} sm={12} className='text-center mt-3'  >
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <p > AetherLoom <br />
                                Kasargod, Kerala, 671310 <br />
                                <i class="fa-solid fa-phone"></i> +91 123456, +91 1254789</p>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12} >
                            <div>
                                <i class="fa-brands fa-instagram me-5"></i>
                                <i class="fa-brands fa-facebook me-5"></i>
                                <i class="fa-brands fa-x-twitter me-5"></i>
                                <i class="fa-brands fa-google me-5"></i>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} md={4} xs={12} sm={12} className='d-flex justify-content-center mt-3'>
                    <div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31161.947058237274!2d74.96340685215537!3d12.50002076749717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba482155de6aad1%3A0x3a07d5464844020a!2sKasaragod%2C%20Kerala!5e0!3m2!1sen!2sin!4v1705071254734!5m2!1sen!2sin" width="200" height="200"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </Col>


            </Row>
            <Row className='mt-2'>
                <Col lg={12}>
                    <h6 className='text-center'>&#169;Copyright @2024, Made With React</h6>
                </Col>
            </Row>
        </div>
    )
}

export default Footer
