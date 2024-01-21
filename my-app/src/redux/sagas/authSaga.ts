import { all, takeLatest, call, take, put } from "redux-saga/effects";
import { activateUser, setAccessToken, signInUser, signUpUser } from "../reducers/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  SignUpUserPayload,
  SignUpResponseData,
  ActivateUserPayload,
  SignInUserPayload,
  SignInData,
  SignInResponseData,
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
  //сначала создаем воркера
  const { data, callback } = action.payload;
  const response: ApiResponse<undefined> = yield call(API.activateUser, data);
  if (response.ok) {
    callback();
  } else {
    console.error("Activate user error", response.problem);
  }
}

function* acessToken(action: PayloadAction<SignInUserPayload>){ //метод пост
const { data, callback } = action.payload; //делаем деструктуризацию, чтобы вытащить data
const response: ApiResponse<SignInResponseData> = yield call(API.createToken, data);
if (response.ok && response.data) {
  yield put(setAccessToken(response.data.access));
  callback();
  localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access );
  localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh)
} else {
  console.error("Sign In user error", response.problem);
}
}

export default function* authSaga() {
  //Watcher
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(signInUser, acessToken)
  ]);
}
