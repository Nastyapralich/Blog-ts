import classNames from 'classnames'
import style from './title.module.scss'

interface TitleProps{
    content:string
}

const Title = (props:TitleProps) =>{
    return(
<div className={classNames(style.titleWrap)}>
<span className={classNames(style.titleContent)}>{props.content}</span>
</div>
    )
}

export default Title