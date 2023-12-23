import classNames from 'classnames';
import Title from '../../components/title';
import style from './selectedPost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

interface SelectedPostProps{
    id: number;
    title: string;
    image: string;
    text: string;
}

const SelectedPost = (props:SelectedPostProps) =>{
    return(
        <div className={style.selectedPostContainer}>
<div className={style.breadcrumbs}>
<span className={style.link}>Home&nbsp;</span>
        <span>| Post {props.id}</span>
</div>
<Title content={props.title} />
<div className={style.postImg}>
    <img src={props.image} alt="SelectedPostImage" />
</div>
<div className={style.selectedPostText}>
    <p className={style.text}>{props.text}</p>
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

export default SelectedPost;