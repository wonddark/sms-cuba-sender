import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAppSelector } from "../hooks/store";
import { usePostMessage } from "../store/services/api";
import { MessagesParams } from "../store/services/params-types";
import "./SendMessage.css";

const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 148;

function SendMessage() {
  const { contacts, selectedContacts } = useAppSelector((state) => ({
    contacts: state.contacts.data["hydra:member"],
    selectedContacts: state.contacts.selected,
  }));
  const [charCount, setCharCount] = useState(0);
  const methods = useForm<MessagesParams>({
    defaultValues: {
      content: "",
      contacts: selectedContacts.map((item) => item.id),
    },
    resolver: yupResolver(
      yup.object({
        content: yup
          .string()
          .required("Requerido")
          .min(
            MIN_MESSAGE_LENGTH,
            `No menos de ${MIN_MESSAGE_LENGTH} caracteres`
          )
          .max(
            MAX_MESSAGE_LENGTH,
            `No más de ${MAX_MESSAGE_LENGTH} caracteres`
          ),
        contacts: yup.array().of(yup.string().required()).required(),
      })
    ),
    mode: "onBlur",
  });
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isValid },
  } = methods;
  const [runPost] = usePostMessage();
  const processData = (data: MessagesParams) => {
    toast
      .promise(runPost(data).unwrap(), {
        pending: "Procesando",
        success: "¡Hecho!",
        error: "Algo salió mal",
      })
      .then(() => reset());
  };
  const cancelData = () => {
    reset();
  };
  return (
    <Form
      onSubmit={handleSubmit(processData)}
      onReset={cancelData}
      className="message-form"
    >
      <Row xs={1} className="justify-content-center">
        <Col>
          <h4 className="mb-3">Prepara tu mensaje</h4>
          <Controller
            control={control}
            name="contacts"
            render={({ field, fieldState: { error } }) => (
              <FormGroup>
                <Label>Destinatario(s)</Label>
                <Select
                  {...field}
                  value={contacts.filter((item) =>
                    field.value.some(
                      (token) =>
                        token === item["@id"] ||
                        token === item.phone ||
                        token === item.name
                    )
                  )}
                  options={contacts}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option["@id"]}
                  isMulti
                  onChange={(option) =>
                    field.onChange(option.map((item) => item["@id"]))
                  }
                  styles={{
                    menuList: (base) => ({ ...base, color: "black" }),
                  }}
                />
                {error && (
                  <FormFeedback valid={false} className="d-block">
                    {error.message}
                  </FormFeedback>
                )}
              </FormGroup>
            )}
          />
          <Controller
            control={control}
            name="content"
            render={({ field, fieldState: { error } }) => (
              <FormGroup>
                <Row xs={2} className="justify-content-between">
                  <Col xs={10}>
                    <Label>Mensaje</Label>
                  </Col>
                  <Col xs={2}>
                    <p className="text-end m-0 mb-1">{charCount}</p>
                  </Col>
                </Row>
                <Input
                  {...field}
                  type="textarea"
                  required
                  onChange={({ target: { value } }) => {
                    setCharCount(value.length);
                    field.onChange(value);
                    value.length === MIN_MESSAGE_LENGTH &&
                      trigger("content").finally();
                    ((value.length < MIN_MESSAGE_LENGTH &&
                      field.value.length >= MIN_MESSAGE_LENGTH) ||
                      (value.length > MAX_MESSAGE_LENGTH &&
                        field.value.length === MAX_MESSAGE_LENGTH) ||
                      (value.length <= MAX_MESSAGE_LENGTH &&
                        field.value.length > MAX_MESSAGE_LENGTH)) &&
                      trigger("content").finally();
                  }}
                  rows={7}
                />
                {error && (
                  <FormFeedback valid={false} className="d-block">
                    {error.message}
                  </FormFeedback>
                )}
              </FormGroup>
            )}
          />
          <div className="text-end">
            <Button type="reset" size="sm" color="light" className="me-2">
              <i className="bi bi-x-circle-fill me-2" /> Cancelar
            </Button>
            <Button type="submit" size="sm" color="light" disabled={!isValid}>
              <i className="bi bi-check-circle-fill me-2" /> Enviar
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default SendMessage;
