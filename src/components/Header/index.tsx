import React from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./Header.module.scss";

type Props = {};

const OVERVIEW = "/";
const REPOSITORIES = "/repositories";

const Header = (props: Props) => {
  const location = useLocation();
  const getClassName = (path: string | undefined) => {
    if (path === location.pathname) {
      return `${styles.link} ${styles.active}`;
    }
    return styles.link;
  };
  return (
    <div className={styles.container}>
      <Link className={getClassName(OVERVIEW)} to={OVERVIEW}>
        Overview
      </Link>
      <Link className={getClassName(REPOSITORIES)} to={REPOSITORIES}>
        Repositories
      </Link>
    </div>
  );
};

export default Header;
