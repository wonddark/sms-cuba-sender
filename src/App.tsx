import React from "react";
import { Container } from "reactstrap";
import { ToastContainer, Slide } from "react-toastify";
import Register from "./components/Register";
import Login from "./components/Login";
import SendMessage from "./components/SendMessage";
import Contacts from "./components/Contacts";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { AppState } from "./store";

function App() {
  const { currentPage } = useSelector((state: AppState) => ({
    currentPage: state.page.current,
  }));
  return (
    <Container fluid className="p-0">
      <Header />
      <Container className="mt-3">
        {currentPage === "SEND" && <SendMessage />}
        {currentPage === "CONTACTS" && <Contacts />}
        {currentPage === "LOGIN" && <Login />}
        {currentPage === "REGISTER" && <Register />}
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
