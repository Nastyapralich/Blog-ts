import { useEffect, useState } from "react";
import FormPageContainer from "../../components/formPagesContainer/formPagesContainer";
import Input from "../../components/input/input";
import style from "./sugnIn.module.scss";
import { useThemeContext } from "../../context/theme/context";

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() =>{
    console.log(email);
    console.log(123);
    }, [email])

    const {themeValue} = useThemeContext();
    
  return (
    <FormPageContainer
      title={"Sign In"}
      btnTitle={"Sign In"}
      onSubmit={() => {}}
      additionalText={
        <div>
          Don’t have an account? <span className={style.signIn}>Sign Up</span>
        </div>
      }
    >
      <div>
        <Input
          title={"Email"}
          placeholder={"Your email"}
          onChange={setEmail}
          value={email}
        />
        <Input
          title={"Password"}
          placeholder={"Yor password"}
          onChange={setPassword}
          value={password}
        />

        
        
      </div>
    </FormPageContainer>
  );
};

export default SignIn;
