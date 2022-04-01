import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { navigationElement } from "../App";
import "./AppLayout.css";

interface appLayoutProps {
  navigation: navigationElement[];
}

const AppLayout: FunctionComponent<appLayoutProps> = ({ navigation }) => {
  return (
    <div className={"layout"}>
      <div className={"menu"}>
        <div className={"container"}>
          <div className={"logo"}>iSGGW</div>
          <div className={"navigation"}>
            {navigation.map((navElement) => (
              <div key={navElement.name} className={"item"}>
                {navElement.name}
              </div>
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
