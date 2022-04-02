import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Page from "./Page";
import "./Base.css";

import Auth from "../Containers/Auth/Auth";
import AppLayout from "./Layouts/AppLayout";
import Search from "../Containers/Search/Search";

export interface navigationElement {
  pathname: string;
  name: string;
  href: string;
}

const navigation: navigationElement[] = [
  {
    pathname: "/search",
    name: "Search",
    href: "search",
  },
];

function App() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout navigation={navigation} />}>
          <Route
            path="/search"
            element={
              <Page title="Wyszukaj">
                <Search />
              </Page>
            }
          />
        </Route>
        <Route
          path="/auth"
          element={
            <Page title="Zaloguj się">
              <Auth />
            </Page>
          }
        />
        <Route path="*" element={<Navigate to="/search" />} />
      </Routes>
    </>
  );
}

export default App;
