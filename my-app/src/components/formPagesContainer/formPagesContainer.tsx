import classNames from "classnames";
import Title from "../title";
import style from "./formPagesContainer.module.scss";
import { Children, ReactElement, useContext } from "react";
import Button, { ButtonType } from "../button";
import { useThemeContext } from "../../context/theme/context";
import { Theme } from "../../@types";

interface FormPageContainerProps {
  title: string;
  children?: ReactElement;
  btnTitle: string;
  onSubmit: () => void;
  additionalText?: ReactElement;
}

const FormPageContainer = (props: FormPageContainerProps) => {
  const { themeValue } = useThemeContext();

  return (
    <div
      className={classNames(style.container, {
        [style.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <div
        className={classNames(style.text, {
          [style.darkText]: themeValue === Theme.Dark,
        })}
      >
        Back to home
      </div>
      <Title content={props.title} />
      <div className={classNames(style.formContainer)}>
        {props.children}
        <Button
          type={ButtonType.Primary}
          title={props.btnTitle}
          onClick={props.onSubmit}
        />
        <div
          className={classNames(style.additionalText, {
            [style.darkAdditionalText]: themeValue === Theme.Dark,
          })}
        >
          {props.additionalText}
        </div>
      </div>
    </div>
  );
};

export default FormPageContainer;
