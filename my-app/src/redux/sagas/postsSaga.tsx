import { PayloadAction } from "@reduxjs/toolkit";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { PostData, UserInfoDataResponse } from "../@types";
import {
  getAllPosts,
  getSinglePost,
  setAllPosts,
  setSinglePost,
} from "../reducers/postSlice";
import { ApiResponse } from "apisauce";
import API from "../../utils/api";
import { Post } from "../../@types";
import api from "../../utils/api";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import { getUserInfo, setUserInfo } from "../reducers/authSlice";

function* postWorker() {
  const response: ApiResponse<PostData> = yield call(API.getPosts);
  if (response.ok && response.data) {
    yield put(setAllPosts(response.data.results));
  } else {
    console.error("Sign Up User error", response.problem);
  }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  const response: ApiResponse<Post> = yield call(API.getSinglePost, action.payload);
  if (response.ok && response.data) {
    yield put(setSinglePost(response.data));
  } else {
    console.error("Singl Post error", response.problem);
  }
}

function* getUserInfoWorker() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      const response: ApiResponse<UserInfoDataResponse> = yield call(
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


export default function* postsSagaWatcher() {
  yield all([
    takeLatest(getAllPosts, postWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getUserInfo, getUserInfoWorker)
  ]);
}
