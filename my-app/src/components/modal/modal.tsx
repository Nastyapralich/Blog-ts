import { FC, ReactElement } from 'react';
import ReactModal from 'react-modal'
import style from './modal.module.scss'

type ModalProps = {
    isOpened: boolean;
    onClose: () => void;
    children: ReactElement | ReactElement[];
}

const Modal: FC<ModalProps> = ({isOpened, onClose, children}) =>{
    return <ReactModal className={style.containerModal}isOpen={isOpened} onRequestClose={onClose}>{children}</ReactModal>
}

export default Modal