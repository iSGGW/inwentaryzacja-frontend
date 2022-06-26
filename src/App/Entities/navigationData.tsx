import { ReactElement } from "react";

import {
  EditOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export interface navigationElement {
  pathname: string;
  name: string;
  href: string;
  icon: ReactElement;
}

export const navigationAdmin: navigationElement[] = [
  {
    pathname: "/search",
    name: "Inwentaryzacja",
    href: "search",
    icon: <SearchOutlined />,
  },
  {
    pathname: "/modify",
    name: "Modyfikacja stanu",
    href: "modify",
    icon: <EditOutlined />,
  },
  {
    pathname: "/logout",
    name: "Wyloguj",
    href: "#",
    icon: <LogoutOutlined />,
  },
];

export const navigationUser: navigationElement[] = [
  {
    pathname: "/search",
    name: "Inwentaryzacja",
    href: "search",
    icon: <SearchOutlined />,
  },
  {
    pathname: "/logout",
    name: "Wyloguj",
    href: "#",
    icon: <LogoutOutlined />,
  },
];
