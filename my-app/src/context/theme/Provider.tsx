import { FC, ReactElement } from "react"
import React from "react";
import ThemeContext from "./context"
import { Theme } from "../../@types";

interface ThemeProviderProps{
    children : ReactElement | ReactElement[];
    themeValue: Theme;
    onChangeTheme: (value: Theme) => void
}

const ThemeProvider: FC<ThemeProviderProps> = ({
    children,
    themeValue,
    onChangeTheme
}) =>{
    return <ThemeContext.Provider value={
        {themeValue, 
        onChangeTheme}
    }>{children}</ThemeContext.Provider>
}

export default ThemeProvider