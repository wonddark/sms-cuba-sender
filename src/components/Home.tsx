import { Button, Col, Container } from "reactstrap";
import "./Home.css";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { changePage } from "../store/pageSlice";

function Home() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.page.current);
  const startRegister = () => {
    dispatch(changePage("REGISTER"));
    console.log(currentPage);
  };
  return (
    <div className="home-hero">
      <Container fluid="xxl">
        <Col md={8} className="mx-auto text-center">
          <h1>Cuéntale a todos de una sola vez</h1>
          <h2>Servicio inteligente para manejar tus mensajes</h2>
          <p
            className="lead mb-4"
            style={{ fontWeight: 500, fontSize: "1.05rem" }}
          >
            Ahorra tiempo escribiendo y programando tus mensajes. Comunica
            eventos, promociones, noticias, lo que se te ocurra para mantener a
            tus clientes pendientes de ti
          </p>
          <div className="d-flex flex-column flex-lg-row align-items-md-stretch justify-content-md-center gap-3 mb-4">
            <Button size="lg" className="home-button-secondary">
              <i className="bi bi-info-circle-fill me-2" />
              Más información
            </Button>
            <Button size="lg" className="home-button" onClick={startRegister}>
              <i className="bi bi-person-check-fill me-2" />
              Crea tu cuenta
            </Button>
          </div>
        </Col>
      </Container>
    </div>
  );
}

export default Home;
