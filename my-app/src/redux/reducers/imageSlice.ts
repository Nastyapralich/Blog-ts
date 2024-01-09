import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post, Theme } from "../../@types";
import { RootState } from "../store";
import { JsxElement } from "typescript";

type InitialState = {
  isSelectedImageOpen: boolean;
  selectedImage: string;
};

const initialState: InitialState = {
    isSelectedImageOpen: false,
    selectedImage:" ",
};

const ImageSlice = createSlice({
  name: "imageReducer",
  initialState,
  reducers: {
    setSelectedImageOpened: (state, action: PayloadAction<boolean>) => {
      state.isSelectedImageOpen = action.payload;
    },
    setSelectedImage: (state, action: PayloadAction<string>) => {
      state.selectedImage = action.payload;
    },
  },
});

export const { setSelectedImageOpened, setSelectedImage } =
  ImageSlice.actions;

export const ImageSelectors = {
  getSelectedImageOpened: (state: RootState) =>
    state.imageReducer.isSelectedImageOpen,
  getSelectedImage: (state: RootState) => state.imageReducer.selectedImage,
};

export default ImageSlice.reducer;