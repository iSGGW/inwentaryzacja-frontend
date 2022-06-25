import type { Dispatch, FunctionComponent, SetStateAction } from "react";
import { useContext, useEffect, useState } from "react";
import { Form, Select } from "antd";

import {
  fetchBuildings,
  fetchFloors,
  fetchRooms,
} from "src/App/Endpoints/places";
import { UserContext } from "src/App/App";

import type { floor, placeIDs, building, places, room } from "src/App/Entities";

import styles from "./SearchForm.module.css";

interface SearchFormProps {
  onChangePlace: Dispatch<SetStateAction<placeIDs | undefined>>;
}

export const SearchForm: FunctionComponent<SearchFormProps> = ({
  onChangePlace,
}) => {
  const userContext = useContext(UserContext);
  const [availablePlaces, setAvailablePlaces] = useState<places>({
    buildings: [],
    floors: [],
    rooms: [],
  });

  async function getBuildings() {
    let buildings: building[] = [];
    await fetchBuildings(userContext.user.token).then(
      (response: building[]) => {
        buildings = response;
      }
    );
    setAvailablePlaces((prevState) => ({
      ...prevState,
      buildings: buildings,
    }));
  }

  async function getFloors(buildingId: string, token: string) {
    let floors: floor[] = [];
    await fetchFloors(buildingId, token).then(
      (response: floor[]) => (floors = response)
    );
    setAvailablePlaces((prevState) => ({
      ...prevState,
      floors: floors,
    }));
  }

  async function getRooms(floorId: string, token: string) {
    let rooms: room[] = [];
    await fetchRooms(floorId, token).then(
      (response: room[]) => (rooms = response)
    );
    setAvailablePlaces((prevState) => ({
      ...prevState,
      rooms: rooms,
    }));
    return rooms;
  }

  useEffect(() => {
    getBuildings().catch((e) => console.error(e));
  }, []);

  const changeBuilding = (buildingId: string) => {
    onChangePlace(() => ({
      building: buildingId,
      floor: undefined,
      room: undefined,
    }));
    setAvailablePlaces((prevState) => ({
      ...prevState,
      floors: [],
      rooms: [],
    }));
    getFloors(buildingId, userContext.user.token).catch((e) =>
      console.error(e)
    );
  };

  const changeFloor = (floorId: string) => {
    onChangePlace((prevState) => ({
      ...prevState,
      floor: floorId,
      room: undefined,
    }));
    setAvailablePlaces((prevState) => ({
      ...prevState,
      rooms: [],
    }));
    getRooms(floorId, userContext.user.token).catch((e) => console.error(e));
  };

  const changeRoom = (roomId: string) => {
    onChangePlace((prevState) => ({
      ...prevState,
      room: roomId,
    }));
  };

  return (
    <div className={styles.form}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="Budynek">
          <Select defaultValue={"Wybierz budynek"} onSelect={changeBuilding}>
            {availablePlaces.buildings.map((building) => (
              <Select.Option key={building.id} value={building.id}>
                {building.number}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Piętro">
          <Select
            defaultValue={"Wybierz piętro"}
            onSelect={changeFloor}
            disabled={availablePlaces.floors.length === 0}
          >
            {availablePlaces.floors.map((floor) => (
              <Select.Option key={floor.id} value={floor.id}>
                {floor.level}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Sala">
          <Select
            defaultValue={"Wybierz pomieszczenie"}
            onSelect={changeRoom}
            disabled={availablePlaces.rooms.length === 0}
          >
            {availablePlaces?.rooms?.map((room) => (
              <Select.Option key={room.id} value={room.id}>
                {room.number}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};
