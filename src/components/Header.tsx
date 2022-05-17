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
import { changePage } from "../store/pageSlice";
import { useAppDispatch, useAppSelector } from "../hooks/store";

function Header() {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => ({
    currentPage: state.page.current,
  }));
  const [navExpanded, expandNav] = useState(false);
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
              <NavLink
                active={currentPage === "LOGIN"}
                onClick={showLogin}
                style={{ cursor: "pointer" }}
              >
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={currentPage === "REGISTER"}
                onClick={showRegister}
                style={{ cursor: "pointer" }}
              >
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={currentPage === "CONTACTS"}
                onClick={showContacts}
                style={{ cursor: "pointer" }}
              >
                Contacts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={currentPage === "SEND"}
                onClick={showSend}
                style={{ cursor: "pointer" }}
              >
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
