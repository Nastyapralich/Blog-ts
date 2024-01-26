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
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Input from "../input/input";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, logOutUser } from "../../redux/reducers/authSlice";

const Header = () => {
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  console.log(isLoggedIn);
  
  const username = useSelector(AuthSelectors.getUserInfo)
  console.log(username);
  

  const [isOpened, setOpened] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch()

  const handleMenuOpened = () => {
    setOpened(!isOpened);
    console.log(isOpened);
  };

  const handleSearchOpen = () => {
    setSearch(!isSearch);
    if(isSearch && inputValue){
     navigate(`posts/${inputValue}`)
     setInputValue("")
    }
  };
  const navigate = useNavigate();

  const onLoginButtonClick = () => {
    navigate(RoutesList.SignUp);
    console.log(65252154);
  };

  const onLogout = () => {
    dispatch(logOutUser());
  };

  const { themeValue } = useThemeContext();

  const navLinks = useMemo(
    () => [
      { path: RoutesList.AllPosts, title: "Home" },
      ...(isLoggedIn ? [{ path: RoutesList.SignUp, title: "Add Post" }] : []),
    ],
    [isLoggedIn]
  );


  return (
    <div
      className={classNames(styles.container, {
        [styles.containerDark]: themeValue === Theme.Dark,
      })}
    >
      <div className={styles.header}>
        <Burger onClick={handleMenuOpened} isOpened={isOpened} />
        <div className={styles.navIcons}>
          <span>
            {isSearch ? (
              <div className={styles.searchContainer}>
                <Input
                  className={styles.searchInput}
                  placeholder={"Search..."}
                  onChange={setInputValue}
                  value={inputValue}
                  title={""}
                  
                />
                <Button
                  type={ButtonType.Primary}
                  title={"х"}
                  onClick={handleSearchOpen}
                  className={styles.closedSearch}
                />
              </div>
            ) : (
              <div></div>
            )}
          </span>
          <div className={styles.navIcons}>
            <span onClick={handleSearchOpen}><FontAwesomeIcon icon={faMagnifyingGlass}/></span>
             <span onClick={onLoginButtonClick}><UserName />
          </span>
          </div>
        </div>
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
            {isLoggedIn ? <UserName /> : <FontAwesomeIcon icon={faUser} />}
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
              onClick={isLoggedIn ? onLogout : onLoginButtonClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

//при клике на человечка переходим в sign in

//
