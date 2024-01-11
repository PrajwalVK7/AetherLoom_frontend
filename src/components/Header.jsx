import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CartWishDiv from './CartWishDiv';
import { RiMenu3Fill } from "react-icons/ri";

function Header() {
    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary ">
                    <Container fluid>
                        <Navbar.Brand href="#" className='ms-5'>AetherLoom</Navbar.Brand>
                        <div className='ms-auto me-2 d-none d-lg-block'>
                            <CartWishDiv />
                        </div>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} ><RiMenu3Fill /></Navbar.Toggle>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    AetherLoom
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="#action1">Home</Nav.Link>
                                    <Nav.Link href="#action2">Features</Nav.Link>
                                    <NavDropdown
                                        title="Products"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="#action3">category 1</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            category 2
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">
                                            category 4
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action5">
                                            category 4
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action5">
                                            category 4
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Form className="d-flex justify-content-evenly">
                                    <Button variant="outline-success">Signin</Button>
                                    <Button variant="outline-success">Signup</Button>
                                </Form>
                                <div className='ms-auto mt-4  d-lg-none'>
                                    <CartWishDiv />
                                </div>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );

}

export default Header
