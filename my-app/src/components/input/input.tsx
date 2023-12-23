import React, { ChangeEvent, FC } from "react";
import classNames from "classnames";

import styles from "./input.module.scss";

interface InputProps {
  title: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  errorText?: string;
  isTextarea?: boolean;
};

const Input = (props:InputProps) => {
  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.onChange(event.target.value);
  };

  const inputProps = {
    onChange: onInputChange,
    value: props.value,
    placeholder: props.placeholder,
    className: classNames(styles.input, {
      [styles.disabled]: props.disabled,
      [styles.errorInput]: props.errorText,
    }),
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.title}>{props.title}</div>
      {props.isTextarea ? <textarea {...inputProps} /> : <input {...inputProps} />}
      {props.errorText && <div className={styles.errorText}>{props.errorText}</div>}
    </div>
  );
};

export default Input;