import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LikeStatus, Post, PostsList, Theme } from "../../@types";
import { RootState } from "../store";
import { stat } from "fs";

type InitialState = {
  isSelectedModalOpen: boolean;
  selectedPost: Post | null;
  likedPosts: PostsList;
  dislikedPosts: PostsList
};

const initialState: InitialState = {
  isSelectedModalOpen: false,
  selectedPost: null,
  likedPosts: [],
  dislikedPosts: []
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
    setLikeStatus: (state, action: PayloadAction<{card: Post, status: LikeStatus}>) =>{
    const {card, status} = action.payload;
    const likedIndex = state.likedPosts.findIndex((item) => item.id === card.id); //проверяем есть ли карточка в списке лайкнутых постов, как основной ключ
    const dislikedIndex = state.dislikedPosts.findIndex((item) => item.id === card.id);
    const isLike = status === LikeStatus.Like;
    const mainKey = isLike ? 'likedPosts' : 'dislikedPosts'; // в нужный массив положить, либо из нужного массива убрать
    const secondaryKey = isLike ? 'dislikedPosts' : 'likedPosts';
    const mainIndex = isLike ? likedIndex : dislikedIndex;
    const secondaryIndex = isLike ? dislikedIndex : likedIndex;
    if (mainIndex === -1){ //если карточки нет, то пушим в массив карточку
      state[mainKey].push(card)
    } else{
      state[mainKey].splice(mainIndex, 1) //либо поставили лайк, либо убрали
    }
    if(secondaryIndex > -1){
      state[secondaryKey].splice(secondaryIndex, 1)
    }
  }
  },
});

export const { setSelectedPostModalOpened, setSelectedPost, setLikeStatus } =
  PostSlice.actions;

export const PostSelectors = {
  getSelectedPostModalOpened: (state: RootState) =>
    state.postReducer.isSelectedModalOpen,
  getSelectedPost: (state: RootState) => state.postReducer.selectedPost,
  getLikedPosts: (state: RootState) => state.postReducer.likedPosts,
  getDislikedPosts: (state: RootState) => state.postReducer.dislikedPosts
};

export default PostSlice.reducer;