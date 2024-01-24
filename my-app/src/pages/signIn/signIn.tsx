import { useEffect, useState } from "react";
import FormPageContainer from "../../components/formPagesContainer/formPagesContainer";
import Input from "../../components/input/input";
import style from "./sugnIn.module.scss";
import { useThemeContext } from "../../context/theme/context";
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "../router";

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {themeValue} = useThemeContext();

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onSubmit = () => {
      dispatch(
        signInUser({
          data: { email, password },
          callback: () => navigate(RoutesList.AllPosts),
        })
      );
    };
    
  return (
    <FormPageContainer
      title={"Sign In"}
      btnTitle={"Sign In"}
      onSubmit={onSubmit}
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
