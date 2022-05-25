import React, { useState } from "react";
import {
  Button,
  Card,
  CardText,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import ContactForm from "./ContactsForm";
import { useGetContactsQuery } from "../store/services/api";
import { useAppSelector } from "../hooks/store";

function Contacts() {
  useGetContactsQuery({
    page: 1,
    itemsPerPage: 50,
  });
  const { contacts } = useAppSelector((state) => ({
    contacts: state.contacts,
  }));
  const [showContactForm, setShowContactForm] = useState(false);
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };
  return (
    <Row xs={1} className="justify-content-center">
      <Col>
        <Modal isOpen={showContactForm} toggle={toggleContactForm} centered>
          <ModalHeader className="bg-primary shadow-sm text-light">
            Agregar/Editar contacto
          </ModalHeader>
          <ModalBody>
            <ContactForm toggleDlg={toggleContactForm} />
          </ModalBody>
        </Modal>
        <Button color="light" size="small" onClick={toggleContactForm}>
          <i className="bi bi-plus-circle me-sm-2" />
          <span className="d-none d-sm-inline">Nuevo</span>
        </Button>
        <Button color="light" size="small">
          <i className="bi bi-pencil-square me-sm-2" />
          <span className="d-none d-sm-inline">Editar</span>
        </Button>
        <Button color="light" size="small">
          <i className="bi bi-trash3 mesm2" />
          <span className="d-none d-sm-inline">Eliminar</span>
        </Button>
        <Button color="light" size="small">
          <i className="bi bi-send me-sm-2" />
          <span className="d-none d-sm-inline">Enviar mensaje</span>
        </Button>
        <FormGroup className="mt-2">
          <InputGroup>
            <Input type="search" placeholder="Nombre o teléfono" />
            <Button color="success" size="small">
              <i className="bi bi-search me-sm-2" />
              <span className="d-none d-sm-inline">Buscar</span>
            </Button>
          </InputGroup>
        </FormGroup>
        <Row xs={1} md={2} xl={3}>
          {contacts?.["hydra:member"].map((item) => (
            <Col key={item.id} className="my-1">
              <Card color="light" body>
                <Row xs={1} className="justify-content-between">
                  <Col xs={10}>
                    <CardText>
                      <strong>{item.name}</strong>: {item.phone}
                    </CardText>
                  </Col>
                  <Col xs={2} className="text-center">
                    <Input
                      type="checkbox"
                      title="Seleccionar este contacto"
                      style={{ cursor: "pointer" }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default Contacts;
