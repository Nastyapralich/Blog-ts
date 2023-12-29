import classNames from "classnames";
import style from "./card.module.scss";
import { faBookmark, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from "../../context/theme/context";
import { Theme } from "../../@types";


export enum PostCardSize{
    large = 'large',
    medium = 'medium',
    small = 'small'
}

interface PostCardProps {
    id: number;
    image: string;
    text?: string;
    date: string;
    lesson_num: number;
    title: string;
    author?: number;
    size: PostCardSize;
  };

const PostCard = (props: PostCardProps) => {

  const {themeValue} = useThemeContext();

    const cardStyle = style[props.size] 
    return (
        <div className={classNames(cardStyle)}>
  <div className={classNames(style.content)}>
<div className={classNames(style.textWrap)}>
<span className={classNames(style.date, {[style.dateDark] : themeValue === Theme.Dark})}>{props.date}</span>
<div className={classNames(style.titleText, {[style.titleTextDark] : themeValue === Theme.Dark})}>{props.title}</div>
<div className={classNames(style.mainTextWrap, {[style.mainTextWrapDark] : themeValue === Theme.Dark})}>
{ props.size === 'large' && <p className={classNames(style.mainText)}>{props.text}</p>}
</div>
</div>
<div className={classNames(style.imgWrap)}>
<img src={props.image} alt="Post-Image" />
</div>
  </div>
  <div className={classNames(style.iconsWrap)}>
<div className={classNames(style.icons)}>
    <span className={classNames(style.likeIcon, style.icon) }><FontAwesomeIcon icon={faThumbsUp} /></span>
    <span className={classNames(style.dislikeIcon, style.icon)}><FontAwesomeIcon icon={faThumbsUp} rotation={180} /></span>
</div>
<div className={classNames(style.icons)}>
    <span className={classNames(style.iconBookmark, style.icon)}><FontAwesomeIcon icon={faBookmark} /></span>
    <span className={classNames(style.iconHorizontal, style.icon)}><FontAwesomeIcon icon={faEllipsisVertical} rotation={90} /></span>
</div>
  </div>
        </div>
    )
    }

export default PostCard


