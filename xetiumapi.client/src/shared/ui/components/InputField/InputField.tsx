import Styles from './inputField.module.css'
import {FC, InputHTMLAttributes} from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

interface IInputFieldProps extends HTMLInputProps {
    errorText: string,
    isCorrect: () => boolean,
    onChange: (value: string) => void,
    label: string
}

export const InputField: FC<IInputFieldProps> = (props) => {
    const {
        onChange,
        placeholder,
        isCorrect,
        errorText,
        type = 'text',
        label,
        ...otherProps
    }: IInputFieldProps = props

    return (
        <>
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className={Styles.inputField}
                onChange={event => onChange(event.target.value)}
                {...otherProps}/>
            {!isCorrect() && <p className={Styles.error}>{errorText}</p>}
        </>
    );
};
