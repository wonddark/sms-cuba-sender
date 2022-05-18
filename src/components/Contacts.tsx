import React from "react";
import { Card, Col, Row } from "reactstrap";
import ContactForm from "./ContactsForm";
import { useAppSelector } from "../hooks/store";

function Contacts() {
  const { contacts } = useAppSelector((state) => ({
    contacts: state.contacts,
  }));
  return (
    <Row xs={1} className="justify-content-center">
      <Col md={6}>
        <ContactForm />
        {contacts.map((item) => (
          <Card>
            {item.name}: {item.phone}
          </Card>
        ))}
      </Col>
    </Row>
  );
}

export default Contacts;
