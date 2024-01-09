import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Theme } from "../../@types";
import { RootState } from "../store";

type InitialState ={
    themeValue: Theme
}

const initialState:InitialState = {
    themeValue: Theme.Light,
}

const ThemeSlice = createSlice({
    name: "themeReducer",
    initialState,
    reducers: {
        setThemeValue:(state, action: PayloadAction<Theme>) =>{
    state.themeValue = action.payload
        }
    },
});

export const {setThemeValue} = ThemeSlice.actions

export const ThemeSelectors ={
getThemeValue: (state: RootState)=>state.themeReducer.themeValue
}

export default ThemeSlice.reducer