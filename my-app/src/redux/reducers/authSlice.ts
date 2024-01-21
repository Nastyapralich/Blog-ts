import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ActivateUserPayload, SignInUserPayload, SignUpUserPayload, UserInfoData } from "../@types";
import { access } from "fs";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

type InitialState = {
accessToken: string;
userInfo: UserInfoData | null
};

const initialState: InitialState = {
accessToken:  localStorage.getItem(ACCESS_TOKEN_KEY) || " ",
userInfo: null
};

const AuthSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser:(state, action: PayloadAction<SignUpUserPayload>) => {},
    activateUser:(state, action: PayloadAction<ActivateUserPayload>) => {},
    signInUser: (_, __: PayloadAction<SignInUserPayload>) => {}, //дейтсвие, которое запрашивает
    setAccessToken:(state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    getUserInfo:(_,__:PayloadAction<undefined>) => {},
    setUserInfo:(state, action: PayloadAction<UserInfoData | null>) =>{
      state.userInfo = action.payload
    }
  },
});

export const { signUpUser, activateUser, signInUser, setAccessToken, getUserInfo, setUserInfo } =
  AuthSlice.actions;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => !!state.authReducer.accessToken,
  setUserInfo: (state: RootState) => state.authReducer.userInfo
}

export default AuthSlice.reducer;