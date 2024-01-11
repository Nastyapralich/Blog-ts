import { useDispatch, useSelector } from "react-redux"
import Modal from "../../../components/modal/modal"
import PostCard from "../../../components/postCard/card"
import { ImageSelectors, setSelectedImage, setSelectedImageOpened } from "../../../redux/reducers/imageSlice"
import style from './selectedImageModal.module.scss'

const SelectedImageModal = () =>{
    const isOpened = useSelector(ImageSelectors.getSelectedImageOpened);
    const selectedImage = useSelector(ImageSelectors.getSelectedImage);

    const dispatch = useDispatch();

    const onCloseModal = () => {
        dispatch(setSelectedImageOpened(false));
        dispatch(setSelectedImage(" "))
    }
    return(
 <Modal isOpened={isOpened} onClose={onCloseModal}>
    <div className={style.container}>
        <div className={style.selectedImage}>
          <img src={selectedImage} alt="imageFromPost" />
        </div>
      </div>
{/* <img src={selectedImage} alt="SelectedImage" /> */}
 </Modal>
    )
}

export default SelectedImageModal