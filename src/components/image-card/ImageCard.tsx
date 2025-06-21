import { FC } from 'react';
import FetchedImage from '../../types';
import css from './ImageCard.module.css';

interface ImageCardProps {
    image: FetchedImage;
    onImageClick: (item: FetchedImage) => void;
}

export const ImageCard: FC<ImageCardProps>=({image, onImageClick})=>{
    return <div className={css.cardBox} onClick={()=>onImageClick (image)}>
       {image && <img src={image.urls.small} alt={image.alt_description} />}
</div>
};