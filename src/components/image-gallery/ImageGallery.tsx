import css from './ImageGallery.module.css';
import { FC } from 'react';
import { ImageCard } from '../image-card/ImageCard';
import FetchedImage from '../../types';


interface ImageGalleryProps {
	items: FetchedImage[] ;
	onImageClick: (item: FetchedImage)=> void;
}

export const ImageGallery: FC <ImageGalleryProps> = ({items, onImageClick })=>{
    return (<ul className={css.list}>
		{items.map((item) => (
			<li key={item.id}>
				<ImageCard image={item} onImageClick={onImageClick} />
			</li>))}
		</ul>)

}