import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { getOrdersAPI } from '../services/allAPI';

function OrderHistory() {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getOrders = async () => {
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const result = await getOrdersAPI(reqHeader);
    console.log(result.data,"a"); 
        console.log(result)
    if (result.status === 200) {
      setOrders(result.data);
    } else {
      console.log('Error fetching Orders');
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Orders
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Order History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
              {orders?.length > 0 ? (
                orders.map((order, index) => (
                  <React.Fragment key={order._id}>
                    {order.items.map((item, itemIndex) => (
                      <tr key={`${order._id}-${itemIndex}`}>
                        <td>{index + 1}</td>
                        <td>
                          {item.productID?.name ||
                            'Product not available'}
                        </td>
                        <td>{item.itemCount}</td>
                        <td>{item.total}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No orders yet</td>
                </tr>
              )}
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

export default OrderHistory;
