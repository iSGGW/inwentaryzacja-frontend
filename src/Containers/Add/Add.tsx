import type { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { Container } from "src/Components/Container";

import styles from "./Add.module.css";

interface valuesForm {
  building: string;
  floor: string;
  room: string;
  objectName: string;
}

const Add = () => {
  const [values, setValues] = useState<valuesForm>({
    building: "",
    floor: "",
    room: "",
    objectName: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    (values as any)[e.target.name] = e.target.value;
    setValues(values);
  };

  return (
    <Container>
      <div className={styles.add}>
        <h2 className={styles.title}>Dodaj przedmiot</h2>
        <Form
          className={styles.form}
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 15 }}
        >
          <Form.Item label={"Budynek"}>
            <Input onChange={(e) => handleChange(e)} name="building" />
          </Form.Item>
          <Form.Item label={"Piętro"}>
            <Input onChange={(e) => handleChange(e)} name="floor" />
          </Form.Item>
          <Form.Item label={"Pomieszczenie"}>
            <Input onChange={(e) => handleChange(e)} name="room" />
          </Form.Item>
          <Form.Item label={"Nazwa przedmiotu"}>
            <Input onChange={(e) => handleChange(e)} name="objectName" />
          </Form.Item>
          <Button type={"primary"}>Dodaj</Button>
        </Form>
      </div>
    </Container>
  );
};

export default Add;
