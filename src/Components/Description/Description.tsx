import type { FunctionComponent } from "react";
import { Badge, Descriptions, Empty } from "antd";
import type { PresetStatusColorType } from "antd/lib/_util/colors";
import type { searchResult } from "src/App/Entities";

import styles from "./Description.module.css";

interface Status {
  id: searchResult["status"];
  name: searchResult["name"];
  badge: PresetStatusColorType;
}

interface DescriptionProps {
  result?: searchResult;
}

export const Description: FunctionComponent<DescriptionProps> = ({
  result,
}) => {
  const statuses: Status[] = [
    {
      id: "1",
      name: "Na stanie",
      badge: "success",
    },
    {
      id: "2",
      name: "Brak",
      badge: "error",
    },
    {
      id: "3",
      name: "Do utylizacji",
      badge: "warning",
    },
    {
      id: "4",
      name: "Zutylizowane",
      badge: "default",
    },
  ];

  const getBadge = () => {
    if (result) {
      const matchingStatus = statuses.find(
        (status) => status.id === result.status
      );
      if (matchingStatus) {
        return (
          <Badge status={matchingStatus.badge} text={matchingStatus.name} />
        );
      }
    }
  };

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
          <Descriptions.Item label="Status">{getBadge()}</Descriptions.Item>
          <Descriptions.Item label="Piętro">
            {result.floor.name}
          </Descriptions.Item>
          <Descriptions.Item label="Sala">{result.room.name}</Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};
