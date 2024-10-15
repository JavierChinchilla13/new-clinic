import logo from '../../assets/logo.jpg';
import PropTypes from 'prop-types';

const Logo = ({ widthPx = '400', extraStyle = '' }) => {

    const styles = `w-[${widthPx}px] ${extraStyle}`

    return (
        <img src={logo} href='#' alt=''
            className={styles} />
    )
}

Logo.propTypes = {
    widthPx: PropTypes.string.isRequired,
    extraStyle: PropTypes.string,
}

export default Logo;