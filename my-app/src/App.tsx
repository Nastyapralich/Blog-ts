import React from "react";
import { useState } from "react";
import { Theme } from "./@types";
import ThemeProvider from "./context/theme/Provider";
import Router from "./pages/router";
import Header from "./components/header/header";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSelectors, setThemeValue } from "./redux/reducers/themeSlice";
import { RootState } from './redux/store'
// import Router from "./pages/router";

function App() {
  // const [themeValue, setThemeValue] = useState<Theme>(Theme.Light);

const dispatch = useDispatch();

//то, что данные из редакса достает
const themeValue = useSelector<RootState>(ThemeSelectors.getThemeValue)


  const onChangeTheme = (value: Theme) => {
    dispatch(setThemeValue(value)); //то, что швыряет в редакс данные
  };

  return (
    <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
      {/* <Header /> */}
      <Router />
    </ThemeProvider>
  );
}

export default App;
