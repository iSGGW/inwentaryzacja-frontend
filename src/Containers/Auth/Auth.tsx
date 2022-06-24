import { Button, Form, Input, notification } from "antd";
import {
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useFormik } from "formik";

import { Container } from "src/Components/Container";
import { UserContext } from "src/App/App";

import { login } from "src/App/Endpoints/auth";
import type { user } from "src/App/Entities";
import { userInitialValues } from "src/App/Entities";

import sggwLogo from "src/Assets/sggwLogo.svg";
import styles from "./Auth.module.css";
import { useContext } from "react";

function Auth() {
  const userContext = useContext(UserContext);

  const isError = (error?: string, wasTouched?: boolean) => {
    if (error && wasTouched) {
      return "error";
    }
  };

  const openNotification = () => {
    notification.open({
      message: "Nie udało się zalogować",
      description: "Spróbuj ponownie",
      icon: <CloseCircleOutlined style={{ color: "#e74d4d" }} />,
    });
  };

  const validate = (values: user) => {
    const errors = {} as user;
    if (!values.usernameOrEmail) {
      errors.usernameOrEmail = "Wpisz nazwę";
    }
    if (!values.password) {
      errors.password = "Wpisz hasło";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: userInitialValues,
    validate,
    onSubmit: (values) =>
      login(values)
        .then((r) => {
          userContext.setUser({
            token: r.token,
            user: r.user,
          });
        })
        .catch((e) => {
          console.error(e);
          openNotification();
        }),
  });

  return (
    <div className={styles.auth}>
      <Container>
        <header className={styles.authHeader}>
          <img src={sggwLogo} alt="sggw_logo" className={styles.authLogo} />
          <Form
            onSubmitCapture={formik.handleSubmit}
            className={styles.form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label={"Nazwa użytkownika"}>
              <Input
                name="usernameOrEmail"
                onChange={formik.handleChange}
                status={isError(
                  formik.errors.usernameOrEmail,
                  formik.touched.usernameOrEmail
                )}
                value={formik.values.usernameOrEmail}
              />
              {formik.errors.usernameOrEmail &&
                formik.touched.usernameOrEmail && (
                  <div>{formik.errors.usernameOrEmail}</div>
                )}
            </Form.Item>
            <Form.Item label={"Hasło"}>
              <Input.Password
                name="password"
                onChange={formik.handleChange}
                status={isError(
                  formik.errors.password,
                  formik.touched.password
                )}
                value={formik.values.password}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {formik.errors.password && formik.touched.password && (
                <div>{formik.errors.password}</div>
              )}
            </Form.Item>
            <Button
              htmlType={"submit"}
              type={"primary"}
              disabled={formik.isSubmitting}
            >
              Zaloguj się
            </Button>
          </Form>
        </header>
      </Container>
    </div>
  );
}

export default Auth;
