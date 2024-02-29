import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { getUserData, placeOrder, removeAllFromCarts } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { editUserProfileContext } from '../context/ContextShare';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

function Orderbox({ orderSummary, itemCount, productID }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [orderData, setOrderData] = useState({
        address: '',
        products: [],
        total: 0,
        itemCount: 0,
        modeOfPayment: '',
    });
    // console.log("order summary ",orderSummary)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState(false);
    const { editProfileResponse, seteditProfileResponse } = useContext(editUserProfileContext);
    const [address, setaddress] = useState('');
    const token = sessionStorage.getItem('token');
    const [userData, setUserData] = useState({});

    const getUserProfile = async () => {
        const token = sessionStorage.getItem('token');
        const reqHeader = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        try {
            const result = await getUserData(reqHeader);
            if (result.status === 200) {
                setUserData(result.data);
                const { street, district, pincode, state } = result.data;
                if (street && district && pincode && state) {
                    const userAddress = `${street},${district},${pincode},${state}`;
                    setaddress(userAddress);

                    setOrderData((prevOrderData) => ({
                        ...prevOrderData,
                        address: userAddress,
                    }));
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (sessionStorage.token) {
            getUserProfile();
        } else {
            navigate('/login');
        }
    }, [token, editProfileResponse]);

    useEffect(() => {
        const totalAmount = orderSummary.products.reduce((total, product) => total + product.total, 0);
        setOrderData((prevOrderData) => ({
            ...prevOrderData,
            total: totalAmount,
            itemCount: itemCount,
            products: orderSummary.products,
        }));
    }, [orderSummary, itemCount]);

    const handleOrder = async () => {
        const reqHeader = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
    
        const { products, modeOfPayment, address, total } = orderData;
    
        if (products.length > 0 && modeOfPayment && address) {
            try {
                for (const product of products) {
                    let individualOrderData;
                    if (product.product) {
                        // cart
                        individualOrderData = {
                            address,
                            productID: product.product._id,
                            total: product.total,
                            itemCount: product.itemCount,
                            modeOfPayment,
                        };
                    } else {
                        // single
                        individualOrderData = {
                            address,
                            productID: product.productID,
                            total: product.total,
                            itemCount: product.itemCount,
                            modeOfPayment,
                        };
                    }
    
                    const response = await placeOrder(individualOrderData, reqHeader);
                    // console.log('order data', response.data);
    
                    if (response.status === 200) {
                        dispatch(clearCart())
                        const response = await removeAllFromCarts(reqHeader)
                        console.group(response)
                        let timerInterval;
                        Swal.fire({
                            title: 'Hey hey, Confirming your order',
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                                timerInterval = setInterval(() => {
                                    const timer = Swal.getPopup()?.querySelector('b');
                                    if (timer) {
                                        timer.textContent = `${Swal.getTimerLeft()}`;
                                    }
                                }, 100);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            },
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log('I was closed by the timer');
                            }
                        });
                    }
                }
    
                handleClose();
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('Please fill in all the required details.');
        }
    };
    
    
    
      

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Buy Now
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="container d-flex justify-content-center align-items-center flex-column">
                        <div className="p-3 w-50">
                            <h2 className="text-center">Order Summary</h2>
                            <ListGroup variant="flush" className="text-center">
                                {orderSummary.products.map((product, index) => (
                                    <ListGroup.Item key={index}>
                                        {product.itemCount}  - Total: {product.total}
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>Total Amount : {orderData.total}</ListGroup.Item>
                            </ListGroup>
                        </div>
                        <Button
                            style={{ backgroundColor: 'green', color: 'black' }}
                            onClick={() => setOpen(!open)}
                            aria-expanded={open}
                            variant="success"
                        >
                            Proceed To Buy
                        </Button>
                        <Collapse in={open}>
                            <div className="mt-5">
                                <div className="mt-2 text-center text-black">
                                    <p>
                                        <h5>Address</h5>
                                        {address}
                                    </p>
                                </div>
                                <Form className="text-center">
                                    <h3 className="text-center">Select Mode Of Payment</h3>
                                    <div>
                                        <input
                                            type="radio"
                                            id="upi"
                                            name="payment"
                                            value={'upi'}
                                            onChange={(e) => setOrderData({ ...orderData, modeOfPayment: e.target.value })}
                                        />
                                        <label className="ms-3 " htmlFor="upi">
                                            <div className="card p-1 text-center" style={{ width: '200px', backgroundColor: 'orange', color: 'black' }}>
                                                <h4>UPI</h4>
                                            </div>
                                        </label>
                                    </div>
                                    <br />
                                    <div>
                                        <input
                                            type="radio"
                                            id="debitCard"
                                            name="payment"
                                            value={'debitCard'}
                                            onChange={(e) => setOrderData({ ...orderData, modeOfPayment: e.target.value })}
                                        />
                                        <label className="ms-3" htmlFor="debitCard">
                                            <div className="card p-1 text-center" style={{ width: '200px', backgroundColor: 'orange', color: 'black' }}>
                                                <h4>Debit Card</h4>
                                            </div>
                                        </label>
                                    </div>{' '}
                                    <br />
                                    <div>
                                        <input
                                            type="radio"
                                            id="cod"
                                            name="payment"
                                            value={'cod'}
                                            onChange={(e) => setOrderData({ ...orderData, modeOfPayment: e.target.value })}
                                        />
                                        <label className="ms-3" htmlFor="cod">
                                            <div className="card p-1 text-center" style={{ width: '200px', backgroundColor: 'orange', color: 'black' }}>
                                                <h4>Cash On Delivery</h4>
                                            </div>
                                        </label>
                                    </div>
                                    <button
                                        style={{ backgroundColor: 'green', color: 'black', fontWeight: '700' }}
                                        type="button"
                                        className="mt-3 btn btn-success"
                                        onClick={handleOrder}
                                    >
                                        Place Order
                                    </button>
                                </Form>
                            </div>
                        </Collapse>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Orderbox;
