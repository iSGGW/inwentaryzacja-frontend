import type { FunctionComponent } from "react";
import { Descriptions, Empty } from "antd";
import type { item, searchResult } from "src/App/Entities";
import Status from "src/Components/Status/Status";

import styles from "./Description.module.css";
import moment from "moment";

interface DescriptionProps {
  result?: item;
}

export const Description: FunctionComponent<DescriptionProps> = ({
  result,
}) => {
  console.log(result);
  return (
    <div className={styles.description}>
      <h3>Szczegóły</h3>
      {result === undefined ? (
        <Empty
          description={
            <span className={styles.empty}>
              Wybierz przedmiot by zobaczyć szczegóły
            </span>
          }
        />
      ) : (
        <Descriptions bordered layout={"vertical"}>
          <Descriptions.Item label="ID">{result.id}</Descriptions.Item>
          {result.name && (
            <Descriptions.Item label="Nazwa">{result.name}</Descriptions.Item>
          )}
          {result.status && (
            <Descriptions.Item label="Status">
              <Status itemStatus={result.status} />
            </Descriptions.Item>
          )}
          {result.type && (
            <Descriptions.Item label="Typ">{result.type}</Descriptions.Item>
          )}
          {result.manufacturer && (
            <Descriptions.Item label="Producent">
              {result.manufacturer}
            </Descriptions.Item>
          )}
          {result.serialNumber && (
            <Descriptions.Item label="Nr seryjny">
              {result.serialNumber}
            </Descriptions.Item>
          )}
          {result.room.floor.building.number && (
            <Descriptions.Item label="Budynek">
              {result.room.floor.building.number}
            </Descriptions.Item>
          )}
          {result.room.floor.level && (
            <Descriptions.Item label="Piętro">
              {result.room.floor.level}
            </Descriptions.Item>
          )}
          {result.room.number && (
            <Descriptions.Item label="Sala">
              {result.room.number}
            </Descriptions.Item>
          )}
          {result.createdBy && (
            <Descriptions.Item label="Utworzono przez">
              {result.createdBy}
            </Descriptions.Item>
          )}
          {result.creationDate && (
            <Descriptions.Item label="Utworzono dnia">
              {moment(result.creationDate).format("DD-MM-YYYY")}
            </Descriptions.Item>
          )}
          {result.lastUpdatedBy && (
            <Descriptions.Item label="Zaktualizowano przez">
              {result.lastUpdatedBy}
            </Descriptions.Item>
          )}
          {result.updateDate && (
            <Descriptions.Item label="Zaktualizowano dnia">
              {moment(result.updateDate).format("DD-MM-YYYY")}
            </Descriptions.Item>
          )}
        </Descriptions>
      )}
    </div>
  );
};
