import { PostsList } from "../../@types";
import PostCard, { PostCardSize } from "../postCard/card";
import style from "./cardList.module.scss";

interface CardListProps {
  cardsList: PostsList;
}

const CardList = (props: CardListProps) => {
  return props.cardsList.length ? (
    <div className={style.cardListContainer}>
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
