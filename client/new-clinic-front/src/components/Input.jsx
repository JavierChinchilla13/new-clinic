import { useState } from 'react';
import PropTypes from 'prop-types';


const Input = ({ placeHolder, returnTextFunc, classNames }) => {

    const [text, setText] = useState('');

    const handleText = (e) => {

        setText(e.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        //si el input tiene menos de 1 caracter no se sube el formulario
        if (text.trim().length <= 1) return;

        //PASAR DE VUELTA AL COMPONENTE PADRE EL TEXT
        returnTextFunc(text);
        setText('');

    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <input type='text' placeholder={placeHolder + '...'}
                className={classNames}
                value={text}
                onChange={handleText} />
        </form>
    )
}

Input.propTypes = {
    placeHolder: PropTypes.string.isRequired,
    returnTextFunc: PropTypes.func.isRequired,
    classNames: PropTypes.func.isRequired,

}

export default Input;