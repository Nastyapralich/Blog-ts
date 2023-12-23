import classNames from 'classnames'
import Title from '../title'
import style from './formPagesContainer.module.scss'
import { Children, ReactElement } from 'react'
import Button, { ButtonType } from '../button'


interface FormPageContainerProps{
    title:string;
    children?: ReactElement ;
    btnTitle:string;
    onSubmit: () => void;
    additionalText?: ReactElement;
}

const FormPageContainer = (props:FormPageContainerProps) => {
    return(
        <div className={style.container}>
      <div className={style.text}>Back to home</div>
      <Title content={props.title} />
      <div className={classNames(style.formContainer)}>
        {props.children}
       <Button type={ButtonType.Primary} title={props.btnTitle} onClick={props.onSubmit} />
       <div className={style.additionalText}>{props.additionalText}</div>
      </div>
        </div>
    )
}

export default FormPageContainer