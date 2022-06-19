import { ReactElement } from "react";

import { EditOutlined, SearchOutlined } from "@ant-design/icons";

export interface navigationElement {
  pathname: string;
  name: string;
  href: string;
  icon: ReactElement;
}

export const navigation: navigationElement[] = [
  {
    pathname: "/search",
    name: "Inwentaryzacja",
    href: "search",
    icon: <SearchOutlined />,
  },
  // {
  //   pathname: "/add",
  //   name: "Dodawanie",
  //   href: "add",
  //   icon: <PlusOutlined />,
  // },
  {
    pathname: "/modify",
    name: "Modyfikacja stanu",
    href: "modify",
    icon: <EditOutlined />,
  },
];
