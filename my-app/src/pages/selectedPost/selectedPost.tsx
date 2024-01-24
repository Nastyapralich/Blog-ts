import classNames from "classnames";
import Title from "../../components/title";
import style from "./selectedPost.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostSelectors, getSinglePost } from "../../redux/reducers/postSlice";
import { RoutesList } from "../router";
import Loader from "../../components/loader/loader";

const SelectedPost = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const singlePost = useSelector(PostSelectors.getSinglePost)
  const isSinglePostLoading = useSelector(PostSelectors.getSinglePostLoading)

  const onHomeClick = () =>{
    navigate(RoutesList.AllPosts)
  }

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [id]);

  return  singlePost && !isSinglePostLoading ?(
    <div className={style.selectedPostContainer}>
      <div className={style.breadcrumbs}>
        <span className={style.link} onClick={onHomeClick}>Home;</span>
        <span>| Post {id}</span>
      </div>
      <Title content={singlePost.title} />
      <div className={style.postImg}>
        <img src={singlePost.image} alt="SelectedPostImage" />
      </div>
      <div className={style.selectedPostText}>
        <p className={style.text}>{singlePost.text}</p>
      </div>
      <div className={classNames(style.iconsWrap)}>
        <div className={classNames(style.icons)}>
          <span className={classNames(style.likeIcon, style.icon)}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </span>
          <span className={classNames(style.dislikeIcon, style.icon)}>
            <FontAwesomeIcon icon={faThumbsUp} rotation={180} />
          </span>
        </div>
        <div className={classNames(style.icons)}>
          <span className={classNames(style.iconBookmark, style.icon)}>
            <FontAwesomeIcon icon={faBookmark} />
          </span>
          <span className={classNames(style.iconHorizontal, style.icon)}>
            <FontAwesomeIcon icon={faEllipsisVertical} rotation={90} />
          </span>
        </div>
      </div>
    </div>
  ): (<Loader />);
};

export default SelectedPost;
