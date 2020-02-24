import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useRepositoryContext } from 'providers/RepositoriesProvider';

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

  const { data } = useRepositoryContext();

  return (
    <div className={styles.container}>
      <Link className={getClassName(OVERVIEW)} to={OVERVIEW}>
        Overview
      </Link>
      <Link className={getClassName(REPOSITORIES)} to={REPOSITORIES}>
        Repositories
        <div className={styles.repositoryCount}>
            {data.length}
        </div>
      </Link>
    </div>
  );
};

export default Header;
