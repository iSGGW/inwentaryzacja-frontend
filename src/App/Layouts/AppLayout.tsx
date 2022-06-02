import { FunctionComponent } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import cx from "classnames";
import type { navigationElement } from "src/App/App";
import { Container } from "src/Components/Container";

import styles from "./AppLayout.module.css";

interface appLayoutProps {
  navigation: navigationElement[];
}

const AppLayout: FunctionComponent<appLayoutProps> = ({ navigation }) => {
  const location = useLocation();

  const activePage = navigation.find((element) => element.pathname === location.pathname);
  const linkClassName = (pagePath: string) =>
    cx(
      styles.item,
      { [styles.active]: activePage?.pathname === pagePath }
    );

  return (
    <div className={styles.inwentaryzacja}>
      <div className={styles.menuWrapper}>
        <Container>
          <div className={styles.menu}>
            <div className={styles.logo}>iSGGW</div>
            <div className={styles.navigation}>
              {navigation.map((navElement) => (
                <Link
                  className={linkClassName(navElement.pathname)}
                  key={navElement.name}
                  to={navElement.pathname}
                >
                  {navElement.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
