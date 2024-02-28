import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Orderbox from '../components/Orderbox';
import { baseURL } from '../services/baseURL';
import { getAllFromCart } from '../redux/cartSlice';
import { addToCartAPI, editCartAPI, removeFromCart } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import Empty from '../components/Empty';
function Cart() {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const [deleteFromCart, setDeleteFromcart] = useState(false)
  const [newCount, setNewCount] = useState()
  useEffect(() => {
    console.log('Token:', token);
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      dispatch(getAllFromCart(reqHeader));
      setDeleteFromcart(false)

    } else {
      navigate('/login');
    }
  }, [dispatch, deleteFromCart, token]);

  const cartArray = useSelector((state) => state.cartReducer.allProducts);
  console.log(cartArray);
  let totalPrice = 0;
  if (cartArray?.length > 0) {
    for (let i = 0; i < cartArray.length; i++) {
      totalPrice += cartArray[i].product.price * cartArray[i].count
    }
  }
  // console.log(totalPrice)
  const handleDecrement = async (itemID, currentCount) => {
    if (currentCount > 1) {
      const updatedCount = currentCount - 1;
      setNewCount(updatedCount);
      // console.log(newCount)

      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const reqBody = {
        count : updatedCount
      }
      const result = await editCartAPI(itemID, reqBody, reqHeader);
      if(result.status===200){
        setDeleteFromcart(true)
      }
    }
  };
  
  const handleIncrement = async (itemID, currentCount) => {
    const updatedCount = currentCount + 1;
    setNewCount(updatedCount);
  console.log(newCount)
  const reqBody = {
    count : updatedCount
  }
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  
    const result = await editCartAPI(itemID, reqBody, reqHeader);
    if(result.status===200){
      setDeleteFromcart(true)
    }
  };
  
 

  const handleDeleteFromCart = async (itemID) => {
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const response = await removeFromCart(itemID, reqHeader)
      setDeleteFromcart(true)
      if (response.status === 200) {
        toast.success("Item was removed")
      }
      else {
        console.log(response.response.data)
      }
      //  console.log(response)

    }

  }
  const newFeature = ()=>{
    // e.preventDefault;
    alert("Under Dev")
  }
  const [orderSummary,setOrderSummary] = useState({
    productID:"",
    total:"",
    itemCount:"",
    gst:""

})  
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
                      <td><img src={`${baseURL}uploads/${item.product.thumbnail}`} alt={item.title} height={"150px"} width={"100%"} /></td>
                      <td>{item.title}
                        <h3>Rs: {item.product.price}</h3>
                        <h6>(Inclusive of all tax)</h6>
                        <i class="fa-solid fa-trash" onClick={() => handleDeleteFromCart(item._id)} ></i>
                      </td>
                      <td >
                        <div className='card rounded d-inline-block w-100 d-flex justify-content-center align-items-center '>
                          <div className='d-flex justify-content-evenly p-2 align-items-center '>
                            <button className='btn' onClick={()=>handleDecrement(item._id,item.count)}><i class="fa-solid fa-minus" ></i></button>
                            <span  className='shade me-5 ms-5'>{item.count}</span>
                            <button className='btn' onClick={()=>handleIncrement(item._id,item.count)}><i class="fa-solid fa-plus" ></i></button>
                          </div>
                        </div></td>
                      <td>Rs : <span>{item.product.price * item.count}</span></td>
                      <td><Orderbox
                        orderSummary={{
                          productID: item.product._id,
                          total: item.product.price * item.count,
                          itemCount: item.count,
                          gst: item.product.gst
                        }}
                        newCount={newCount}
                      /></td>
                    </tr>
                  </tbody>
                )) : <div className='d-flex justify-content-center'><Empty/></div>
              }
            </Table>
          </Col>
          <Col lg={6}>
            <h4 className='text-center'>Aetherloom</h4>
            <div>
              <div className='p-5 text-center'>
                <h3>Total Price : <span>{totalPrice}</span></h3>
                {/* <Orderbox orderSummary={} /> */}
                <button className='btn btn-warning' onClick={newFeature}>Place Order</button>
              </div>
            </div>

          </Col>
        </Row>

      </div>
    </>
  )
}

export default Cart
