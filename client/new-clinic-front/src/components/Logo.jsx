import logo from '../assets/logo.jpg';
import PropTypes from 'prop-types';


const Logo = ({ classNames }) => {

    return (
        <img src={logo} href='#' alt=''
            className={classNames} />
    )
}

Logo.propTypes = {
    classNames: PropTypes.string.isRequired,
}

export default Logo;