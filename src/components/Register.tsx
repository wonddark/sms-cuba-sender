import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
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
import React from "react";
import { useAppDispatch } from "../hooks/store";
import { changePage } from "../store/pageSlice";

type LoginForm = {
  email: string;
  password: string;
  check_password: string;
};

function Register() {
  const dispatch = useAppDispatch();
  const methods = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
      check_password: "",
    },
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .required("Requerido")
          .email("El email debe ser válido"),
        password: yup
          .string()
          .required("Requerido")
          .min(8, "No menos de 8 caracteres")
          .max(16, "No más de 16 caracteres"),
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
  const saveData = (data: LoginForm) => {
    console.log(data);
    toast.promise(
      apiConfig.post(
        "/auth/register",
        JSON.stringify({ email: data.email, password: data.password })
      ),
      {
        pending: "Procesando",
        success: "¡Listo!",
        error: "Algo falló, vuelve a intentarlo",
      }
    );
  };
  const cancelData = () => {
    reset();
  };
  const switchToLogin = () => {
    dispatch(changePage("LOGIN"));
  };
  return (
    <Form onSubmit={handleSubmit(saveData)} onReset={cancelData}>
      <Row xs={1} className="justify-content-center">
        <Col md={6}>
          <CardHeader className="mb-3 bg-info rounded-2 shadow-sm text-white">
            Regístrate
          </CardHeader>
          <Card body color="info" outline className="rounded-3 shadow-sm">
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormGroup>
                  <Label>Email</Label>
                  <Input {...field} type="email" required />
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
              name="password"
              render={({ field, fieldState: { error } }) => (
                <FormGroup>
                  <Label>Contraseña</Label>
                  <Input {...field} type="password" required />
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
              name="check_password"
              render={({ field, fieldState: { error } }) => (
                <FormGroup>
                  <Label>Verificar contraseña</Label>
                  <Input {...field} type="password" required />
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
            <Button
              type="reset"
              size="sm"
              color="info"
              className="me-2"
              onClick={switchToLogin}
            >
              <i className="bi bi-door-open me-2" /> Entrar
            </Button>
            <Button type="submit" size="sm" color="light" disabled={!isValid}>
              <i className="bi bi-check-circle-fill me-2" /> Aplicar
            </Button>
          </CardFooter>
        </Col>
      </Row>
    </Form>
  );
}

export default Register;
