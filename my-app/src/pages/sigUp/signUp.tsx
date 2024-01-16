import { useState } from 'react';
import FormPageContainer from '../../components/formPagesContainer/formPagesContainer'
import Input from '../../components/input/input';
import style from './signUp.module.scss'
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/reducers/authSlice';

const SignUp = () =>{

 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirm, setConfirm] = useState("");

 
 const dispatch = useDispatch();

 const onSubmit = () => {
    const data = {
        username: name,
        email: email,
        password: password
    }
    dispatch(signUpUser({ data, callback: () => {} }));
 }


    return(

        <FormPageContainer 
        title={'Sign Up'} 
        btnTitle={'Sign Up'}
        onSubmit={onSubmit}
        additionalText={
            <div>{'Already have an account?'} <span className={style.additional}>Sign In</span></div>} >
            <div className={style.container}>
            <Input title={'Name'} placeholder={'Your name'} onChange={setName} value={name} />
            <Input title={'Email'} placeholder={'Your email'} onChange={setEmail} value={email} />
            <Input title={'Password'} placeholder={'Your password'} onChange={ setPassword} value={password} />
            <Input title={'Confirm password'} placeholder={'Confirm password'} onChange={setConfirm} value={confirm} />
         </div>
         </FormPageContainer>
    )
}

export default SignUp;