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
    className? : string
}

const Button = (props:ButtonProps) =>{
    const buttonStyle = style[props.type];
    return(
        <div className={classNames(buttonStyle, props.className, { [style.disabled]: props.disabled })} onClick={props.onClick}>{props.title}</div>
    )
}

export default Button