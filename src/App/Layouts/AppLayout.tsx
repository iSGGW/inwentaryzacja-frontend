import { FunctionComponent } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import cx from "classnames";
import { navigationElement } from "src/App/App";
import { Container } from "src/Components/Container";

import styles from "./AppLayout.module.css";

interface appLayoutProps {
  navigation: navigationElement[];
}

const AppLayout: FunctionComponent<appLayoutProps> = ({ navigation }) => {
  const location = useLocation();

  const linkClassName = (locationPath: string, navElementPath: string) =>
    cx(styles.item, { [styles.active]: locationPath === navElementPath });

  return (
    <>
      <div className={styles.menuWrapper}>
        <Container>
          <div className={styles.menu}>
            <div className={styles.logo}>iSGGW</div>
            <div className={styles.navigation}>
              {navigation.map((navElement) => (
                <Link
                  className={linkClassName(
                    location.pathname,
                    navElement.pathname
                  )}
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
      <Container>
        <div className={styles.content}>
          <Outlet />
        </div>
      </Container>
    </>
  );
};

export default AppLayout;
