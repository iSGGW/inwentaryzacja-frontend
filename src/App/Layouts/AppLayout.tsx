import { FunctionComponent, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import cx from "classnames";
import { Button, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import type { navigationElement } from "src/App/App";
import arrowLeft from "src/Assets/arrowLeft.svg";
import sggwLogoWhite from "src/Assets/sggwLogoWhite.svg";

import styles from "./AppLayout.module.css";

interface appLayoutProps {
  navigation: navigationElement[];
}

const AppLayout: FunctionComponent<appLayoutProps> = ({ navigation }) => {
  const { Sider, Content } = Layout;
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState<string>(
    location.pathname
  );
  const [siderCollapsed, setSiderCollapsed] = useState<boolean>(false);

  const siderClasses = cx(styles.sider, { [styles.closed]: siderCollapsed });

  const navigationItems: MenuProps["items"] = navigation.map((navElement) => ({
    key: navElement.pathname,
    label: (
      <Link
        key={navElement.name}
        to={navElement.pathname}
        onClick={() => setSiderCollapsed(true)}
      >
        {navElement.name}
      </Link>
    ),
    icon: navElement.icon,
  }));

  return (
    <Layout className={styles.layout} hasSider>
      <Sider
        className={siderClasses}
        collapsible
        collapsed={siderCollapsed}
        onCollapse={(value) => setSiderCollapsed(value)}
      >
        <div className={styles.logoImage}>
          <img src={sggwLogoWhite} alt="sggw_logo" />
        </div>
        <div className={styles.logo}>iSGGW</div>
        <Menu
          className={styles.menu}
          items={navigationItems}
          mode="inline"
          onClick={(e) => setCurrentLocation(e.key)}
          selectedKeys={[currentLocation]}
          theme="dark"
        />
      </Sider>
      <Layout>
        <Content className={styles.content}>
          <Button
            className={styles.openMenu}
            onClick={() => setSiderCollapsed(false)}
          >
            <img src={arrowLeft} alt={"arrow_left"} />
            Otwórz menu
          </Button>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
