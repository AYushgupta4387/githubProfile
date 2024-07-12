import { useEffect, useReducer, useState } from "react";
import styles from "./App.module.css";

import Header from "./Header/Header";
import UserAttribute from "./UserAttribute/UserAttribute";
import RepoCard from "./RepoCard/RepoCard";
import { useDebounce } from "./hooks/useDebounce";

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const initialState = {
  userProfileImage: "",
  userFollowers: 0,
  userFollowing: 0,
  userLocation: "secret",
  userRepos: [],
  userName: "",
  userBio: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userProfileImage: action.payload.avatar_url,
        userFollowers: action.payload.followers,
        userFollowing: action.payload.following,
        userLocation: action.payload.location || "secert",
        userName: action.payload.name,
        userbio: action.payload.bio,
      };

    case "SET_USER_REPOS":
      return {
        ...state,
        userRepos: action.payload,
      };

    default:
      return state;
  }
};

function App() {
  const [query, setQuery] = useState("AYushgupta4387");
  const [inputError, setInputError] = useState(false);
  const debouncedQuery = useDebounce(query);

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    userProfileImage,
    userFollowers,
    userFollowing,
    userLocation,
    userRepos,
    userName,
    userBio,
  } = state;

  useEffect(() => {
    if (!inputError) {
      fetch(`https://api.github.com/users/${debouncedQuery}`, {
        headers: {
          Authorization: `token ${TOKEN}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: "SET_USER_DATA", payload: data });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [debouncedQuery, inputError]);

  useEffect(() => {
    if (!inputError) {
      fetch(`https://api.github.com/users/${debouncedQuery}/repos`, {
        headers: {
          Authorization: `token ${TOKEN}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: "SET_USER_REPOS", payload: data });
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
        });
    }
  }, [debouncedQuery, inputError]);

  return (
    <>
      <Header
        query={query}
        setQuery={setQuery}
        inputError={inputError}
        setInputError={setInputError}
      />
      <main>
        <div className={styles.mainTopContainer}>
          <div className={styles.userImgContainer}>
            <img src={userProfileImage} alt="" />
          </div>
          <div className={styles.userAttributesContainer}>
            <UserAttribute text={"Followers"} attribute={userFollowers} />
            <UserAttribute text={"Following"} attribute={userFollowing} />
            <UserAttribute text={"Location"} attribute={userLocation} />
          </div>
        </div>

        <div className={styles.userInfoContainer}>
          <h1 className="be-vietnam-pro-medium">{userName}</h1>
          <p className="be-vietnam-pro-regular">{userBio}</p>
        </div>

        <div className={styles.gridContainer}>
          {userRepos.length > 0 ? (
            <>
              {userRepos.map((repo) => (
                <RepoCard repo={repo} key={repo.id} />
              ))}
            </>
          ) : (
            <h2 className="be-vietnam-pro-medium" style={{ color: "white" }}>
              Loading...
            </h2>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
