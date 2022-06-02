import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Page from "./Page";
import "./Base.css";

import Auth from "../Containers/Auth/Auth";
import AppLayout from "./Layouts/AppLayout";
import Search from "../Containers/Search/Search";
import Add from "../Containers/Add/Add";

export interface navigationElement {
  pathname: string;
  name: string;
  href: string;
}

const navigation: navigationElement[] = [
  {
    pathname: "/search",
    name: "Wyszukiwanie",
    href: "search",
  },
  {
    pathname: "/add",
    name: "Dodawanie",
    href: "add",
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
