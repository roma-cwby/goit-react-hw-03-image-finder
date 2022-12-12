export const ImageGalleryItem = ({ img }) => {
  return (
    <li key={img.key}>
      <img src={img.webformatURL} alt={img.tags} />
    </li>
  );
};
