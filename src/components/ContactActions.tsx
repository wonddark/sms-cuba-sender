import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import ContactForm from "./ContactsForm";
import React, { useState } from "react";
import { useAppSelector } from "../hooks/store";

function ContactActions() {
  const { selectedContacts } = useAppSelector((state) => ({
    selectedContacts: state.contacts.selected,
  }));
  const [showContactForm, setShowContactForm] = useState(false);
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };
  const disableEdit =
    selectedContacts.length === 0 || selectedContacts.length > 1;
  const disableDelete = selectedContacts.length === 0;
  const disableSend = selectedContacts.length === 0;
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
      <Button color="light" size="small" disabled={disableEdit}>
        <i className="bi bi-pencil-square me-sm-2" />
        <span className="d-none d-sm-inline">Editar</span>
      </Button>
      <Button color="light" size="small" disabled={disableDelete}>
        <i className="bi bi-trash3 mesm2" />
        <span className="d-none d-sm-inline">Eliminar</span>
      </Button>
      <Button color="light" size="small" disabled={disableSend}>
        <i className="bi bi-send me-sm-2" />
        <span className="d-none d-sm-inline">Enviar mensaje</span>
      </Button>
    </>
  );
}

export default ContactActions;
