import { all, takeLatest, call, take } from "redux-saga/effects";
import { activateUser, signUpUser } from "../reducers/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  SignUpUserPayload,
  SignUpResponseData,
  ActivateUserPayload,
} from "../@types";
import { ApiResponse } from "apisauce";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

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

export default function* authSaga() {
  //Watcher
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
  ]);
}
