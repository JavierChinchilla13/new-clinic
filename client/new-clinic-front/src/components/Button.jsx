import PropTypes from 'prop-types';

const Button = ({ value, extraClassNames }) => {

    const classNames = `rounded-md bg-emerald-300 border border-emerald-300  
                    py-2 px-4 text-center text-lg transition-all 
                    shadow-sm hover:shadow-lg text-slate-600 hover:text-white 
                    hover:bg-emerald-400 hover:border-emerald-400 focus:text-white 
                    focus:bg-emerald-400 focus:border-emerald-400 active:border-emerald-400 
                    active:text-white active:bg-emerald-400 disabled:pointer-events-none 
                    disabled:opacity-50 disabled:shadow-none ${extraClassNames}`;

    return (
        <button
            className={classNames}
            type="button">
            {value}
        </button>
    )
}

Button.propTypes = {
    value: PropTypes.string.isRequired,
    extraClassNames: PropTypes.string.isRequired,
}

export default Button;
