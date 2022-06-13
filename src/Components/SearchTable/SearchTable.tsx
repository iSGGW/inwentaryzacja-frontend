import type { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import type { searchResult } from "src/App/Entities";

interface searchTableProps {
  results: searchResult[];
  setOpenedResult: Dispatch<SetStateAction<searchResult | undefined>>;
}

interface searchResultsColumn {
  id: string;
  name: string;
  status?: string;
  floor: string;
  room: string;
}

export const SearchTable: FunctionComponent<searchTableProps> = ({
  results,
  setOpenedResult,
}) => {
  const parsedResults = () => {
    const dataToReturn: searchResultsColumn[] = [];
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

  const columns: ColumnsType<searchResultsColumn> = [
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

  const openDetails = (record: searchResultsColumn) => {
    const chosenItem = results.find((result) => result.id === record.id);
    setOpenedResult(chosenItem);
  };

  return (
    <Table
      columns={columns}
      dataSource={parsedResults()}
      rowKey={"id"}
      onRow={(record) => {
        return {
          onClick: () => openDetails(record),
        };
      }}
      scroll={{ x: true }}
    />
  );
};
