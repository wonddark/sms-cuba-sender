import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import React from "react";
import { useAddContactMutation } from "../store/services/api";
import { toast } from "react-toastify";
import { ContactsParams } from "../store/services/params-types";
import "./ContactsForm.css";

type ContactFields = ContactsParams & {};

const ContactForm = ({ toggleDlg }: { toggleDlg: () => void }) => {
  const [runAddContact, { isLoading }] = useAddContactMutation();
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
    mode: "onChange",
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = methods;
  const saveContact = (data: ContactFields) => {
    toast
      .promise(runAddContact(data).unwrap(), {
        pending: "Procesando",
        success: "¡Hecho!",
        error: "Algo aha salido mal, or favor inténtalo de nuevo",
      })
      .then(() => toggleDlg());
  };
  const resetForm = () => {
    reset();
    toggleDlg();
  };
  return (
    <Form
      onSubmit={handleSubmit(saveContact)}
      onReset={resetForm}
      className="contact-form"
    >
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <FormGroup>
            <Label>Nombre</Label>
            <Input {...field} disabled={isLoading} />
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
            <Input {...field} type="tel" disabled={isLoading} />
            {error && (
              <FormFeedback valid={false} className="d-block">
                {error.message}
              </FormFeedback>
            )}
          </FormGroup>
        )}
      />
      <div className="text-end">
        <Button
          type="reset"
          size="sm"
          color="secondary"
          className="me-2"
          disabled={isLoading}
        >
          <i className="bi bi-x-circle-fill me-2" /> Cancelar
        </Button>
        <Button
          type="submit"
          size="sm"
          color="primary"
          disabled={!isValid || isLoading}
        >
          <i className="bi bi-check-circle-fill me-2" /> Guardar
        </Button>
      </div>
    </Form>
  );
};

export default ContactForm;
