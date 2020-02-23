import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import BodyContainer from "../../../components/BodyContainer";

import styles from "./OverviewSkeleton.module.scss";

const OverviewSkeleton = (): JSX.Element => (
  <BodyContainer>
    <div className={styles.title}>
      <Skeleton height={40} width="30%" />
    </div>
    <div className={styles.cardContainer}>
      {Array(6)
        .fill(null)
        .map((item, index) => (
          <div key={`skeleton-${index}`} className={styles.card}>
            <div className={styles.mainInfo}>
              <Skeleton height={30} width={Math.random() * 90 + 30} />
              <Skeleton height={20} width="80%" />
              <Skeleton height={20} width="30%" />
              <Skeleton height={20} width="50%" />
            </div>
            <div className={styles.subInfo}>
              <div className={styles.language}>
                <Skeleton
                  className={styles.languageIcon}
                  variant="circle"
                  height={20}
                  width={20}
                />
                <Skeleton width="60" height="30" />
              </div>
              <Skeleton width="20%" height="30" />
              <Skeleton width="20%" height="30" />
            </div>
          </div>
        ))}
    </div>
  </BodyContainer>
);

export default OverviewSkeleton;
