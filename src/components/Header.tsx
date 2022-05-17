import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../store/pageSlice";
import { AppState } from "../store";

function Header() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state: AppState) => ({
    currentPage: state.page.current,
  }));
  const [navExpanded, expandNav] = useState(true);
  const toggleNav = () => {
    expandNav(!navExpanded);
  };
  const showLogin = () => {
    dispatch(changePage("LOGIN"));
  };
  const showRegister = () => {
    dispatch(changePage("REGISTER"));
  };
  const showContacts = () => {
    dispatch(changePage("CONTACTS"));
  };
  const showSend = () => {
    dispatch(changePage("SEND"));
  };
  return (
    <Navbar light color="light" expand="lg">
      <Container className="d-flex p-0">
        <NavbarBrand>SMS Cuba Send</NavbarBrand>
        <NavbarToggler onClick={toggleNav} className="ms-auto" />
        <Collapse
          navbar
          isOpen={navExpanded}
          className="ms-auto justify-content-end"
        >
          <Nav navbar tabs>
            <NavItem>
              <NavLink active={currentPage === "LOGIN"} onClick={showLogin}>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={currentPage === "REGISTER"}
                onClick={showRegister}
              >
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={currentPage === "CONTACTS"}
                onClick={showContacts}
              >
                Contacts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={currentPage === "SEND"} onClick={showSend}>
                Send
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
