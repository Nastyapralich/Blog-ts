import React from "react";
import { useDispatch } from "react-redux";
import { Post, LikeStatus } from "../@types";
import { setLikeStatus, setSavedPosts, setSelectedPost, setSelectedPostModalOpened } from "../redux/reducers/postSlice";
import { setSelectedImageOpened, setSelectedImage } from "../redux/reducers/imageSlice";

const useCardActions = () =>{

    const dispatch = useDispatch()

    const onStatusClick = (card: Post) => (status: LikeStatus) => {
        dispatch(setLikeStatus({ card, status }));
      };
    
      const onSaveClick = (card: Post) => () =>{
        dispatch(setSavedPosts({card}))
      }

      const onMoreClick = (post: Post) => () => {
        dispatch(setSelectedPostModalOpened(true));
        dispatch(setSelectedPost(post));
      };
    
      const onImageClick = (image: string) => () => {
        dispatch(setSelectedImageOpened(true));
        dispatch(setSelectedImage(image));
      };
    
    
return{onStatusClick, onSaveClick, onMoreClick, onImageClick}
}

export default useCardActions