import { Outlet } from "react-router-dom";
import Burger from "../burger";

import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Burger onClick={() => {}} />
      </div>
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        Footer
      </div>
    </div>
  );
};

export default Header;
