import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Burger from "../burger";

import styles from "./header.module.scss";
import { useMemo, useState } from "react";
import ThemeSwitcher from "../themeSwitcher/themeSwitcher";
import Button, { ButtonType } from "../button";
import { RoutesList } from "../../pages/router";
import { useThemeContext } from "../../context/theme/context";
import classNames from "classnames";
import { Theme } from "../../@types";
import UserName from "../username/uersname";

const Header = () => {

 const isLoggedIn = true

  const [isOpened, setOpened] = useState(false);

  const handleMenuOpened = () => {
    setOpened(!isOpened);
    console.log(isOpened);
  };

  const navigate = useNavigate();

  const onLoginButtonClick = () => {
    console.log(1);
    navigate(RoutesList.SignIn);
  };

  const { themeValue } = useThemeContext();

  const navLinks = useMemo(
    () => [
      { path: RoutesList.AllPosts, title: "All posts" },
      ...(isLoggedIn ? [{ path: RoutesList.SignIn, title: "Add post" }] : []),
    ],
    []
  );

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerDark]: themeValue === Theme.Dark,
      })}
    >
      <div className={styles.header}>
        <Burger onClick={handleMenuOpened} isOpened={isOpened} />
      </div>
      <div
        className={classNames(styles.outletContainer, {
          [styles.outletContainerDark]: themeValue === Theme.Dark,
        })}
      >
        <Outlet />
      </div>
      <div className={styles.footer}>Footer</div>
      {isOpened && (
        <div className={styles.menuContainer}>
          <div>
            {isLoggedIn && <UserName username={"Anastasia Pralich"} />}
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                className={styles.navLinksButtons}
                to={link.path}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
          <div>
            <ThemeSwitcher />
            <Button
              type={ButtonType.Secondary}
              title={isLoggedIn ? "Log out" : "Sign In"}
              onClick={onLoginButtonClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

//при клике на человечка переходим в sign in
