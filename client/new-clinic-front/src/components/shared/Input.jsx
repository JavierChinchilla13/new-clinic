import PropTypes from 'prop-types';


const Input = ({ text, handleText, placeHolder, extraStyle = '' }) => {

    const styles = `py-2 pl-2 rounded-xl border-2 
                    border-blue-300 focus:outline-sky-500 ${extraStyle}`;


    return (
        <input type='text' placeholder={placeHolder + '...'}
            className={styles}
            value={text}
            onChange={handleText} />
    )
}

Input.propTypes = {
    text: PropTypes.string,
    handleText: PropTypes.func,
    placeHolder: PropTypes.string.isRequired,
    extraStyle: PropTypes.string,
}

export default Input;