import React from "react";
import{
 Navbar,
 NavbarBrand,
 Nav,
 NavItem,
 NavLink
} from "reactstrap";
import "./Navigation.css";
import logosm from "../../images/logosm.svg";

const Navigation = () => (
    <Navbar>
      <div className="container">
      <NavbarBrand href="/">
      </NavbarBrand>
      <div className="logosm">
        <img alt="logo" src={logosm} />
      </div>
      <Nav navbar>
        {/* <NavItem >
          <NavLink href="">Games</NavLink>
        </NavItem> */}
      </Nav>
      </div>
    </Navbar>
);

export default Navigation;