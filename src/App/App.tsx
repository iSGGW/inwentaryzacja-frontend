import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Page from "./Page";

import Auth from "../Containers/Auth/Auth";
import Display from "../Containers/Display/Display";

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
          path="/display"
          element={
            <Page title="skaner">
              < Display />
            </Page>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </>
  );
}

export default App;
