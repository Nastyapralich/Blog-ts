import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ActivateUserPayload, SignUpUserPayload } from "../@types";

type InitialState = {

};

const initialState: InitialState = {

};

const AuthSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser:(state, action: PayloadAction<SignUpUserPayload>) => {},
    activateUser:(state, action: PayloadAction<ActivateUserPayload>) => {}
  },
});

export const { signUpUser, activateUser, signInUser, setAccessToken, getUserInfo, setUserInfo } =
  AuthSlice.actions;

export const AuthSelectors = {}

export default AuthSlice.reducer;