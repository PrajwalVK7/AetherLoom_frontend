import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import authAnimation from '../assets/animations/Animation - 1705074827320.json'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus } from '../redux/loginStatusSlice'
import { loginAPI, registerAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

function Auths({ register }) {
    const isregister = register ? true : false
    console.log(isregister)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const loginStatus = useSelector((state) => state.loginStatusReducer.isLoggedin);
    console.log("Login status:", loginStatus);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })
    console.log("========== userData for reg");
    console.log(userData)
    const handleRegister = async () => {
        const { username, email, password } = userData
        if (!username || !email || !password) {
            alert("please add all details")
        }
        else {
            try {
                const response = await registerAPI(userData);
                if (response.status === 200) {
                    alert("Signup successfull")
                    navigate('/login')


                }
                else {
                    alert(response.response.data)
                }

            } catch (err) {
                console.log(err)
            }
        }

    }
    const handleLogin = async () => {
        dispatch(setLoginStatus(true));
        const { email, password } = userData;
        if (!email || !password) {
            toast.warning("Please fill the form completely", {
                position: 'top-center'
            })
        } else {
            const response = await loginAPI(userData);
            if (response.status === 200) {
                sessionStorage.setItem("existingUser", JSON.stringify(response.data.existingUser))
                sessionStorage.setItem("token", response.data.token)
                Swal.fire({
                    title: "Hey :)",
                    text: "Login Successfull",
                    icon: "success"
                  });              
                    navigate('/')
            }
            else {
                toast.error(response.response.data)
            }
        }
    }
    // Use useEffect to log the updated login status
    useEffect(() => {
        console.log("Login status:", loginStatus);
    }, [loginStatus]);
    return (
        <>
            <ToastContainer />
            <div className='container-fluid' style={{marginTop:'100px'}}>
                <Row className='mt-5 '>
                    <Col lg={6}>
                        <div >
                            {isregister ? <h1 className='text-center'>Signup</h1> : <h1 className='text-center'>Signin</h1>}
                            <div className='mt-4 mb-5 d-flex justify-content-center '>
                                <Form className='w-75'>
                                    {isregister &&
                                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                                            <Form.Label className='text-primary'>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Your Name" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                                        </Form.Group>
                                    }
                                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                                        <Form.Label className='text-primary'>Email</Form.Label>
                                        <Form.Control value={userData.email} type="email" placeholder="Enter Your Name" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                                        <Form.Label className='text-primary'>Password</Form.Label>
                                        <Form.Control value={userData.password} type="password" placeholder="Enter Your Name" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                                    </Form.Group>

                                    {
                                        isregister ?
                                            <div>
                                                <div className=' d-flex justify-content-center'>
                                                    <Button variant='success' className=' rounded text-primary mb-5' onClick={handleRegister}>Signup</Button>
                                                </div> <p>Already a User Click here to  <Link to='/login' style={{ textDecoration: 'none', color: 'blue' }}>Login</Link></p>
                                            </div> :
                                            <div>
                                                {/* <Link to='/dashboard' style={{ textDecoration: 'none' }}> */}
                                                <div className=' d-flex justify-content-center'>
                                                    <Button variant='success' className=' rounded text-primary mb-5' onClick={handleLogin}>Signin</Button>
                                                </div>
                                                {/* </Link> */}
                                                <p> New User ? Click here to <Link to='/register' style={{ textDecoration: 'none', color: 'blue' }}>Register</Link></p>

                                            </div>

                                    }
                                </Form>

                            </div>

                        </div>
                    </Col>
                    <Col lg={6} className='d-flex align-items-center justify-content-center'>
                        <Lottie animationData={authAnimation} style={{ height: '350px' }} />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Auths
