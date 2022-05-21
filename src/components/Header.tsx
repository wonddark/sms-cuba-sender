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
import { logout } from "../store/sessionSlice";

function Header() {
  const dispatch = useAppDispatch();
  const { currentPage, logged } = useAppSelector((state) => ({
    currentPage: state.page.current,
    logged: state.session.logged,
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
  const closeSession = () => {
    dispatch(logout());
    dispatch(changePage("LOGIN"));
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
                active={currentPage === "CONTACTS"}
                onClick={showContacts}
                style={{ cursor: "pointer" }}
              >
                Contactos
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={currentPage === "SEND"}
                onClick={showSend}
                style={{ cursor: "pointer" }}
              >
                Enviar
              </NavLink>
            </NavItem>
            {logged && (
              <NavItem>
                <NavLink onClick={closeSession} style={{ cursor: "pointer" }}>
                  Salir
                </NavLink>
              </NavItem>
            )}
            {!logged && (
              <>
                <NavItem>
                  <NavLink
                    active={currentPage === "LOGIN"}
                    onClick={showLogin}
                    style={{ cursor: "pointer" }}
                  >
                    Entrar
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={currentPage === "REGISTER"}
                    onClick={showRegister}
                    style={{ cursor: "pointer" }}
                  >
                    Registro
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
