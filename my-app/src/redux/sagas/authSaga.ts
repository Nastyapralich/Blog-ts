import { all, takeLatest, call, take, put } from "redux-saga/effects";
import { activateUser, getUserInfo, setAccessToken, setUserInfo, signInUser, signUpUser } from "../reducers/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  SignUpUserPayload,
  SignUpResponseData,
  SignInUserPayload,
  SignInResponse,
  UserInfoResponse,
  ActivateUserPayload
} from "../@types";
import { ApiResponse } from "apisauce";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../utils/constants";

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
    console.error("Activate User error", response.problem);
  }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
  //сначала создаем воркера
  const { data, callback } = action.payload;
  const response: ApiResponse<SignInResponse> = yield call(API.createToken, data);
  if (response.ok && response.data) {
    yield put(setAccessToken(response.data.access));
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access)
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh)
    callback();
  } else {
    console.error("Sign In User Error", response.problem);
  }
}


function* userInfoWorker() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
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


export default function* authSaga() {
  //Watcher
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(getUserInfo, userInfoWorker)
  ]);
}
