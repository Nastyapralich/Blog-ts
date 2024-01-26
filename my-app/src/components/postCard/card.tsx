import classNames from "classnames";
import style from "./card.module.scss";
import { faBookmark, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from "../../context/theme/context";
import { LikeStatus, Theme } from "../../@types";
import { useSelector } from "react-redux";
import { PostSelectors } from "../../redux/reducers/postSlice";
import { useNavigate } from "react-router-dom";

export enum PostCardSize {
  large = "large",
  medium = "medium",
  small = "small",
  search = "search"
}

type PostCardProps = {
  image: string;
  text?: string;
  date: string;
  title: string;
  size: PostCardSize;
  // onMoreClick?: () => void;
  onImageClick?: () => void;
  onStatusClick: (status: LikeStatus) => void;
  onSaveClick?: () => void;
  id?: number;
};

const PostCard = (props: PostCardProps) => {
  const { themeValue } = useThemeContext();

  const navigate = useNavigate();

  const onTitleClick = () => {
    navigate(`post/${props.id}`);
  };

  const cardStyle = style[props.size];

  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
  const likeIndex = likedPosts.findIndex((item) => item.id === props.id);
  const dislikeIndex = dislikedPosts.findIndex((item) => item.id === props.id);
  const savedPosts = useSelector(PostSelectors.getLikedPosts);
  const savedIndex = savedPosts.findIndex((item) => item.id === props.id);

  return (
    <div className={classNames(cardStyle)}>
      <div className={classNames(style.content)}>
        <div className={classNames(style.textWrap)}>
          <span
            className={classNames(style.date, {
              [style.dateDark]: themeValue === Theme.Dark,
            })}
          >
            {props.date}
          </span>
          <div
            className={classNames(style.titleText, {
              [style.titleTextDark]: themeValue === Theme.Dark,
            })}
            onClick={onTitleClick}
          >
            {props.title}
          </div>
          <div
            className={classNames(style.mainTextWrap, {
              [style.mainTextWrapDark]: themeValue === Theme.Dark,
            })}
          >
            {props.size === "large" && (
              <p className={classNames(style.mainText)}>{props.text}</p>
            )}
          </div>
        </div>
        <div className={classNames(style.imgWrap)}>
          <img
            onClick={props.onImageClick}
            src={props.image}
            alt="Post-Image"
          />
        </div>
      </div>
      <div className={classNames(style.iconsWrap)}>
        <div className={classNames(style.icons)}>
          <div onClick={() => props.onStatusClick(LikeStatus.Like)}>
            <span className={classNames(style.likeIcon, style.icon)}>
              <FontAwesomeIcon icon={faThumbsUp} />
              <span>{likeIndex > -1 && 1}</span>
            </span>
          </div>
          <div onClick={() => props.onStatusClick(LikeStatus.Dislike)}>
            <span className={classNames(style.dislikeIcon, style.icon)}>
              <FontAwesomeIcon icon={faThumbsUp} rotation={180} />
              <span>{dislikeIndex > -1 && 1}</span>
            </span>
          </div>
        </div>
        <div className={classNames(style.icons)}>
          <div onClick={props.onSaveClick}>
            {
              <span
                className={classNames(
                  likeIndex > 1 ? style.iconBookmark : style.bookMark,
                  style.icon
                )}
              >
                <FontAwesomeIcon icon={faBookmark} />
              </span>
            }
          </div>
          {/* {props.onMoreClick ? (
            <span
              onClick={props.onMoreClick}
              className={classNames(style.iconHorizontal, style.icon)}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} rotation={90} />
            </span>
          ): <span
          className={classNames(style.iconHorizontal, style.icon)}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} rotation={90} />
        </span>} */}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
