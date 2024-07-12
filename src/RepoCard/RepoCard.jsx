/* eslint-disable react/prop-types */
import styles from "./RepoCard.module.css";

import licenseImage from "../assets/Chield_alt.svg";
import forkImage from "../assets/Nesting.svg";
import starImage from "../assets/Star.svg";

function calculateDaysAgo(lastUpdatedTimeStamp) {
  const lastUpdated = new Date(lastUpdatedTimeStamp);
  const today = new Date();
  const timeDifference = today.getTime() - lastUpdated.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  return `updated ${daysDifference} ${daysDifference > 1 ? "days" : "day"} ago`;
}

function RepoCard({ repo }) {
  function handleClick() {
    window.open(repo.html_url, "_blank");
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={`${styles.repository} be-vietnam-pro-light`}
      >
        <h3>{repo.name}</h3>
        <p>{repo.description}</p>
        <div className={styles.attributesContainer}>
          {repo.license && (
            <div className={styles.license}>
              <img src={licenseImage} /> {repo.license.spdx_id}
            </div>
          )}
          <div className={styles.fork}>
            <img src={forkImage} />
            {repo.forks_count}
          </div>
          <div className={styles.watchers}>
            <img src={starImage} /> {repo.watchers_count}
          </div>
          <div className={styles.lastUpdated}>
            {calculateDaysAgo(repo.updated_at)}
          </div>
        </div>
      </div>
    </>
  );
}

export default RepoCard;
