import React, { useState } from "react";
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
import { ToastContainer, Slide } from "react-toastify";
import Register from "./components/Register";
import Login from "./components/Login";
import SendMessage from "./components/SendMessage";
import Contacts from "./components/Contacts";

function App() {
  const [navExpanded, expandNav] = useState(true);
  const [action, setAction] = useState<{
    login: boolean;
    register: boolean;
    send: boolean;
    contacts: boolean;
  }>({ login: true, register: false, send: false, contacts: false });
  const toggleNav = () => {
    expandNav(!navExpanded);
  };
  return (
    <Container fluid className="p-0">
      <Navbar light color="light" expand="md">
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
                  active={action.login}
                  onClick={() =>
                    setAction({
                      login: true,
                      register: false,
                      send: false,
                      contacts: false,
                    })
                  }
                >
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={action.register}
                  onClick={() =>
                    setAction({
                      login: false,
                      register: true,
                      send: false,
                      contacts: false,
                    })
                  }
                >
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={action.send}
                  onClick={() =>
                    setAction({
                      login: false,
                      register: false,
                      send: false,
                      contacts: true,
                    })
                  }
                >
                  Contacts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={action.send}
                  onClick={() =>
                    setAction({
                      login: false,
                      register: false,
                      send: true,
                      contacts: false,
                    })
                  }
                >
                  Send
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Container className="mt-3">
        {action.send && <SendMessage />}
        {action.contacts && <Contacts />}
        {action.login && <Login />}
        {action.register && <Register />}
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        transition={Slide}
        theme="light"
      />
    </Container>
  );
}

export default App;
