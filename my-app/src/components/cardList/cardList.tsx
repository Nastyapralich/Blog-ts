import classNames from "classnames";
import { PostsList, Theme } from "../../@types";
import PostCard, { PostCardSize } from "../postCard/card";
import style from "./cardList.module.scss";
import { useThemeContext } from "../../context/theme/context";

interface CardListProps {
  cardsList: PostsList;
}

const CardList = (props: CardListProps) => {
const {themeValue} = useThemeContext()

  return props.cardsList.length ? (
    <div className={classNames(style.cardListContainer, {[style.darkCardListContainer] : themeValue === Theme.Dark})}>
        <div className={style.bigandmedium}>
        <div className={style.mediumContainer}> 
 <PostCard size={PostCardSize.large} {...props.cardsList[0]} />
 <div className={style.mediumContainer}>
    {props.cardsList.map((element, index) => {
        if (index > 0 && index < 5) {
          return <PostCard key={index} size={PostCardSize.medium} {...element} />;
        }
    })}
 </div>
      
        </div>
     
        </div>

<div>
      {props.cardsList.map((element, index) => {
            if( index > 4 && index < 11){
            return <PostCard key={index} size={PostCardSize.small} {...element} />;
        }})}
</div>
      
    </div>
  ) : null;
};

export default CardList;
