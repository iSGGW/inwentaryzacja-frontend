import { FunctionComponent } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { navigationElement } from "../App";
import "./AppLayout.css";

interface appLayoutProps {
  navigation: navigationElement[];
}

const AppLayout: FunctionComponent<appLayoutProps> = ({ navigation }) => {
  const location = useLocation();

  return (
    <div className={"layout"}>
      <div className={"menu"}>
        <div className={"container"}>
          <div className={"logo"}>iSGGW</div>
          <div className={"navigation"}>
            {navigation.map((navElement) => (
              <Link
                key={navElement.name}
                to={navElement.pathname}
                className={`item ${
                  location.pathname === navElement.pathname ? "active" : ""
                }`}
              >
                {navElement.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={"container"}>
        <div className={"content"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
