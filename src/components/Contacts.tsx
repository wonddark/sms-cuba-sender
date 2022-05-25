import React, { useState } from "react";
import {
  Button,
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
import ContactCard from "./ContactCard";

function SelectedCount() {
  const { selected } = useAppSelector((state) => ({
    selected: state.contacts.selected,
  }));
  if (selected.length > 0) {
    return (
      <p className="py-1 px-2 mb-1 fst-italic small text-muted">
        {selected.length} seleccionados
      </p>
    );
  } else {
    return <></>;
  }
}

function Contacts() {
  useGetContactsQuery({
    page: 1,
    itemsPerPage: 50,
  });
  const { contacts } = useAppSelector((state) => ({
    contacts: state.contacts.data["hydra:member"],
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
        <SelectedCount />
        <Row xs={1} md={2} xl={3}>
          {contacts.map((item) => (
            <Col key={item.id} className="my-1">
              <ContactCard item={item} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default Contacts;
