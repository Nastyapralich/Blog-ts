import FormPageContainer from '../../components/formPagesContainer/formPagesContainer'
import style from './registrationConfirmation.module.scss'

const RegistrationConfirmation = () =>{
    return(
    <FormPageContainer title={'Registration Confirmation'} btnTitle={'Go to home'} onSubmit={() =>{}}>
<div className={style.text}>
    {"Please activate your account with the activation link in the email example@gmail.com.\n Please, check your email"}
</div>
    </FormPageContainer> 
    )

}

export default RegistrationConfirmation