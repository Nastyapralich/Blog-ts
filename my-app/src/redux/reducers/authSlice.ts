import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {ActivateUserPayload, SignInUserPayload, SignUpUserPayload, UserInfoResponse } from "../@types";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

type InitialState = {
accessToken: string,
userInfo: UserInfoResponse | null
};

const initialState: InitialState = {
accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
userInfo: null
};

const AuthSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser:(state, action: PayloadAction<SignUpUserPayload>) => {},
    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},
    signInUser:(_,__:PayloadAction<SignInUserPayload>) => {},
    setAccessToken:(state,action:PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    getUserInfo:(state, action: PayloadAction<undefined>)=>{},
    setUserInfo:(state, action: PayloadAction<UserInfoResponse | null>)=>{
      state.userInfo = action.payload
    }
  },
});

export const { signUpUser, activateUser, signInUser, setAccessToken, getUserInfo, setUserInfo } =
  AuthSlice.actions;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => !!state.authReducer.accessToken,
  getUserInfo : (state: RootState) => state.authReducer.userInfo
}

export default AuthSlice.reducer;