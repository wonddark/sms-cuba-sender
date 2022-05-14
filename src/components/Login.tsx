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
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import apiConfig from "../api-config";

type LoginFields = {
  email: string;
  password: string;
};

function Login() {
  const methods = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object({
        email: yup.string().required("Requerido").email("Email inválido"),
        password: yup.string().required("Requerido"),
      })
    ),
    mode: "onBlur",
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = methods;
  const validateData = (data: LoginFields) => {
    console.log(data);
    const form = new FormData();
    form.append("username", data.email);
    form.append("password", data.password);
    toast
      .promise(
        apiConfig.post("/auth/jwt/login", form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }),
        {
          pending: "Procesando",
          success: "Bienvenido",
          error: "Credenciales incorrectas",
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "sms-cuba",
          JSON.stringify({ token: response.data.access_token })
        );
      })
      .catch((e) => console.log(e));
  };
  return (
    <Form onSubmit={handleSubmit(validateData)}>
      <Row xs={1} className="justify-content-center">
        <Col md={6}>
          <CardHeader className="mb-3 bg-info rounded-2 shadow-sm text-white">
            Inicia sesión
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
          </Card>
          <CardFooter className="mt-3 text-end bg-info rounded-2 shadow-sm">
            <Button type="submit" color="light" size="sm" disabled={!isValid}>
              <i className="bi bi-check-circle-fill me-2" />
              Entrar
            </Button>
          </CardFooter>
        </Col>
      </Row>
    </Form>
  );
}

export default Login;
