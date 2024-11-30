import logo from "../../../assets/NewClinic.png";
import PropTypes from "prop-types";

const Logo = ({ extraStyle = "" }) => {
  return <img src={logo} alt="NewClinic.png" className={`${extraStyle}`} />;
};

Logo.propTypes = {
  extraStyle: PropTypes.string,
};

export default Logo;
