import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Formik, ErrorMessage } from "formik";
import { Container } from "src/Components/Container";
import sggwLogo from "src/Assets/sggwLogo.svg";

import styles from "./Auth.module.css";

interface user {
  username: string;
  password: string;
}

const initialValues: user = {
  username: "",
  password: "",
};

function Auth() {
  const isError = (error?: string, wasTouched?: boolean) => {
    if (error && wasTouched) {
      return "error";
    }
  };

  return (
    <div className={styles.auth}>
      <Container>
        <header className={styles.authHeader}>
          <img src={sggwLogo} alt="sggw_logo" className={styles.authLogo} />
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors: Partial<user> = {};
              if (!values.username) {
                errors.username = "Wpisz nazwę";
              }
              if (!values.password) {
                errors.password = "Wpisz hasło";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form
                onSubmitCapture={handleSubmit}
                className={styles.form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Form.Item label={"Nazwa użytkownika"}>
                  <Input
                    name="username"
                    onChange={handleChange}
                    status={isError(errors.username, touched.username)}
                    value={values.username}
                  />
                  <ErrorMessage name={"username"} component="div" />
                </Form.Item>
                <Form.Item label={"Hasło"}>
                  <Input.Password
                    name="password"
                    onChange={handleChange}
                    status={isError(errors.password, touched.password)}
                    value={values.password}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                  <ErrorMessage name={"password"} component="div" />
                </Form.Item>
                <Button
                  htmlType={"submit"}
                  type={"primary"}
                  disabled={isSubmitting}
                >
                  Zaloguj się
                </Button>
              </Form>
            )}
          </Formik>
        </header>
      </Container>
    </div>
  );
}

export default Auth;
