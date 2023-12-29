import React from "react";
import { useState } from "react";
import { Theme } from "./@types";
import ThemeProvider from "./context/theme/Provider";
import Router from "./pages/router";
import Header from "./components/header/header";
// import Router from "./pages/router";



function App() {


  const [themeValue, setThemeValue] = useState<Theme>(Theme.Light)


  const onChangeTheme = (value: Theme) =>{
    setThemeValue(value)
  }

return(
<ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme} >
{/* <Header /> */}
<Router />
</ThemeProvider>
)
}

export default App;
