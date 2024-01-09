import { FC, ReactElement } from 'react';
import ReactModal from 'react-modal'

type ModalProps = {
    isOpened: boolean;
    onClose: () => void;
    children: ReactElement | ReactElement[];
}

const Modal: FC<ModalProps> = ({isOpened, onClose, children}) =>{
    return <ReactModal isOpen={isOpened} onRequestClose={onClose}>{children}</ReactModal>
}

export default Modal