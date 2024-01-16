import { PayloadAction } from "@reduxjs/toolkit";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { PostData } from "../@types";
import {
  getAllPosts,
  getSinglePost,
  setAllPosts,
  setSinglePost,
} from "../reducers/postSlice";
import { ApiResponse } from "apisauce";
import API from "../../utils/api";
import { Post } from "../../@types";

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

export default function* postsSagaWatcher() {
  yield all([
    takeLatest(getAllPosts, postWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
  ]);
}
