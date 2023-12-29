import classNames from "classnames";
import React, { FC } from "react";

import styles from "./tab.module.scss";
import { useThemeContext } from "../../../context/theme/context";
import { Theme } from "../../../@types";

type TabProps = {
  title: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
};

const Tab: FC<TabProps> = ({ title, onClick, active, disabled }) => {
   const {themeValue} = useThemeContext()
  
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={classNames(styles.tab, { [styles.disabled]: disabled, [styles.active]: active }, {[styles.darkTab] : themeValue === Theme.Dark})}
    >
      {title}
    </button>
  );
};

export default Tab;