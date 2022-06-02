import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import type { ReactElement } from "react";
import Page from "./Page";
import "./Base.css";

import Auth from "../Containers/Auth/Auth";
import AppLayout from "./Layouts/AppLayout";
import Search from "../Containers/Search/Search";
import Add from "../Containers/Add/Add";

import magnifyingGlass from "src/Assets/magnifyingGlass.svg";
import plus from "src/Assets/plus.svg";

export interface navigationElement {
  pathname: string;
  name: string;
  href: string;
  icon: ReactElement;
}

const navigation: navigationElement[] = [
  {
    pathname: "/search",
    name: "Wyszukiwanie",
    href: "search",
    icon: <img src={magnifyingGlass} alt={"search_icon"} />,
  },
  {
    pathname: "/add",
    name: "Dodawanie",
    href: "add",
    icon: <img src={plus} alt={"add_icon"} />,
  },
];

function App() {
  //TODO: Read authentication from api
  const isAuthenticated = true;

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <Page title="Zaloguj się">
            <Auth />
          </Page>
        }
      />
      {isAuthenticated ? (
        <Route element={<AppLayout navigation={navigation} />}>
          <Route
            path="/search"
            element={
              <Page title="Wyszukaj">
                <Search />
              </Page>
            }
          />
          <Route
            path="/add"
            element={
              <Page title="Wyszukaj">
                <Add />
              </Page>
            }
          />
          <Route path="*" element={<Navigate to="/search" />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/auth" />} />
      )}
    </Routes>
  );
}

export default App;
