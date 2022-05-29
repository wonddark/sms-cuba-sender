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
import React, { useEffect, useState } from "react";
import { useCreateContact, useEditContact } from "../store/services/api";
import { toast } from "react-toastify";
import { ContactsParams } from "../store/services/params-types";
import "./ContactsForm.css";
import { useAppSelector } from "../hooks/store";

type ContactFields = ContactsParams & { id?: string };

const ContactForm = ({
  toggleDlg,
  action,
}: {
  toggleDlg: () => void;
  action: "CREATE" | "EDIT";
}) => {
  const [runAddContact, { isLoading: isCreating }] = useCreateContact();
  const [runEditContact, { isLoading: isUpdating }] = useEditContact();
  const [disableInputs, setDisableInputs] = useState(false);
  const selectedContact = useAppSelector((state) => {
    if (state.contacts.selected.length === 1) {
      return state.contacts.selected[0];
    }
    return undefined;
  });
  const methods = useForm<ContactFields>({
    defaultValues: {
      name:
        action === "EDIT" && selectedContact?.name ? selectedContact.name : "",
      phone:
        action === "EDIT" && selectedContact?.phone
          ? selectedContact.phone
          : "",
      id:
        action === "EDIT" && selectedContact?.id
          ? selectedContact.id
          : undefined,
    },
    resolver: yupResolver(
      yup.object({
        name: yup.string().required("Requerido"),
        phone: yup
          .string()
          .required("Requerido")
          .length(8, "Exactamente 8 dígitos"),
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
      .promise(
        data.id
          ? runEditContact({
              id: data.id.split("/").pop()!!,
              data,
            }).unwrap()
          : runAddContact(data).unwrap(),
        {
          pending: "Procesando",
          success: "¡Hecho!",
          error: "Algo ha salido mal, por favor inténtalo de nuevo",
        }
      )
      .then(() => (data.id ? toggleDlg() : reset()));
  };
  const resetForm = () => {
    reset();
    toggleDlg();
  };
  const toggleInputsDisable = () => {
    setDisableInputs(isCreating || isUpdating);
  };
  useEffect(toggleInputsDisable, [isCreating, isUpdating]);
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
            <Input {...field} disabled={disableInputs} />
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
            <Input {...field} type="tel" disabled={disableInputs} />
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
          disabled={disableInputs}
        >
          <i className="bi bi-x-circle-fill me-2" /> Cerrar
        </Button>
        <Button
          type="submit"
          size="sm"
          color="primary"
          disabled={!isValid || disableInputs}
        >
          <i className="bi bi-check-circle-fill me-2" /> Guardar
        </Button>
      </div>
    </Form>
  );
};

export default ContactForm;
