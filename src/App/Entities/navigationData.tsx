import { ReactElement } from "react";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

export interface navigationElement {
  pathname: string;
  name: string;
  href: string;
  icon: ReactElement;
}

export const navigation: navigationElement[] = [
  {
    pathname: "/search",
    name: "Wyszukiwanie",
    href: "search",
    icon: <SearchOutlined />,
  },
  {
    pathname: "/add",
    name: "Dodawanie",
    href: "add",
    icon: <PlusOutlined />,
  },
];
