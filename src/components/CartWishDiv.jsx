import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import defaultDp from '../assets/defualt_dp.png'
import { Button } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import OrderHistory from './OrderHistory';

function CartWishDiv() {
    const wishlist = useSelector((state) => state.wishListReducer);
    const cart = useSelector((state) => state.cartReducer);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='ms-auto me-2'>
                <button type="button" class="btn btn-primary me-2 " onClick={handleShow}>
                    <i class="fa-solid fa-user"></i>
                </button>
                <Link to={'/wishlist'}><button type="button" class="btn btn-primary me-3">
                    <i class="fa-solid fa-heart me-2"></i>
                    <span class="badge text-bg-primary">{wishlist.length}</span>
                </button></Link>
                <Link to={'/cart'}><button type="button" class="btn btn-primary me-3">
                    <i class="fa-solid fa-cart-shopping me-2 "></i>
                    <span class="badge text-bg-primary">{cart.length}</span>
                </button></Link>
            </div>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Hello</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush" className='mt-3 mb-3'>
                        <ListGroup.Item className='d-flex justify-content-center align-items-center'> <img src={defaultDp} height={"100px"} alt="Profile" /> </ListGroup.Item>
                        <ListGroup.Item>Prajwal VK</ListGroup.Item>
                        <ListGroup.Item>email</ListGroup.Item>
                        <ListGroup.Item>Mobile Number</ListGroup.Item>
                        <ListGroup.Item>Address</ListGroup.Item>
                    </ListGroup>
                    <div className='d-flex justify-content-center align-items-center mb-4'>
                       <OrderHistory/>
                    </div>
                    <div className='d-flex justify-content-center align-items-center mb-4'>
                        <Button onClick={() => setOpen(!open)}>
                            Edit or Add Details
                        </Button>
                    </div>
                    <Collapse in={open}>
                        <div>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h6 className='text-center'>Add Profile Pic</h6>
                                    <input className='form-control' type="file" id='dp' />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input className='form-control' type="mob" placeholder='Enter Your Mobile No' />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input className='form-control' type="number" placeholder='Enter Your Pincode' />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input className='form-control' type="text" placeholder='Enter Your House no/ street' />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input className='form-control' type="text" placeholder='Enter Your District' />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input className='form-control' type="text" placeholder='Enter State' />
                                </ListGroup.Item>
                                <Button onClick={() => setOpen(!open)} className='mb-3 mt-3'>
                                    Save
                                </Button>
                            </ListGroup>
                        </div>
                    </Collapse>
                    <button className='btn btn-warning'>logout</button>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default CartWishDiv
