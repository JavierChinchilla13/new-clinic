import PropTypes from "prop-types";

const Button = ({
  children,
  ligthVariant = false,
  extraStyle,
  onClickFunc,
}) => {
  let styles = ligthVariant
    ? `rounded-md bg-white border border-emerald-400  
            py-2 px-4 text-center text-lg transition-all 
            shadow-sm hover:shadow-lg text-slate-600 hover:text-white 
            hover:bg-emerald-900 hover:border-emerald-900 focus:text-white 
            focus:bg-emerald-900 focus:border-emerald-900 active:border-emerald-400 
            active:text-white active:bg-emerald-400 disabled:pointer-events-none 
            disabled:opacity-50 disabled:shadow-none`
    : `rounded-md bg-emerald-300 border border-emerald-300  
            py-2 px-4 text-center text-lg transition-all 
            shadow-sm hover:shadow-lg text-slate-600 hover:text-white 
            hover:bg-emerald-400 hover:border-emerald-400 focus:text-white 
            focus:bg-emerald-400 focus:border-emerald-400 active:border-emerald-400 
            active:text-white active:bg-emerald-400 disabled:pointer-events-none 
            disabled:opacity-50 disabled:shadow-none`;
  return (
    <button
      className={`${styles} ${extraStyle}`}
      type="button"
      onClick={onClickFunc}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.string,
  ligthVariant: PropTypes.bool,
  extraStyle: PropTypes.string,
  onClickFunc: PropTypes.func,
};

export default Button;
