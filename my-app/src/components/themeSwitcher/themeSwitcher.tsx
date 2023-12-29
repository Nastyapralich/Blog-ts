import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useThemeContext } from "../../context/theme/context";
import style from "./themeSwitcher.module.scss";
import classNames from "classnames";
import { Theme } from "../../@types";

const ThemeSwitcher = () => {
  const { themeValue, onChangeTheme } = useThemeContext(); //сразу достаем значение из контекста
  return (
    <div className={style.container}>
      <div
        className={classNames(style.button, {
          [style.activeButton]: themeValue === Theme.Light,
        })}
        onClick={() => onChangeTheme(Theme.Light)}
      >
        <FontAwesomeIcon icon={faSun} />
      </div>
      <div
        className={classNames(style.button, {
          [style.activeButton]: themeValue === Theme.Dark,
        })}
        onClick={() => onChangeTheme(Theme.Dark)}
      >
        <FontAwesomeIcon icon={faMoon} />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
