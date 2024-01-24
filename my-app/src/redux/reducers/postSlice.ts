import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LikeStatus, Post, PostsList, SaveStatus, Theme } from "../../@types";
import { RootState } from "../store";

type InitialState = {
  isSelectedModalOpen: boolean;
  selectedPost: Post | null;
  likedPosts: PostsList;
  dislikedPosts: PostsList;
  savedPosts: PostsList;
  postsList: PostsList;
  singlePost: Post | null;
  singlePostLoading: boolean;
  myPosts: PostsList | null
};

const initialState: InitialState = {
  isSelectedModalOpen: false,
  selectedPost: null,
  likedPosts: [],
  dislikedPosts: [],
  savedPosts: [],
  postsList: [],
  singlePost: null,
  singlePostLoading: false,
  myPosts:  null
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
    setLikeStatus: (
      state,
      action: PayloadAction<{ card: Post; status: LikeStatus }>
    ) => {
      const { card, status } = action.payload;
      const likedIndex = state.likedPosts.findIndex(
        (item) => item.id === card.id
      ); //проверяем есть ли карточка в списке лайкнутых постов, как основной ключ
      const dislikedIndex = state.dislikedPosts.findIndex(
        (item) => item.id === card.id
      );
      const isLike = status === LikeStatus.Like;
      const mainKey = isLike ? "likedPosts" : "dislikedPosts"; // в нужный массив положить, либо из нужного массива убрать
      const secondaryKey = isLike ? "dislikedPosts" : "likedPosts";
      const mainIndex = isLike ? likedIndex : dislikedIndex;
      const secondaryIndex = isLike ? dislikedIndex : likedIndex;
      if (mainIndex === -1) {
        //если карточки нет, то пушим в массив карточку
        state[mainKey].push(card);
      } else {
        state[mainKey].splice(mainIndex, 1); //либо поставили лайк, либо убрали
      }
      if (secondaryIndex > -1) {
        state[secondaryKey].splice(secondaryIndex, 1);
      }
    },

    setSavedPosts: (state, action: PayloadAction<{ card: Post }>) => {
      const { card } = action.payload;
      const savedIndex = state.savedPosts.findIndex(
        (item) => item.id === card.id
      ); //проверяем есть ли сохраненный пост в массиве
      if (savedIndex === -1) {
        //если карточки нет, то пушим в массив карточку
        state.savedPosts.push(card);
      } else {
        state.savedPosts.splice(savedIndex, 1); //либо поставили лайк, либо убрали
      }
    },
    getAllPosts: (_, __: PayloadAction<undefined>) => {}, //сначала получить get пустой
    setAllPosts: (state, action: PayloadAction<PostsList>) => {
      //делаем set action, то что хотим получить и зписать в сагу
      state.postsList = action.payload;
    },
    getSinglePost: (_, __: PayloadAction<string>) => {},
    setSinglePostLoading: (state, action: PayloadAction<boolean>) => {
      state.singlePostLoading = action.payload;
    },
    setSinglePost: (state, action: PayloadAction<Post | null>) => {
      state.singlePost = action.payload;
    },
    getMyPosts:(state, action: PayloadAction<undefined>) => {},
    setMyPosts:(state, action: PayloadAction<PostsList | null>) => {
      state.myPosts = action.payload
    }
  },
});

export const {
  setSelectedPostModalOpened,
  setSelectedPost,
  setLikeStatus,
  setSavedPosts,
  getAllPosts,
  setAllPosts,
  getSinglePost,
  setSinglePost,
  setSinglePostLoading,
  getMyPosts,
  setMyPosts
} = PostSlice.actions;

export const PostSelectors = {
  getSelectedPostModalOpened: (state: RootState) =>
    state.postReducer.isSelectedModalOpen,
  getSelectedPost: (state: RootState) => state.postReducer.selectedPost,
  getLikedPosts: (state: RootState) => state.postReducer.likedPosts,
  getDislikedPosts: (state: RootState) => state.postReducer.dislikedPosts,
  getFavouritePosts: (state: RootState) => state.postReducer.savedPosts,
  getAllPosts: (state: RootState) => state.postReducer.postsList,
  getSinglePost: (state: RootState) => state.postReducer.singlePost,
  getSinglePostLoading: (state: RootState) => state.postReducer.singlePostLoading,
  getMyPosts: (state:RootState) => state.postReducer.myPosts
};

export default PostSlice.reducer;
