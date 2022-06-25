import type { FunctionComponent } from "react";
import { Descriptions, Empty } from "antd";
import type { searchResult } from "src/App/Entities";
import Status from "src/Components/Status/Status";

import styles from "./Description.module.css";

interface DescriptionProps {
  result?: searchResult;
}

export const Description: FunctionComponent<DescriptionProps> = ({
  result,
}) => {
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
          <Descriptions.Item label="Nazwa">{result.name}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Status itemStatus={result.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Piętro">
            {result.room.floor.level}
          </Descriptions.Item>
          <Descriptions.Item label="Sala">{result.room.number}</Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};
