import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {
  Button,
  CardFooter,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import React from "react";
import { useAppDispatch } from "../hooks/store";
import { addContact } from "../store/contactsSlice";

type ContactFields = { id: number; name: string; phone: string };

const ContactForm = ({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  const dispatch = useAppDispatch();
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
    dispatch(addContact(data));
    onSubmit();
  };
  const resetForm = () => {
    reset();
    onCancel();
  };
  return (
    <Form onSubmit={handleSubmit(saveContact)} onReset={resetForm}>
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
      <CardFooter className="p-0 border-0 bg-transparent text-end">
        <Button type="reset" size="sm" color="secondary" className="me-2">
          <i className="bi bi-x-circle-fill me-2" /> Cancelar
        </Button>
        <Button type="submit" size="sm" color="primary" disabled={!isValid}>
          <i className="bi bi-check-circle-fill me-2" /> Guardar
        </Button>
      </CardFooter>
    </Form>
  );
};

export default ContactForm;
