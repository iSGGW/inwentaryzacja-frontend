import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Page from "./Page";
import "./Base.less";

import { navigation } from "src/App/Entities";

import Add from "../Containers/Add/Add";
import AppLayout from "./Layouts/AppLayout";
import Auth from "../Containers/Auth/Auth";
import Modify from "../Containers/Modify/Modify";
import Search from "../Containers/Search/Search";

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
          <Route
            path="/modify"
            element={
              <Page title="Modyfikuj">
                <Modify />
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
