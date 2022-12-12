import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className="ImageGallery" onClick={onClick}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} img={image} />
      ))}
    </ul>
  );
};
