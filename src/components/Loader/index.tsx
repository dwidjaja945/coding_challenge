import React from "react";
import { CircularProgress } from "@material-ui/core";

import styles from "./Loader.module.scss";

const Loader = (): JSX.Element => (
  <div className={styles.loaderContainer}>
    <CircularProgress />
  </div>
);

export default Loader;
