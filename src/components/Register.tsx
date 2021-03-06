import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
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
import { useAppDispatch } from "../hooks/store";
import { changePage } from "../store/pageSlice";
import { useRegisterMutation } from "../store/services/api";
import { RegisterParams } from "../store/services/params-types";
import "./Register.css";

type LoginForm = RegisterParams & {
  check_password: string;
};

function Register() {
  const [runRegister, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const methods = useForm<LoginForm>({
    defaultValues: {
      password: "",
      check_password: "",
      name: "",
      username: "",
    },
    resolver: yupResolver(
      yup.object({
        name: yup.string().required("Requerido"),
        username: yup.string().required("Requerido"),
        password: yup
          .string()
          .required("Requerido")
          .min(8, "No menos de 8 caracteres")
          .max(16, "No más de 16 caracteres"),
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
  const saveData = (data: LoginForm) => {
    toast
      .promise(runRegister(data), {
        pending: "Procesando",
        success: "¡Listo!",
        error: "Algo falló, vuelve a intentarlo",
      })
      .then(() => dispatch(changePage("LOGIN")));
  };
  const cancelData = () => {
    reset();
    dispatch(changePage("LOGIN"));
  };
  const switchToLogin = () => {
    dispatch(changePage("LOGIN"));
  };
  return (
    <Form
      onSubmit={handleSubmit(saveData)}
      onReset={cancelData}
      className="register-form"
    >
      <Row xs={1} className="justify-content-center">
        <Col>
          <h4 className="mb-3">Regístrate</h4>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <FormGroup>
                <Label>Nombre</Label>
                <Input {...field} type="text" required disabled={isLoading} />
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
            name="username"
            render={({ field, fieldState: { error } }) => (
              <FormGroup>
                <Label>Nombre de usuario</Label>
                <Input {...field} type="text" required disabled={isLoading} />
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
                <Input
                  {...field}
                  type="password"
                  required
                  disabled={isLoading}
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
            name="check_password"
            render={({ field, fieldState: { error } }) => (
              <FormGroup>
                <Label>Verificar contraseña</Label>
                <Input
                  {...field}
                  type="password"
                  required
                  disabled={isLoading}
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
            <Button
              type="reset"
              className="me-2"
              onClick={switchToLogin}
              disabled={isLoading}
            >
              <i className="bi bi-door-open me-2" /> Entrar
            </Button>
            <Button type="submit" disabled={!isValid || isLoading}>
              <i className="bi bi-check-circle-fill me-2" /> Aplicar
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default Register;
