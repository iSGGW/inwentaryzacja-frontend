import { ChangeEvent, useState } from "react";
import Inputs from "../../Components/inputs/index";
import "./Add.css";

interface valuesForm {
  build: string;
  classroom: string;
  objectName: string;
}

const Add = () => {
  const { Input, PrimaryButton } = Inputs;

  const [values, setValues] = useState<valuesForm>({
    build: "",
    classroom: "",
    objectName: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    (values as any)[e.target.name] = e.target.value;
    setValues(values);
  };

  return (
    <form className="add" onSubmit={handleSubmit}>
      <h2>Dodaj przedmiot</h2>
      <Input onChange={handleChange} name="build" label="nr budynku" />
      <Input onChange={handleChange} name="classroom" label="nr sali" />
      <Input
        onChange={handleChange}
        name="objectName"
        label="nazwa przedmiotu"
      />
      <PrimaryButton label="ADD" type="submit" />
    </form>
  );
};

export default Add;
