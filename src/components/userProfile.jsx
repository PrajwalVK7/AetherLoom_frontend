import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import defaultDp from '../assets/defualt_dp.png';
import { Button } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import OrderHistory from './OrderHistory';
import { getUserData, updateProfileData } from '../services/allAPI';
import { baseURL } from '../services/baseURL';
import { editUserProfileContext } from '../context/ContextShare';

function UserProfile() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState('')
    const { editProfileResponse, seteditProfileResponse } = useContext(editUserProfileContext)
    const [userData, setUserData] = useState({})
    const [editProfileDetails, setEditProfileDetails] = useState({
        mobile: "",
        pincode: "",
        street: "",
        district: "",
        state: "",
        profile: ""
    })
    const [profilePreview, setProfilePreview] = useState('')
    const [updateStatus, setUpdateStatus] = useState()
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate('/');
        handleClose();
    };
    useEffect(() => {
        if (sessionStorage.token) {
            setToken(sessionStorage.getItem("token"))
            console.log("token")
        }
        else {
            navigate('/login');
            handleClose()
            setOpen(!open)
        }
    }, [sessionStorage.token])
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
            }
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            getUserProfile()
        }
    }, [updateStatus, token])
    useEffect(() => {
        if (editProfileDetails.profile) {
            setProfilePreview(URL.createObjectURL(editProfileDetails.profile))

        }
    }, [editProfileDetails.profile])
    // console.log(userData, 'DFGhj')
    // console.log("edit",editProfileDetails)

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("sdfghjkl")
        const token = sessionStorage.getItem("token")
        const { mobile, street, pincode, state, district, profile } = editProfileDetails
        if (!mobile || !street || !pincode || !state || !district || !profile) {
            alert("Please add all details to complete")
        }
        else {
            try {
                const reqBody = new FormData();
                reqBody.append("mobile", mobile);
                reqBody.append("pincode", pincode);
                reqBody.append("street", street);
                reqBody.append("district", district);
                reqBody.append("state", state);
                reqBody.append("profile", profile);



                if (profilePreview) {
                    const reqHeader = {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                    const response = await updateProfileData(reqBody, reqHeader)
                    if (response.status === 200) {
                        setUpdateStatus(response)
                        seteditProfileResponse(response.data)
                    }
                    else {
                        console.log(response.response.data)
                    }
                }
                else {
                    const reqHeader = {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                    const response = await updateProfileData(reqBody, reqHeader)
                    console.log(response)
                    if (response.status === 200) {
                        setUpdateStatus(response)
                    }
                    else {
                        console.log(response.response.data)
                    }
                }

            }
            catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <>
            <button type="button" class="btn btn-primary me-2 " onClick={handleShow}>
                <i class="fa-solid fa-user"></i>
            </button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Hello {userData?.username}!!! </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush" className='mt-3 mb-3'>
                        <ListGroup.Item className='d-flex justify-content-center align-items-center'> <img src={profilePreview ? profilePreview : `${baseURL}uploads/${userData.profile}`} height={"100px"} alt="Profile" /> </ListGroup.Item>
                        <ListGroup.Item>{userData.username}</ListGroup.Item>
                        <ListGroup.Item>Email :{userData.email}</ListGroup.Item>
                        <ListGroup.Item>Mob : {userData.mobile}</ListGroup.Item>
                        <ListGroup.Item>Address : {userData.street},{userData.district},{userData.state},{userData.pincode}</ListGroup.Item>
                    </ListGroup>

                    <div className='d-flex justify-content-center align-items-center mb-4'>
                        <Button onClick={() => setOpen(!open)}>
                            Edit or Add Details
                        </Button>
                    </div>

                    <Collapse in={open}>
                        <div>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h6 className='text-center'>Add Profile Pic</h6>
                                    <input onChange={(e) => setEditProfileDetails({ ...editProfileDetails, profile: e.target.files[0] })} className='form-control' type="file" id='dp' />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input onChange={(e) => setEditProfileDetails({ ...editProfileDetails, mobile: e.target.value })} className='form-control' type="mob" placeholder='Enter Your Mobile No' />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input onChange={(e) => setEditProfileDetails({ ...editProfileDetails, pincode: e.target.value })} className='form-control' type="number" placeholder='Enter Your Pincode' />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input onChange={(e) => setEditProfileDetails({ ...editProfileDetails, street: e.target.value })} className='form-control' type="text" placeholder='Enter Your House no/ street' />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input onChange={(e) => setEditProfileDetails({ ...editProfileDetails, district: e.target.value })} className='form-control' type="text" placeholder='Enter Your District' />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input onChange={(e) => setEditProfileDetails({ ...editProfileDetails, state: e.target.value })} className='form-control' type="text" placeholder='Enter State' />
                                </ListGroup.Item>
                                <Button onClick={handleUpdate} className='mb-3 mt-3'>
                                    Save
                                </Button>
                            </ListGroup>
                        </div>
                    </Collapse>
                    <div className='d-flex justify-content-center align-items-center mb-4'>
                        <OrderHistory />
                    </div>
                    <div className='d-flex justify-content-center align-items-center mb-4'>
                    <button className='btn btn-warning' onClick={handleLogout}>logout</button>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default UserProfile;

