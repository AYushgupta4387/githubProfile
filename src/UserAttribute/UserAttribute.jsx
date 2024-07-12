import styles from "./UserAttribute.module.css";
import PropTypes from "prop-types";

function UserAttribute({ text, attribute }) {
  return (
    <div className={`${styles.userAttributeContainer} be-vietnam-pro-regular`}>
      {text} <span>{attribute}</span>
    </div>
  );
}

UserAttribute.propTypes = {
  attribute: PropTypes.any, // Define the type and whether it's required
  text: PropTypes.string,
};

export default UserAttribute;
