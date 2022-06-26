import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Page from "./Page";
import "./Base.less";

import { navigationAdmin, navigationUser, sessionInfo } from "src/App/Entities";
import { sessionData } from "src/App/Endpoints/auth";

import Add from "../Containers/Add/Add";
import AppLayout from "./Layouts/AppLayout";
import Auth from "../Containers/Auth/Auth";
import Modify from "../Containers/Modify/Modify";
import Search from "../Containers/Search/Search";

interface userContextType {
  user: sessionInfo;
  setUser: Dispatch<SetStateAction<sessionInfo>>;
}

export const UserContext = createContext<userContextType>(
  {} as userContextType
);

function App() {
  const [user, setUser] = useState<sessionInfo>({
    token: "",
    user: "",
    role: "USER",
  });

  useEffect(() => {
    const data: sessionInfo | void = sessionData();
    if (data) {
      setUser({
        token: data.token,
        user: data.user,
        role: data.role,
      });
    }
  }, []);

  const navigation = user.role === "ADMIN" ? navigationAdmin : navigationUser;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        {user.token ? (
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
            {user.role === "ADMIN" && (
              <Route
                path="/modify"
                element={
                  <Page title="Modyfikuj">
                    <Modify />
                  </Page>
                }
              />
            )}
            <Route path="*" element={<Navigate to="/search" />} />
          </Route>
        ) : (
          <Route>
            <Route
              path="/auth"
              element={
                <Page title="Zaloguj się">
                  <Auth />
                </Page>
              }
            />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Route>
        )}
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
