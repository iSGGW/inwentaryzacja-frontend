import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Page from "./Page";

import Auth from "../Containers/Auth/Auth";
import Stocktaking from "../Containers/Stocktaking/Stocktaking";

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
          path="/stocktaking"
          element={
            <Page title="Inwentaryzacja">
              <Stocktaking />
            </Page>
          }
        />
        <Route path="*" element={<Navigate to="/stocktaking" />} />
      </Routes>
    </>
  );
}

export default App;
