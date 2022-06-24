import { FunctionComponent, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import cx from "classnames";
import { Button, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import type { navigationElement } from "src/App/Entities";
import sggwLogoWhite from "src/Assets/sggwLogoWhite.svg";

import styles from "./AppLayout.module.css";
import { Container } from "src/Components/Container";
import { logout } from "src/App/Endpoints/auth";

interface appLayoutProps {
  navigation: navigationElement[];
}

const AppLayout: FunctionComponent<appLayoutProps> = ({ navigation }) => {
  const { Sider, Content } = Layout;
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState<string>(
    location.pathname
  );
  const [siderCollapsed, setSiderCollapsed] = useState<boolean>(true);

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

  const chooseMenuItem = (item: string) => {
    if (item === "/logout") {
      logout();
    } else {
      setCurrentLocation(item);
    }
  };

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
          onClick={(e) => chooseMenuItem(e.key)}
          selectedKeys={[currentLocation]}
          theme="dark"
        />
      </Sider>
      <Layout>
        <Content className={styles.content}>
          <Container>
            <Button
              className={styles.openMenu}
              onClick={() => setSiderCollapsed(false)}
            >
              Otwórz menu
              <ArrowRightOutlined />
            </Button>
          </Container>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
