import { Button, Col, Container } from "reactstrap";
import "./Home.css";

function Home() {
  return (
    <div className="home-hero">
      <Container fluid="xxl">
        <Col md={8} className="mx-auto text-center">
          <h1 className="mb-3" style={{ fontWeight: 700, fontSize: "2.35rem" }}>
            Lo cuentas una vez y se enteran todos
          </h1>
          <p
            className="lead mb-4"
            style={{ fontWeight: 500, fontSize: "1.05rem" }}
          >
            Ahorra tiempo escribiendo y programando tus mensajes. Comunica
            eventos, promociones, noticias, lo que se te ocurra para mantener a
            tus clientes pendientes de ti
          </p>
          <div className="d-flex flex-column flex-lg-row align-items-md-stretch justify-content-md-center gap-3 mb-4">
            <Button size="lg" className="home-button-secondary btn-lg">
              <i className="bi bi-book-half me-2" />
              Más información
            </Button>
            <Button size="lg" className="home-button btn-lg">
              <i className="bi bi-book-half me-2" />
              Crea tu cuenta
            </Button>
          </div>
        </Col>
      </Container>
    </div>
  );
}

export default Home;
