import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import apiConfig from "../api-config";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
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

type MessageSetupFields = {
  message: string;
  recipients: string[];
};

const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 148;

function SendMessage() {
  const { contacts, selectedContacts } = useAppSelector((state) => ({
    contacts: state.contacts.data["hydra:member"],
    selectedContacts: state.contacts.selected,
  }));
  const [charCount, setCharCount] = useState(0);
  const methods = useForm<MessageSetupFields>({
    defaultValues: {
      message: "",
      recipients: selectedContacts.map((item) => item.id),
    },
    resolver: yupResolver(
      yup.object({
        message: yup
          .string()
          .required("Requerido")
          .min(MIN_MESSAGE_LENGTH, "No menos de 10 caracteres")
          .max(MAX_MESSAGE_LENGTH, "No más de 10 caracteres"),
        recipients: yup.array().of(yup.string().required()).required(),
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
  const processData = (data: MessageSetupFields) => {
    toast
      .promise(
        Promise.allSettled(
          data.recipients.map((item) =>
            apiConfig.post(
              "/messages/create",
              JSON.stringify({ phone: item, message_body: data.message })
            )
          )
        ),
        {
          pending: "Procesando",
          success: "¡Hecho!",
          error: "Algo salió mal",
        }
      )
      .then((response) => console.log(JSON.stringify(response, null, 3)))
      .catch((error) => console.log(JSON.stringify(error, null, 3)));
  };
  const cancelData = () => {
    reset();
  };
  return (
    <Form onSubmit={handleSubmit(processData)} onReset={cancelData}>
      <Row xs={1} className="justify-content-center">
        <Col>
          <CardHeader className="mb-3 bg-info rounded-2 shadow-sm text-white">
            Prepara tu mensaje
          </CardHeader>
          <Card body color="info" outline className="rounded-3 shadow-sm">
            <Controller
              control={control}
              name="recipients"
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
              name="message"
              render={({ field, fieldState: { error } }) => (
                <FormGroup>
                  <Label>Mensaje</Label>
                  <p className="text-end m-0 mb-1">{charCount}</p>
                  <Input
                    {...field}
                    type="textarea"
                    required
                    onChange={({ target: { value } }) => {
                      setCharCount(value.length);
                      field.onChange(value);
                      value.length === MIN_MESSAGE_LENGTH &&
                        trigger("message").finally();
                      ((value.length < MIN_MESSAGE_LENGTH &&
                        field.value.length >= MIN_MESSAGE_LENGTH) ||
                        (value.length > MAX_MESSAGE_LENGTH &&
                          field.value.length === MAX_MESSAGE_LENGTH) ||
                        (value.length <= MAX_MESSAGE_LENGTH &&
                          field.value.length > MAX_MESSAGE_LENGTH)) &&
                        trigger("message").finally();
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
          </Card>
          <CardFooter className="mt-3 text-end bg-info rounded-2 shadow-sm">
            <Button type="reset" size="sm" color="light" className="me-2">
              <i className="bi bi-x-circle-fill me-2" /> Cancelar
            </Button>
            <Button type="submit" size="sm" color="light" disabled={!isValid}>
              <i className="bi bi-check-circle-fill me-2" /> Enviar
            </Button>
          </CardFooter>
        </Col>
      </Row>
    </Form>
  );
}

export default SendMessage;
