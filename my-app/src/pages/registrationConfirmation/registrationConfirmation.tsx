import { useNavigate, useParams } from "react-router-dom";
import FormPageContainer from "../../components/formPagesContainer/formPagesContainer";
import style from "./registrationConfirmation.module.scss";
import { useDispatch } from "react-redux";
import { activateUser } from "../../redux/reducers/authSlice";
import { RoutesList } from "../router";

const RegistrationConfirmation = () => {

  const { uid, token } = useParams(); //параметры в url

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (uid && token) {
      dispatch(
        activateUser({
          data: { uid, token },
          callback: () => {navigate(RoutesList.SignIn)}
        })
      ); //берем в руку снежок, кидаем в активэйт юзер данные(то, что в скобках) }
    }
}

    return (
      <FormPageContainer
        title={"Registration Confirmation"}
        btnTitle={"Activate"}
        onSubmit={onSubmit}
      >
        <div className={style.text}>
          {"Please activate your account with button"}
        </div>
      </FormPageContainer>
    );
  };

export default RegistrationConfirmation;
