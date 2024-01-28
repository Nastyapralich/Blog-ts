import { useNavigate, useParams } from "react-router-dom";
import style from "./search.module.scss";
import { useEffect, useMemo, useState } from "react";
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
import { PER_PAGE } from "../../utils/constants";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "../../components/loader/loader";

const Search = () => {
  const { search } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchedPosts = useSelector(PostSelectors.getSearchedPosts);
  const totalSearchedCount = useSelector(PostSelectors.getTotalSearchedPosts)
  const [currentPage, setCurrentPage] = useState(1);

  // const pagesCount = useMemo((() => Math.ceil()), [totalSearchedCount])

  useEffect(() => {
    if (!search) {
      navigate(RoutesList.AllPosts);
    } else {
      const offset = (currentPage - 1) * PER_PAGE;
      dispatch(getSearchedPosts({ search, offset, isOverwrite:true}));
    }
  }, [dispatch, navigate, search, currentPage]);

  const {
    onStatusClick: onClickStatus,
    onSaveClick,
    onImageClick,
  } = useCardActions();

  const onNextClick = () =>{
    // console.log(selected);
    setCurrentPage(currentPage+1)
     }

  return (
    <div>
      <Title content={`Search results: ${search}`} />
      <div className={style.container}>
        {searchedPosts.length ? (
          <InfiniteScroll
          next={onNextClick}
          scrollThreshold={0.7}
          hasMore={searchedPosts.length < totalSearchedCount}
          loader={<Loader />}
          dataLength={searchedPosts.length}
          scrollableTarget="scrollableDiv"
        >
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
           </InfiniteScroll>
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
