// import React from 'react';
// import {  Link } from "react-router-dom";
// const Navbar = () =>{
//   return (
//   <div>
//     <li>
//       <Link to="/supplyChainApp/participants">Participants</Link>
//     </li>
//     <li>
//       <Link to="/supplyChainApp/products">Products</Link>
//     </li>
//   </div>
//   );
// }
// export default Navbar;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/bootstrap.min.css';  
import React, { useState } from "react";


function MyNavbar() {
  const [showParticipant, setShowParticipant] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  const showParticipantDropdown = (e)=>{
      setShowParticipant(!showParticipant);
  }
  const hideParticipantDropdown = e => {
      setShowParticipant(false);
  }

  const showProductDropdown = (e)=>{
    setShowProduct(!showProduct);
  }
  const hideProductDropdown = e => {
    setShowProduct(false);
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/supplyChainApp/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/supplyChainApp/participants">Participants</Nav.Link> */}
            <NavDropdown title="Participants" id="basic-nav-dropdown"
              show={showParticipant}
              onMouseEnter={showParticipantDropdown} 
              onMouseLeave={hideParticipantDropdown}
            >
              <NavDropdown.Item href="/supplyChainApp/getParticipant">Get Participant Details</NavDropdown.Item>
              <NavDropdown.Item href="/supplyChainApp/addParticipant">Add New Participant</NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            {/* <Nav.Link href="/supplyChainApp/products">Products</Nav.Link> */}
            <NavDropdown title="Products" id="basic-nav-dropdown"
              show={showProduct}
              onMouseEnter={showProductDropdown} 
              onMouseLeave={hideProductDropdown}
            >
              <NavDropdown.Item href="/supplyChainApp/products">Products</NavDropdown.Item>
              <NavDropdown.Item href="/supplyChainApp/changeProductOwnership">Change Product Ownership</NavDropdown.Item>
              <NavDropdown.Item href="/supplyChainApp/addProduct">Add New Product</NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="/supplyChainApp/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;