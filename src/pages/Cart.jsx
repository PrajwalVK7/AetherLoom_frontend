import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../redux/cartSlice';

function Cart() {
  const dispatch = useDispatch()
  const cartArray = useSelector((state) => state.cartReducer);
  // console.log("cartArray",cartArray.price)
  let totalPrice = 0;
  if (cartArray.length > 0) {
    for (let i = 0; i < cartArray.length; i++) {
      totalPrice += cartArray[i].price
    }
  }
  console.log(totalPrice)
  return (
    <>
      <h2 className='text-center'>Cart</h2>
      <div className='container mt-5 mb-5'>
        <Row className='mt-5 mb-5'>
          <Col lg={6}>
            <Table className='mb-5'>
              {/* <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>image</th>
                  <th>Price</th>
                </tr>
              </thead> */}
              {cartArray?.length > 0 ?
                cartArray.map((item, index) => (
                  <tbody>
                    <tr key={item.id} style={{ fontSize: '20px' }}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td><img src={item.thumbnail} alt={item.title} height={"150px"} width={"100%"} /></td>
                      <td className='fw-bolder text-success d-flex align-items-center justify-content-center' style={{ fontSize: '25px' }}><h3>{item.price}</h3></td>
                      <td><i class="fa-solid fa-trash" onClick={() => dispatch(removeFromCart(item.id))}></i></td>
                    </tr>
                  </tbody>
                )) : <p>no data</p>
              }
            </Table>
          </Col>
          <Col lg={6}>
            <h4 className='text-center'>Aetherloom</h4>
            <div>
              <div className='p-5 text-center'>
                <h3>Total Price : <span>{totalPrice}</span></h3>
                <button className='btn btn-success mt-5 mb-5' style={{ color: 'red', backgroundColor: 'success' }}>Buy now</button>
              </div>
            </div>

          </Col>
        </Row>

      </div>
    </>
  )
}

export default Cart
