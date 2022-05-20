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
  Progress,
  Row,
} from "reactstrap";
import ContactForm from "./ContactsForm";
import { useGetContactsQuery } from "../store/services/api";

function Contacts() {
  const { data, isLoading } = useGetContactsQuery({
    page: 1,
    itemsPerPage: 50,
  });
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
        {isLoading && <Progress striped animated color="primary" />}
        {!isLoading && (
          <Row xs={1} md={2} lg={3}>
            {data?.["hydra:member"].map((item) => (
              <Col className="my-1">
                <Card color="light" body>
                  <CardText>
                    <strong>{item.name}</strong>: {item.phone}
                  </CardText>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  );
}

export default Contacts;
