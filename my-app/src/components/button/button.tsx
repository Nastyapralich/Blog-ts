import { ReactElement } from 'react';
import classNames from "classnames";
import style from './button.module.scss'

export enum ButtonType{
Primary = 'primary',
Secondary = 'secondary',
Secondary_2 = 'secondary_2'
}

interface ButtonProps{
    type: ButtonType;
    title: string | ReactElement;
    onClick: () => void;
    disabled?: boolean;
}

const Button = (props:ButtonProps) =>{
    const buttonStyle = style[props.type];
    return(
        <div className={classNames(buttonStyle, { [style.disabled]: props.disabled })}>{props.title}</div>
    )
}

export default Button