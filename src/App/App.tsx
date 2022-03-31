import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Page from "./Page";

import Auth from "../Containers/Auth/Auth";
import Search from "../Containers/Search/Search";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={
            <Page title="Zaloguj się">
              <Auth />
            </Page>
          }
        />
        <Route
          path="/search"
          element={
            <Page title="Wyszukaj">
              <Search />
            </Page>
          }
        />
        <Route path="*" element={<Navigate to="/search" />} />
      </Routes>
    </>
  );
}

export default App;
