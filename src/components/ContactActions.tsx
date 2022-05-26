import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import ContactForm from "./ContactsForm";
import React, { useState } from "react";

function ContactActions() {
  const [showContactForm, setShowContactForm] = useState(false);
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };
  return (
    <>
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
    </>
  );
}

export default ContactActions;
