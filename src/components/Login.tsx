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
import { useAppDispatch } from "../hooks/store";
import { changePage } from "../store/pageSlice";
import { useLoginMutation } from "../store/services/api";

type LoginFields = {
  username: string;
  password: string;
};

function Login() {
  const [runLogin, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const methods = useForm<LoginFields>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object({
        username: yup.string().required("Requerido"),
        password: yup.string().required("Requerido"),
      })
    ),
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = methods;
  const validateData = (data: LoginFields) => {
    toast
      .promise(runLogin(data).unwrap(), {
        pending: "Cargando",
        error: "Error",
        success: "Bienvenido",
      })
      .then(() => dispatch(changePage("CONTACTS")))
      .catch((error) => console.log(error));
  };
  const switchToRegister = () => {
    dispatch(changePage("REGISTER"));
  };
  return (
    <Form onSubmit={handleSubmit(validateData)}>
      <Row xs={1} className="justify-content-center">
        <Col>
          <CardHeader className="mb-3 bg-info rounded-2 shadow-sm text-white">
            Inicia sesión
          </CardHeader>
          <Card body color="info" outline className="rounded-3 shadow-sm">
            <Controller
              control={control}
              name="username"
              render={({ field, fieldState: { error } }) => (
                <FormGroup>
                  <Label>Username</Label>
                  <Input {...field} type="text" required />
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
            <Button
              type="button"
              color="info"
              size="sm"
              className="border-0 me-2"
              onClick={switchToRegister}
              disabled={isLoading}
            >
              <i className="bi bi-plus-circle me-2" />
              Crear cuenta
            </Button>
            <Button
              type="submit"
              color="light"
              size="sm"
              disabled={!isValid || isLoading}
            >
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
