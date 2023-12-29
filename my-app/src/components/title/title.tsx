import classNames from 'classnames'
import style from './title.module.scss'
import { useThemeContext } from '../../context/theme/context';
import { Theme } from '../../@types';

interface TitleProps{
    content:string
}

const Title = (props:TitleProps) =>{

const {themeValue} = useThemeContext();

    return(
<div className={classNames(style.titleWrap)}>
<span className={classNames(style.titleContent,{[style.darkTitle] : themeValue === Theme.Dark})}>{props.content}</span>
</div>
    )
}

export default Title