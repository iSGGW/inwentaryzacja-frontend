import type { FunctionComponent, ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import type { FormInstance, InputRef } from "antd";
import type { item } from "src/App/Entities";
import Status from "src/Components/Status/Status";

import styles from "./ModifyTable.module.css";

const EditableContext = createContext<FormInstance | null>(null);

interface EditableRowProps {
  index: number;
}

const EditableRow: FunctionComponent<EditableRowProps> = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  children: ReactNode;
  dataIndex: keyof item;
  editable: boolean;
  handleSave: (record: item) => void;
  record: item;
  title: ReactNode;
}

const EditableCell: FunctionComponent<EditableCellProps> = ({
  children,
  dataIndex,
  editable,
  handleSave,
  record,
  title,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {dataIndex === "status" ? (
          <Input
            type={"number"}
            min={1}
            max={4}
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
          />
        ) : (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

interface ModifyTableProps {
  addNewItem: () => void;
  deleteItem: (id: string) => void;
  modifyItem: (item: item) => void;
  roomItems: item[];
  loadingItems: boolean;
}

const ModifyTable: FunctionComponent<ModifyTableProps> = ({
  addNewItem,
  deleteItem,
  modifyItem,
  roomItems,
  loadingItems,
}) => {
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Typ",
      dataIndex: "type",
      editable: true,
    },
    {
      title: "Nazwa",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Producent",
      dataIndex: "manufacturer",
      editable: true,
    },
    {
      title: "Nr seryjny",
      dataIndex: "serialNumber",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      editable: true,
      render: (value) => <Status itemStatus={value} />,
    },
    {
      title: "Piętro",
      dataIndex: "room",
      render: (value) => value.floor?.level,
    },
    {
      title: "Pomieszczenie",
      dataIndex: "room",
      render: (value) => value.number,
    },
    {
      title: "Akcje",
      dataIndex: "id",
      fixed: "right",
      render: (dataIndex) => (
        <Popconfirm
          title="Czy chcesz usunąć?"
          onConfirm={() => deleteItem(dataIndex)}
        >
          <a>Usuń</a>
        </Popconfirm>
      ),
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: item) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: modifyItem,
      }),
    };
  });

  return (
    <div className={styles.modifyTable}>
      <Button onClick={addNewItem} type="primary" style={{ marginBottom: 16 }}>
        Dodaj przedmiot
      </Button>
      <Table
        bordered
        columns={columns as ColumnTypes}
        className={styles.table}
        components={components}
        dataSource={roomItems}
        loading={loadingItems}
        rowClassName={() => "editable-row"}
        rowKey={"id"}
      />
    </div>
  );
};

export default ModifyTable;
