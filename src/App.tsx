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
  const { currentPage, logged } = useSelector((state: AppState) => ({
    currentPage: state.page.current,
    logged: state.session.logged,
  }));
  const renderView = () => {
    if (logged) {
      switch (currentPage) {
        case "CONTACTS":
          return <Contacts />;
        case "SEND":
          return <SendMessage />;
      }
    } else {
      switch (currentPage) {
        case "LOGIN":
          return <Login />;
        case "REGISTER":
          return <Register />;
      }
    }
    return <>Home Page</>;
  };
  return (
    <Container fluid className="p-0">
      <Header />
      <Container className="mt-3">{renderView()}</Container>
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
