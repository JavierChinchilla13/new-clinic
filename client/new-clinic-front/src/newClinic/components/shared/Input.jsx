import PropTypes from "prop-types";

const Input = ({ text, handleText, placeHolder, nameRef, extraStyle = "" }) => {
  const styles = `py-2 pl-2 rounded-xl border-2 
                    border-blue-300 focus:outline-sky-500 ${extraStyle}`;

  const onChange = (event) => {
    handleText(event); // Aquí se pasa el evento al handler.
  };

  return (
    <input
      type="text"
      placeholder={placeHolder + "..."}
      className={styles}
      value={text}
      onChange={onChange}
      name={nameRef}
    />
  );
};

Input.propTypes = {
  text: PropTypes.string,
  handleText: PropTypes.func,
  placeHolder: PropTypes.string.isRequired,
  nameRef: PropTypes.string,
  extraStyle: PropTypes.string,
};

export default Input;
