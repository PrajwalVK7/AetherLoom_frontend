import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart,addToCart, decrementCount, incrementCount } from '../redux/cartSlice';

function Cart() {
  const dispatch = useDispatch()
  const cartArray = useSelector((state) => state.cartReducer);
  let totalPrice = 0;
  if (cartArray.length > 0) {
    for (let i = 0; i < cartArray.length; i++) {
      totalPrice += cartArray[i].price*cartArray[i].count
    }
  }
  // console.log(totalPrice)
  return (
    <>
      <h2 className='text-center'>Cart</h2>
      <div className='container-fluid mt-5 mb-5'>
        <Row className='mt-5 mb-5'>
          <Col lg={6}>
            <Table className='mb-5'>
              <thead>
                <tr>
                  <th>#Items</th>
                  <th></th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              {cartArray?.length > 0 ?
                cartArray.map((item, index) => (
                  <tbody>
                    <tr key={item.id} style={{ fontSize: '20px' }}>
                      {/* <td>{index + 1}</td> */}
                      <td><img src={item.thumbnail} alt={item.title} height={"150px"} width={"100%"} /></td>
                      <td>{item.title}
                        <h3>Rs: {item.price}</h3>
                        <h6>(Inclusive of all tax)</h6>
                        <i class="fa-solid fa-trash" onClick={() => dispatch(removeFromCart(item.id))}></i>
                      </td>
                      <td >
                        <div className='card rounded d-inline-block w-100 d-flex justify-content-center align-items-center '>
                        <div className='d-flex justify-content-evenly p-2 align-items-center '> 
                        <button className='btn'><i class="fa-solid fa-minus" onClick={()=>dispatch(decrementCount(item.id))}></i></button>
                        <span className='shade me-5 ms-5'>{item.count}</span>
                        <button className='btn'><i class="fa-solid fa-plus" onClick={()=>dispatch(incrementCount(item.id))}></i></button>
                        </div>
                      </div></td>
                      <td>Rs : <span>{item.price}</span></td>
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
