import { Card, CardText, Col, Input, Row } from "reactstrap";
import React from "react";
import {
  addToSelected,
  removeFromSelected,
  SimpleContact,
} from "../store/contactsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/store";

function ContactCard({ item }: { item: SimpleContact }) {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((state) => ({
    selected: state.contacts.selected,
  }));
  const selectContact = (contact: SimpleContact) => {
    dispatch(addToSelected(contact));
  };
  const deselectContact = (id: string) => {
    dispatch(removeFromSelected(id));
  };
  const markContact = (item: SimpleContact) => {
    if (selected.some((token) => token.id === item.id)) {
      deselectContact(item.id);
    } else {
      selectContact({
        id: item.id,
        name: item.name,
        phone: item.phone,
      });
    }
  };
  return (
    <Card
      color="dark"
      body
      onClick={() => markContact(item)}
      style={{ cursor: "pointer" }}
    >
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
            checked={selected.some((token) => token.id === item.id)}
            onChange={() => null}
            style={{ cursor: "pointer" }}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default ContactCard;
