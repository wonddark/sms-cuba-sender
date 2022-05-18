import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
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
import { useAppSelector } from "../hooks/store";

function Contacts() {
  const { contacts } = useAppSelector((state) => ({
    contacts: state.contacts,
  }));
  const [showContactForm, setShowContactForm] = useState(false);
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };
  return (
    <Row xs={1} className="justify-content-center">
      <Col md={6}>
        <Modal isOpen={showContactForm} toggle={toggleContactForm} centered>
          <ModalHeader className="bg-primary shadow-sm text-light">
            Agregar/Editar contacto
          </ModalHeader>
          <ModalBody>
            <ContactForm
              onCancel={toggleContactForm}
              onSubmit={toggleContactForm}
            />
          </ModalBody>
        </Modal>
        <FormGroup>
          <InputGroup>
            <Input type="search" placeholder="Nombre o teléfono" />
            <Button color="primary" size="small" onClick={toggleContactForm}>
              <i className="bi bi-plus-circle-fill me-2" /> Nuevo
            </Button>
          </InputGroup>
        </FormGroup>
        <Row xs={1} md={2} lg={3}>
          {contacts.map((item) => (
            <Col>
              <Card color="info" outline>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardBody>
                  <CardText>{item.phone}</CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default Contacts;
