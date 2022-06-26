import type { FunctionComponent } from "react";
import { Badge } from "antd";
import type { searchResult } from "src/App/Entities";
import type { PresetStatusColorType } from "antd/lib/_util/colors";

interface Status {
  id: searchResult["status"];
  name: searchResult["name"];
  badge: PresetStatusColorType;
}

interface StatusProps {
  itemStatus: searchResult["status"];
}

const Status: FunctionComponent<StatusProps> = ({ itemStatus }) => {
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
    if (itemStatus) {
      const matchingStatus = statuses.find((status) => status.id == itemStatus);
      if (matchingStatus) {
        return (
          <Badge status={matchingStatus.badge} text={matchingStatus.name} />
        );
      }
    }
    return null;
  };

  return getBadge();
};

export default Status;
