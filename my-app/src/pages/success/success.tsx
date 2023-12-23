import FormPageContainer from "../../components/formPagesContainer/formPagesContainer";
import style from "./success.module.scss";

const Success = () => {
  return (
    <FormPageContainer
      title={"Success"}
      btnTitle={"Go to home"}
      onSubmit={() => {}}
    >
      <div>{<p className={style.text}> Email confirmed. Your registration is now completed</p>}</div>
    </FormPageContainer>
  );
};

export default Success;
