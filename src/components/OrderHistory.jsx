import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function OrderHistory() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                    </tr>
                    <tr>
                        <td>#</td>
                        <td>product details</td>
                    </tr>
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