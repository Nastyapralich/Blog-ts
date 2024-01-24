import { all, takeLatest, call, take, put } from "redux-saga/effects";
import {
  activateUser,
  getUserInfo,
  logOutUser,
  setAccessToken,
  setUserInfo,
  signInUser,
  signUpUser,
} from "../reducers/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  SignUpUserPayload,
  SignUpResponseData,
  ActivateUserPayload,
  UserInfoResponse,
  SignInUserPayload,
  SignInUserResponse,
} from "../@types";
import { ApiResponse } from "apisauce";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../utils/constants";
import callCheckingAuth from "./helpers/callChecking";

function* signUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;

  const response: ApiResponse<SignUpResponseData> = yield call(
    API.signUpUser,
    data
  );
  if (response.ok && response.data) {
    callback();
  } else {
    console.error("Sign Up User error", response.problem);
  }
}

function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<undefined> = yield call(API.activateUser, data);
  if (response.ok) {
    callback();
  } else {
    console.error("Activate user error", response.problem);
  }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<SignInUserResponse> = yield call(
    API.createToken,
    data
  );
  if (response.ok && response.data) {
    yield put(setAccessToken(response.data.access));
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
    callback();
  } else {
    console.error("Sign In error", response.problem);
  }
}

function* userInfoWorker() {
  console.log(1111);

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  console.log(accessToken);

  if (accessToken) {
    const response: ApiResponse<UserInfoResponse> = yield call(
      API.getUserInfo,
      accessToken
    );

    if (response.ok && response.data) {
      yield put(setUserInfo(response.data));
      console.log(response.data);
    } else {
      console.error("Get User Info error", response.problem);
    }
  }
}

function* logOutWorker() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  yield put(setAccessToken(""));
}

export default function* authSaga() {
  //Watcher
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(getUserInfo, userInfoWorker),
    takeLatest(logOutUser, logOutWorker),
  ]);
}
