import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';



function Orderbox() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState(false);
    const handleOrder = () => {
        alert("Your Order is successfully Placed")
        setOpen(false)
        handleClose()
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Buy Now
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='container d-flex justify-content-center align-items-center flex-column'>
                        <div className='p-3 w-50'>
                            <h2 className='text-center' >Order Summary</h2>
                            <ListGroup variant="flush" className='text-center'>
                                <ListGroup.Item>Amount : 5000</ListGroup.Item>
                                <ListGroup.Item>GST :  23</ListGroup.Item>
                                <ListGroup.Item>Discount : 123</ListGroup.Item>
                                <ListGroup.Item>Total Amount : 5000</ListGroup.Item>
                            </ListGroup>
                        </div>
                        <Button style={{ backgroundColor: 'green', color: 'black' }}
                            onClick={() => setOpen(!open)}
                            aria-expanded={open}
                            variant='success'
                        >
                            Proceed To Buy
                        </Button>
                        <Collapse in={open}>

                            <div className='mt-5'>
                                <div className='mt-2 text-center text-black'>
                                    <p><h5 >Address</h5>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, minus?</p>
                                </div>
                                <Form className='text-center'>
                                    <h3 className='text-center'>Select Mode Of Payment</h3>
                                    <div>
                                        <input type="radio" id='upi' name='payment' value={'upi'} />
                                        <label className='ms-3 ' htmlFor="upi">
                                            <div className='card p-1 text-center' style={{ width: '200px', backgroundColor: 'orange', color: 'black' }}>
                                                <h4 >UPI</h4>
                                            </div>
                                        </label>
                                    </div>
                                    <br />
                                    <div>
                                        <input type="radio" id='debitCard' name='payment' value={'debitCard'} />
                                        <label className='ms-3' htmlFor="debitCard">
                                            <div className='card p-1 text-center' style={{ width: '200px', backgroundColor: 'orange', color: 'black' }}>
                                                <h4 >Debit Card</h4>
                                            </div>
                                        </label>
                                    </div> <br />
                                    <div>
                                        <input type="radio" id='cod' name='payment' value={'cod'} />
                                        <label className='ms-3' htmlFor="cod">
                                            <div className='card p-1 text-center' style={{ width: '200px', backgroundColor: 'orange', color: 'black' }}>
                                                <h4 >Cash On Delivery</h4>
                                            </div>
                                        </label>
                                    </div>
                                    <button style={{ backgroundColor: 'green', color: 'black', fontWeight: '700' }} type='button' className='mt-3 btn btn-success'
                                        onClick={handleOrder}>Place Order</button>
                                </Form>
                            </div>
                        </Collapse>


                    </div >

                </Modal.Body>
            </Modal>


        </>
    )
}

export default Orderbox