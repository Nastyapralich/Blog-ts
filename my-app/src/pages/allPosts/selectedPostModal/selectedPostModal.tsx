import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/modal/modal";
import postSlice, {
  PostSelectors,
  setSelectedPost,
  setSelectedPostModalOpened,
} from "../../../redux/reducers/postSlice";
import PostCard, { PostCardSize } from "../../../components/postCard/card";

const SelectedPostModal = () => {
  const isOpened = useSelector(PostSelectors.getSelectedPostModalOpened);
  const selectedPost = useSelector(PostSelectors.getSelectedPost);

  const dispatch = useDispatch();

  const onCloseModal = () => {
    dispatch(setSelectedPostModalOpened(false));
    dispatch(setSelectedPost(null));
  };

  
  return selectedPost ? (
    <Modal isOpened={isOpened} onClose={onCloseModal}>
      <PostCard
        size={PostCardSize.large}
        image={selectedPost.image}
        date={selectedPost.date}
        title={selectedPost.title}
        onStatusClick={(_)=>{}}
      />
    </Modal>
  ) : null;
};

export default SelectedPostModal;
