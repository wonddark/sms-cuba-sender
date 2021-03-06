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
import "./Header.css";

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
    expandNav(!navExpanded);
  };
  const showRegister = () => {
    dispatch(changePage("REGISTER"));
    expandNav(!navExpanded);
  };
  const showContacts = () => {
    dispatch(changePage("CONTACTS"));
    expandNav(!navExpanded);
  };
  const showSend = () => {
    dispatch(changePage("SEND"));
    expandNav(!navExpanded);
  };
  const closeSession = () => {
    dispatch(logout());
    dispatch(changePage("LOGIN"));
    expandNav(!navExpanded);
  };
  return (
    <header style={{ boxShadow: "rgb(0 0 0 / 15%) 0px 0.05rem 0.5rem 0.15px" }}>
      <Container>
        <Navbar dark expand="md" container={false} className="bg-transparent">
          <NavbarBrand href="/">SMS Cuba Send</NavbarBrand>
          <NavbarToggler onClick={toggleNav} className="ms-auto" />
          <Collapse
            navbar
            isOpen={navExpanded}
            className="ms-auto justify-content-end"
          >
            <Nav navbar pills>
              {logged && (
                <>
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
                  <NavItem>
                    <NavLink
                      onClick={closeSession}
                      style={{ cursor: "pointer" }}
                    >
                      Salir
                    </NavLink>
                  </NavItem>
                </>
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
        </Navbar>
      </Container>
    </header>
  );
}

export default Header;
