import { PayloadAction } from "@reduxjs/toolkit";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { PostData, UserInfoResponse } from "../@types";
import {
  getAllPosts,
  getMyPosts,
  getSearchedPosts,
  getSinglePost,
  setAllPosts,
  setMyPosts,
  setSearchedPosts,
  setSinglePost,
  setSinglePostLoading,
} from "../reducers/postSlice";
import { ApiResponse } from "apisauce";
import API from "../../utils/api";
import { Post } from "../../@types";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import { getUserInf, setUserInfo } from "../reducers/authSlice";
import callCheckingAuth from "./helpers/callChecking";

function* postWorker() {
  const response: ApiResponse<PostData> = yield call(API.getPosts);
  if (response.ok && response.data) {
    yield put(setAllPosts(response.data.results));
  } else {
    console.error("Sign Up User error", response.problem);
  }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  yield put(setSinglePostLoading(true));
  const response: ApiResponse<Post> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (response.ok && response.data) {
    yield put(setSinglePost(response.data));
  } else {
    console.error("Singl Post error", response.problem);
  }
  yield put(setSinglePostLoading(false));
}

function* getMyPostsWorker() {
  // const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  // if (accessToken){
  //   const response: ApiResponse<PostData> = yield call(API.getMyPosts, accessToken)
  //   if(response.ok && response.data){
  //     if(response.status === 404){
  //       yield put(setMyPosts([]))
  //     }
  //     yield put(setMyPosts(response.data.results))

  //   }else {
  //     console.error("Get my posts problem", response.problem);
  //   }
  // }
  const response: ApiResponse<PostData> = yield callCheckingAuth(
    API.getMyPosts
  );
  if (response && response?.ok && response?.data) {
    yield put(setMyPosts(response.data.results));
  } else {
    console.error("Get My Posts error", response?.problem);
  }
}

function* getSearchedPostsWorker(action: PayloadAction<string>) {
  const response: ApiResponse<PostData> = yield call(API.getPosts, action.payload );
  if (response.ok && response.data) {
    yield put(setSearchedPosts(response.data.results));
  } else {
    console.error("Search error", response.problem);
  }
}


export default function* postsSagaWatcher() {
  yield all([
    takeLatest(getAllPosts, postWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
    takeLatest(getSearchedPosts, getSearchedPostsWorker)
  ]);
}
