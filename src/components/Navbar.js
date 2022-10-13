import React from 'react';
import {  Link } from "react-router-dom";
const Navbar = () =>{
  return (
  <div>
    <li>
      <Link to="/supplyChainApp/participants">Participants</Link>
    </li>
    <li>
      <Link to="/supplyChainApp/products">Products</Link>
    </li>
  </div>
  );
}
export default Navbar;
