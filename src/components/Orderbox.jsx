import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { getUserData, placeOrder } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { editUserProfileContext } from '../context/ContextShare';



function Orderbox({ orderSummary }) {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    console.log("Order summary inside order", orderSummary)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState(false);
    // const [token, setToken] = useState('');
    const { editProfileResponse, seteditProfileResponse } = useContext(editUserProfileContext)

    const [address, setaddress] = useState("");
    const token = sessionStorage.getItem("token")
    const [userData, setUserData] = useState({})
    console.log("asdfghjk", address)
    const getUserProfile = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        // console.log(reqHeader)
        try {
            const result = await getUserData(reqHeader);
            if (result.status === 200) {
                setUserData(result.data);
                const { street, district, pincode, state } = result.data;
                if (street && district && pincode && state) {
                    const userAddress = `${street},${district},${pincode},${state}`;
                    setaddress(userAddress);
    
                    setOrderData(prevOrderData => ({
                        ...prevOrderData,
                        address: userAddress
                    }));
        }
    }
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        if (sessionStorage.token) {
            getUserProfile()
        }
        else {
            navigate('/login')
        }
    }, [token,editProfileResponse])

    let totalAmount = orderSummary?.total + (orderSummary?.total * orderSummary?.gst / 100)
    console.log("totel count", totalAmount)
    const [orderData, setOrderData] = useState({
        address: address,
        productID: orderSummary.productID ,
        total: totalAmount,
        itemCount: orderSummary.itemCount,
        modeOfPayment: ""
    });

    console.log(orderData, "sdfghjkl;")
    console.log("Product id:", orderSummary.productID)

    const handleOrder = async () => {
        console.log("Token,", token);
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        
        const { productID, total, itemCount, modeOfPayment,address } = orderData;
        console.log("Product id:", productID);
    
        if (productID && total && itemCount && modeOfPayment && address) {
            if (modeOfPayment === "cod") {
                try {
                    const response = await placeOrder(orderData, reqHeader);
                    console.log(response);
                    if (response.status === 200) {
                        alert("Your Order has been placed")
                        handleClose();
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            } else {
                if (!modeOfPayment) {
                    alert("Please select the mode of payment");
                }
                if (modeOfPayment !== "cod") {
                    alert(`${modeOfPayment} mode is unavailable now...`);
                }
            }
        } else {
            alert("Please fill in all the required details.");
        }
    };
    

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
                                <ListGroup.Item>Amount : {orderSummary.total}</ListGroup.Item>
                                <ListGroup.Item>GST :  {orderSummary.gst}</ListGroup.Item>
                                {/* <ListGroup.Item>Discount : 123</ListGroup.Item> */}
                                <ListGroup.Item>Total Amount : {totalAmount}</ListGroup.Item>
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
                                        {address}</p>
                                </div>
                                <Form className='text-center'>
                                    <h3 className='text-center'>Select Mode Of Payment</h3>
                                    <div>
                                        <input type="radio" id='upi' name='payment' value={'upi'} onChange={(e) => setOrderData({ ...orderData, modeOfPayment: e.target.value })} />
                                        <label className='ms-3 ' htmlFor="upi">
                                            <div className='card p-1 text-center' style={{ width: '200px', backgroundColor: 'orange', color: 'black' }}>
                                                <h4 >UPI</h4>
                                            </div>
                                        </label>
                                    </div>
                                    <br />
                                    <div>
                                        <input type="radio" id='debitCard' name='payment' value={'debitCard'} onChange={(e) => setOrderData({ ...orderData, modeOfPayment: e.target.value })} />
                                        <label className='ms-3' htmlFor="debitCard">
                                            <div className='card p-1 text-center' style={{ width: '200px', backgroundColor: 'orange', color: 'black' }}>
                                                <h4 >Debit Card</h4>
                                            </div>
                                        </label>
                                    </div> <br />
                                    <div>
                                        <input type="radio" id='cod' name='payment' value={'cod'} onChange={(e) => setOrderData({ ...orderData, modeOfPayment: e.target.value })} />
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