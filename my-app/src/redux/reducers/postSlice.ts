import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post, Theme } from "../../@types";
import { RootState } from "../store";

type InitialState = {
  isSelectedModalOpen: boolean;
  selectedPost: Post | null;
};

const initialState: InitialState = {
  isSelectedModalOpen: false,
  selectedPost: null,
};

const PostSlice = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    setSelectedPostModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isSelectedModalOpen = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setSelectedPostModalOpened, setSelectedPost } =
  PostSlice.actions;

export const PostSelectors = {
  getSelectedPostModalOpened: (state: RootState) =>
    state.postReducer.isSelectedModalOpen,
  getSelectedPost: (state: RootState) => state.postReducer.selectedPost,
};

export default PostSlice.reducer;
