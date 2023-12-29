import { Theme } from "../../@types"
import { useContext } from "react"
import { createContext } from "react";

const initionalValues = {
themeValue : Theme.Light,
onChangeTheme: (_: Theme) => {}
}


const ThemeContext = createContext(initionalValues)
export const useThemeContext = () => useContext(ThemeContext) //содали ф-цию с помощью которой достает что-то из хранилища

export default ThemeContext //создали хранилище