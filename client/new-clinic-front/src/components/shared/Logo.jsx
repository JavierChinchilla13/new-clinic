import logo from '../../assets/logo.jpg';
import PropTypes from 'prop-types';

const Logo = ({ extraStyle = '' }) => {

    return (
        <img src={logo} href='#' alt=''
            className={extraStyle} />
    )
}

Logo.propTypes = {
    extraStyle: PropTypes.string,
}

export default Logo;