import React from "react";
import{ 
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
 } from "reactstrap";
 import "./Navigation.css";

const Navigation = () => (
    <Navbar className="container navbar-expand-md">
      <NavbarBrand href="/">
        Educational Game!!!
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem >
          <NavLink href="">Games</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="">High Scores</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="">Log Out</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
);

export default Navigation;