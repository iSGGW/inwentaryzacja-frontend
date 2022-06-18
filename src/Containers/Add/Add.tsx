import { Button, Form, Input } from "antd";
import { Formik, ErrorMessage } from "formik";
import { Container } from "src/Components/Container";

import styles from "./Add.module.css";

interface valuesForm {
  building: string;
  floor: string;
  room: string;
  objectName: string;
}

const initialValues: valuesForm = {
  building: "",
  floor: "",
  room: "",
  objectName: "",
};

//TODO: Byc moze ta strona zostanie calkowicie zastapiana strona z modyfikacja
const Add = () => {
  const isError = (error?: string, wasTouched?: boolean) => {
    if (error && wasTouched) {
      return "error";
    }
  };

  return (
    <Container>
      <div className={styles.add}>
        <h2 className={styles.title}>Dodaj przedmiot</h2>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<valuesForm> = {};
            if (!values.building) {
              errors.building = "Wybierz budynek";
            }
            if (!values.floor) {
              errors.floor = "Wybierz piętro";
            }
            if (!values.room) {
              errors.room = "Wybierz pomieszczenie";
            }
            if (!values.objectName) {
              errors.objectName = "Dodaj nazwę przedmiotu";
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
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              <Form.Item label={"Budynek"}>
                <Input
                  name="building"
                  onChange={handleChange}
                  status={isError(errors.building, touched.building)}
                  value={values.building}
                />
                <ErrorMessage name={"building"} component="div" />
              </Form.Item>
              {values.building && (
                <Form.Item label={"Piętro"}>
                  <Input
                    name="floor"
                    onChange={handleChange}
                    status={isError(errors.floor, touched.floor)}
                    value={values.floor}
                  />
                  <ErrorMessage name={"floor"} component="div" />
                </Form.Item>
              )}
              {values.floor && (
                <Form.Item label={"Pomieszczenie"}>
                  <Input
                    name="room"
                    onChange={handleChange}
                    status={isError(errors.room, touched.room)}
                    value={values.room}
                  />
                  <ErrorMessage name={"room"} component="div" />
                </Form.Item>
              )}
              {values.room && (
                <Form.Item label={"Nazwa przedmiotu"}>
                  <Input
                    name="objectName"
                    onChange={handleChange}
                    status={isError(errors.objectName, touched.objectName)}
                    value={values.objectName}
                  />
                </Form.Item>
              )}
              <Button
                htmlType={"submit"}
                type={"primary"}
                disabled={isSubmitting}
              >
                Dodaj
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Add;
