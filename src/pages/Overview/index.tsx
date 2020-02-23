import React from "react";
import BodyContainer from "../../components/BodyContainer";
import StarIcon from "@material-ui/icons/Star";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import Skeleton from "./Skeleton";
import { useFetch } from "../../helperUtils/useFetch";
import { getLanguageColor } from "../../helperUtils/languageColorUtil";

import styles from "./Overview.module.scss";

type Props = {};

const Overview = (props: Props): JSX.Element => {
  const { loading, data, error } = useFetch(
    "https://api.github.com/users/octocat/repos"
  );

  const modifyNumberCount = (stars: number): String => {
    if (stars < 1000) {
      return String(stars);
    }
    let shortenedNumber = String(stars / 1000);
    if (shortenedNumber.indexOf(".") !== -1) {
      shortenedNumber = shortenedNumber.slice(0, -2);
    }
    return `${shortenedNumber}k`;
  };

  const renderRepo = (repo: any): JSX.Element | null => {
    return (
      <div className={styles.repoContainer}>
        <div className={styles.mainInfo}>
          <a>
            <div className={styles.repoName}>{repo.name}</div>
          </a>
          <div className={styles.description}>{repo.description}</div>
        </div>
        <div className={styles.subInfoContainer}>
          {repo.language && (
            <div className={styles.language}>
              <div
                className={styles.languageIcon}
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              {repo.language}
            </div>
          )}
          <div className={styles.subInfo}>
            <StarIcon className={styles.icon} />
            {modifyNumberCount(repo.stargazers_count)}
          </div>
          <div className={styles.subInfo}>
            <CallSplitIcon className={styles.icon} />
            {modifyNumberCount(repo.forks_count)}
          </div>
        </div>
      </div>
    );
  };

  const renderPopularRepos = () => {
    const sortedData = data.sort(
      (a: any, b: any) => b.stargazers_count - a.stargazers_count
    );
    const popularRepos = sortedData.slice(0, 6);
    return (
      <div className={styles.popularRepos}>{popularRepos.map(renderRepo)}</div>
    );
  };

  const getBody = () => {
    if (loading) {
      return <Skeleton />;
    }
    return (
      <div>
        <div className={styles.title}>Popular repositories</div>
        {renderPopularRepos()}
      </div>
    );
  };

  return <BodyContainer>{getBody()}</BodyContainer>;
};

export default Overview;
