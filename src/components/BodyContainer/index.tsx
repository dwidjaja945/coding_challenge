import React from "react";

import styles from "./BodyContainer.module.scss";

const BodyContainer = props => (
  <div className={styles.body}>{props.children}</div>
);

export default BodyContainer;
