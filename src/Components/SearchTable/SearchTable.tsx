import { FunctionComponent } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import type { searchResult } from "src/App/Entities";

interface searchTableProps {
  results: searchResult[];
}

interface searchResultsColumns {
  id: string;
  name: string;
  status?: string;
  floor: string;
  room: string;
}

export const SearchTable: FunctionComponent<searchTableProps> = ({
  results,
}) => {
  const parsedResults = () => {
    const dataToReturn: searchResultsColumns[] = [];
    results.map((result) => {
      dataToReturn.push({
        id: result.id,
        name: result.name,
        floor: result.floor.name,
        room: result.room.name,
      });
    });
    return dataToReturn;
  };

  const columns: ColumnsType<searchResultsColumns> = [
    {
      title: "Piętro",
      dataIndex: "floor",
      key: "floor",
    },
    {
      title: "Pomieszczenie",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nazwa",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={parsedResults()}
      rowKey={"id"}
      scroll={{ x: true }}
    />
  );
};
