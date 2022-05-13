import React from "react";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import { ToastContainer, Slide } from "react-toastify";
import Register from "./components/Register";
import Login from "./components/Login";
import SendMessage from "./components/SendMessage";

function App() {
  return (
    <Container fluid>
      <Navbar light color="light">
        <Container>
          <NavbarBrand>SMS Cuba Send</NavbarBrand>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <SendMessage />
        <br />
        <Login />
        <br />
        <Register />
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
