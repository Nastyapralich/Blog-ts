import { useNavigate, useParams } from "react-router-dom";
import style from "./search.module.scss";
import { useEffect } from "react";
import { RoutesList } from "../router";
import { useDispatch, useSelector } from "react-redux";
import {
  PostSelectors,
  getSearchedPosts,
} from "../../redux/reducers/postSlice";
import Title from "../../components/title";
import PostCard, { PostCardSize } from "../../components/postCard/card";
import useCardActions from "../../hooks/useCardActions";
import EmptyState from "../../components/emptyState/emptyState";

const Search = () => {
  const { search } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchedPosts = useSelector(PostSelectors.getSearchedPosts);

  useEffect(() => {
    if (!search) {
      navigate(RoutesList.AllPosts);
    } else {
      dispatch(getSearchedPosts(search));
    }
  }, [search]);

  const {
    onStatusClick: onClickStatus,
    onSaveClick,
    onImageClick,
  } = useCardActions();

  return (
    <div>
      <Title content={`Search results: ${search}`} />
      <div className={style.container}>
        {searchedPosts.length ? (
          <>
            {searchedPosts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  size={PostCardSize.search}
                  onStatusClick={onClickStatus(post)}
                  onSaveClick={onSaveClick(post)}
                  onImageClick={onImageClick(post.image)}
                  // onMoreClick={onClickMore(post)}
                  {...post}
                />
              );
            })}
          </>
        ) : (
          <EmptyState
            title={"Nothimg was found..."}
            description={"Try anither search request"}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
