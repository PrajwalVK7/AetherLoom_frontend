import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { getOrdersAPI } from '../services/allAPI';

function OrderHistory() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orders, setOrders] = useState([])
  const getOrders = async () => {
    const token = sessionStorage.getItem('token');
    // console.log("token", token);

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const result = await getOrdersAPI(reqHeader)
    console.log(result)
    if (result.status === 200) {
      setOrders(result.data)
    }
    else {
      console.log("Error fetching Orers")
    }
  }
  useEffect(() => {
    getOrders()
  }, [])
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Orders
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <table className='table'>
              <tbody>
                <tr>
                  <td>#</td>
                  <td>product details</td>
                  <td>nos</td>
                  <td>Amount</td>

                </tr>
                {
                  orders?.length > 0 ?
                    orders.map((item,index) => (
                      <tr>
                        <td>{index+1}</td>
                        <td>{item.productID?item.productID.name:item._id}</td>
                        <td>{item.itemCount}</td>
                        <td>{item.total}</td>
                      </tr>
                    )) :<p>No orders yet</p>
                }
              </tbody>
            
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderHistory