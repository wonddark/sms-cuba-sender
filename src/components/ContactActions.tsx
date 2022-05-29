import { Button, Modal, ModalBody } from "reactstrap";
import ContactForm from "./ContactsForm";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { changePage } from "../store/pageSlice";

function ContactActions() {
  const dispatch = useAppDispatch();
  const { selectedContacts } = useAppSelector((state) => ({
    selectedContacts: state.contacts.selected,
  }));
  const [showContactForm, setShowContactForm] = useState(false);
  const [action, setAction] = useState<"CREATE" | "EDIT">("CREATE");
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };
  const createContact = () => {
    setAction("CREATE");
    toggleContactForm();
  };
  const editContact = () => {
    setAction("EDIT");
    toggleContactForm();
  };
  const disableEdit =
    selectedContacts.length === 0 || selectedContacts.length > 1;
  const disableDelete = selectedContacts.length === 0;
  const disableSend = selectedContacts.length === 0;
  const prepareSend = () => {
    dispatch(changePage("SEND"));
  };
  return (
    <>
      {showContactForm && (
        <Modal isOpen={showContactForm} toggle={toggleContactForm} centered>
          <ModalBody>
            <h4 className="mb-3">Agregar/Editar contacto</h4>
            <ContactForm toggleDlg={toggleContactForm} action={action} />
          </ModalBody>
        </Modal>
      )}
      <Button color="light" size="small" onClick={createContact}>
        <i className="bi bi-plus-circle me-sm-2" />
        <span className="d-none d-sm-inline">Nuevo</span>
      </Button>
      <Button
        color="light"
        size="small"
        disabled={disableEdit}
        onClick={editContact}
      >
        <i className="bi bi-pencil-square me-sm-2" />
        <span className="d-none d-sm-inline">Editar</span>
      </Button>
      <Button color="light" size="small" disabled={disableDelete}>
        <i className="bi bi-trash3 mesm2" />
        <span className="d-none d-sm-inline">Eliminar</span>
      </Button>
      <Button
        color="light"
        size="small"
        disabled={disableSend}
        onClick={prepareSend}
      >
        <i className="bi bi-send me-sm-2" />
        <span className="d-none d-sm-inline">Enviar mensaje</span>
      </Button>
    </>
  );
}

export default ContactActions;
