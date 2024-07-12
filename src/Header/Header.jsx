import styles from "./Header.module.css";
import PropTypes from "prop-types";

import searchImg from "../assets/Search.svg";

function Header({ query, setQuery, inputError, setInputError }) {
  function handleInputChange(e) {
    setInputError(false);
    let queryString = e.target.value.trim();
    const regex = /^[a-zA-Z0-9_-]+$/;

    setQuery(queryString);

    if (!regex.test(queryString)) {
      setInputError(true);
    }
  }

  const errorStyles = {
    border: "3px solid red",
  };

  return (
    <header className={`${styles.header} be-vietnam-pro-regular`}>
      <div
        className={styles.inputContainer}
        style={inputError ? errorStyles : {}}
      >
        <img src={searchImg} alt="search" />
        <input
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="username"
        />
      </div>
      {inputError && <p className={styles.errorText}>Incorrect Username!</p>}
    </header>
  );
}

Header.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  inputError: PropTypes.bool,
  setInputError: PropTypes.func,
};

export default Header;
