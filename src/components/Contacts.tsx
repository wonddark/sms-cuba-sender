import React, { useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";

type ContactFields = { name: string; phone: string };

function Contacts() {
  const [contacts, setContacts] = useState<ContactFields[]>([]);
  const ContactForm = () => {
    const methods = useForm<ContactFields>({
      defaultValues: {
        name: "",
        phone: "",
      },
      resolver: yupResolver(
        yup.object({
          name: yup.string().required("Requerido"),
          phone: yup.string().required("Requerido"),
        })
      ),
      mode: "onBlur",
    });
    const {
      handleSubmit,
      control,
      reset,
      formState: { isValid },
    } = methods;
    const saveContact = (data: ContactFields) => {
      setContacts((prevState) => [...prevState, data]);
    };
    const resetForm = () => {
      reset();
    };
    return (
      <Form onSubmit={handleSubmit(saveContact)} onReset={resetForm}>
        <CardHeader className="mb-3 bg-info rounded-2 shadow-sm text-white">
          Agregar/Editar contacto
        </CardHeader>
        <Card body color="info" outline className="rounded-3 shadow-sm">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <FormGroup>
                <Label>Nombre</Label>
                <Input {...field} />
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
            name="phone"
            render={({ field, fieldState: { error } }) => (
              <FormGroup>
                <Label>Teléfono</Label>
                <Input {...field} type="tel" />
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
            <i className="bi bi-check-circle-fill me-2" /> Guardar
          </Button>
        </CardFooter>
      </Form>
    );
  };
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
