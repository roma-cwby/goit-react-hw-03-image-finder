export const ImageGalleryItem = ({ img }) => {
  return (
    <li className="ImageGalleryItem" id={img.id}>
      <img
        className="ImageGalleryItem-image"
        src={img.webformatURL}
        alt={img.tags}
      />
    </li>
  );
};
