import { Card, CardText, Col, Input, Row } from "reactstrap";
import React from "react";
import { addToSelected, removeFromSelected } from "../store/contactsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/store";

function ContactCard({
  item,
}: {
  item: { id: number; name: string; phone: string };
}) {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((state) => ({
    selected: state.contacts.selected,
  }));
  const selectContact = (contact: {
    id: number;
    name: string;
    phone: string;
  }) => {
    dispatch(addToSelected(contact));
  };
  const deselectContact = (id: number) => {
    dispatch(removeFromSelected(id));
  };
  const markContact = (item: { id: number; name: string; phone: string }) => {
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
      color="light"
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
            style={{ cursor: "pointer" }}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default ContactCard;
