import Styles from './input.module.css'
import {FC, InputHTMLAttributes} from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

interface IInputFieldProps extends HTMLInputProps {
    onChange: (value: string) => void,
}

export const Input: FC<IInputFieldProps> = (props) => {
    const {
        onChange,
        placeholder,
        type = 'text',
        ...otherProps
    }: IInputFieldProps = props

    return (
        <input
            type={type}
            placeholder={placeholder}
            className={Styles.inputField}
            onChange={event => onChange(event.target.value)}
            {...otherProps}/>
    );
};
