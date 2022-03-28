import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Page from "./Page";

import Auth from "../Containers/Auth/Auth";

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
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </>
  );
}

export default App;
