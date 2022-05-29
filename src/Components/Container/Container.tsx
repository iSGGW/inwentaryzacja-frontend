import { FunctionComponent } from "react";
import styles from "./Container.module.css";

export const Container: FunctionComponent = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
