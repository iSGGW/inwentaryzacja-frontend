import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Form, Select } from "antd";
import type { floor, searchResult } from "src/App/Entities";
import { getMockFloors, searchMockData } from "src/App/Entities";

import styles from "./SearchForm.module.css";

interface SearchFormProps {
  setApiResponse: Dispatch<SetStateAction<searchResult[] | undefined>>;
}

export const SearchForm: FunctionComponent<SearchFormProps> = ({
  setApiResponse,
}) => {
  const [floors, setFloors] = useState<floor[]>([]);
  const [activeFloor, setActiveFloor] = useState<floor>();
  const selectActiveFloor = (floor: string) =>
    setActiveFloor(floors.find((e) => e.id === floor));
  const selectActiveRoom = (room: string) => {
    setApiResponse(searchMockData);
  };

  useEffect(() => {
    try {
      setFloors(getMockFloors());
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className={styles.form}>
      <h2>Wyszukiwanie</h2>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="Piętro">
          <Select onSelect={selectActiveFloor}>
            {floors.map((floor) => (
              <Select.Option key={floor.id} value={floor.id}>
                {floor.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Sala">
          <Select onSelect={selectActiveRoom} disabled={!activeFloor}>
            {activeFloor?.rooms.map((room) => (
              <Select.Option key={room.id} value={room.id}>
                {room.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};
