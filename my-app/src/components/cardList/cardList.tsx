import classNames from "classnames";
import { Post, PostsList, Theme } from "../../@types";
import PostCard, { PostCardSize } from "../postCard/card";
import style from "./cardList.module.scss";
import { useThemeContext } from "../../context/theme/context";
import { useDispatch } from "react-redux";
import { setSelectedPost, setSelectedPostModalOpened } from "../../redux/reducers/postSlice";

interface CardListProps {
  cardsList: PostsList;
  onMoreClick? : (post:Post) => void
}

const CardList = (props: CardListProps) => {
  const dispatch = useDispatch();
  const onMoreClick = (post:Post) => () => {
dispatch(setSelectedPostModalOpened(true))
dispatch(setSelectedPost(post))
  }
  const { themeValue } = useThemeContext();

  return props.cardsList.length ? (
    <div
      className={classNames(style.cardListContainer, {
        [style.darkCardListContainer]: themeValue === Theme.Dark,
      })}
    >
      <div className={style.bigandmedium}>
        <div className={style.mediumContainer}>
          <PostCard size={PostCardSize.large} {...props.cardsList[0]} onMoreClick={onMoreClick(props.cardsList[0])} />
          <div className={style.mediumContainer}>
            {props.cardsList.map((element, index) => {
              if (index > 0 && index < 5) {
                return (
                  <PostCard
                    key={index}
                    size={PostCardSize.medium}
                    {...element}
                    onMoreClick={onMoreClick(element)}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>

      <div>
        {props.cardsList.map((element, index) => {
          if (index > 4 && index < 11) {
            return (
              <PostCard key={index} size={PostCardSize.small} {...element}  onMoreClick={onMoreClick(element)} />
            );
          }
        })}
      </div>
    </div>
  ) : null;
};

export default CardList;
