import css from './ImageModal.module.css';
import ReactModal from 'react-modal';
import { AiTwotoneCloseCircle } from "react-icons/ai";
import FetchedImage from '../../types';
import { FC } from 'react';

interface ImageModalProps {
    isOpen:boolean;
    onRequestClose: () => void;
    image: FetchedImage | null;
}

export const ImageModal: FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => {
    return (<ReactModal isOpen={isOpen}
        onRequestClose={onRequestClose}
        closeTimeoutMS={300}
        style={
            {
                overlay: { backgroundColor: 'rgba(161, 138, 186, 0.5)', }, content: {
                    maxWidth: '600px',
                    maxHeight: '90vh', top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)',
                }
            }}
        ariaHideApp={true}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}>
        {image && (
            <div className={css.container}>
                <button className={css.closeBtn} onClick={onRequestClose}><AiTwotoneCloseCircle /></button>
                <img
                    src={image.urls.regular}
                    alt={image.alt_description}
                    className={css.image}
                />
                <div className={css.info}>
                    {image.description && (
                        <p>
                            <strong>Description:</strong> {image.description}
                        </p>
                    )}
                    {image.likes !== undefined && (
                        <p>
                            <strong>Likes:</strong> {image.likes}
                        </p>
                    )}
                </div>
            </div>
        )}
    </ReactModal>);
};
