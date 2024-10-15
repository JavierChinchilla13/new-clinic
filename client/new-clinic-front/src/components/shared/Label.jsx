import PropTypes from 'prop-types';

const Label = ({ children }) => {

    const styles = `text-lg ml-[150px] mt-[10px]`;

    return (
        <p className={styles}>
            {children}
        </p>
    )
}

Label.propTypes = {
    children: PropTypes.any.isRequired,
}

export default Label