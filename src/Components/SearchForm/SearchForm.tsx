import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Form, Select } from "antd";

import type { floor, place } from "src/App/Entities";
import { fetchPlaces } from "src/App/Entities";

import styles from "./SearchForm.module.css";

interface SearchFormProps {
  selectedPlace: place | undefined;
  onChangePlace: Dispatch<SetStateAction<place | undefined>>;
}

export const SearchForm: FunctionComponent<SearchFormProps> = ({
  onChangePlace,
  selectedPlace,
}) => {
  const floors: floor[] = fetchPlaces;
  const [selectedFloor, setSelectedFloor] = useState<floor>();

  const selectActiveFloor = (floor: string) => {
    const floorObject = floors.find((e) => e.id === floor);
    if (floorObject) {
      onChangePlace({ floor: floorObject });
    }
  };

  const selectActiveRoom = (room: string) => {
    const roomObject = selectedFloor?.rooms?.find((e) => e.id === room);
    if (roomObject) {
      onChangePlace((prevPlace) => {
        const newPrevPlace: place = { ...prevPlace };
        newPrevPlace.room = roomObject;
        return newPrevPlace;
      });
    }
  };

  useEffect(() => {
    const chosenFloor = floors.find(
      (floor) => floor.id === selectedPlace?.floor?.id
    );
    setSelectedFloor(chosenFloor);
  }, [selectedPlace]);

  return (
    <div className={styles.form}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="Piętro">
          <Select
            defaultValue={"Wybierz piętro"}
            onSelect={selectActiveFloor}
            value={selectedPlace?.floor?.name}
          >
            {floors.map((floor) => (
              <Select.Option key={floor.id} value={floor.id}>
                {floor.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Sala">
          <Select
            defaultValue={"Wybierz pomieszczenie"}
            onSelect={selectActiveRoom}
            value={selectedPlace?.room?.name}
            disabled={!selectedPlace?.floor}
          >
            {selectedFloor?.rooms?.map((room) => (
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
