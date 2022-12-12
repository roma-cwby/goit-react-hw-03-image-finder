const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30798635-fb0e0813d5f318e7401c3a1d6';

export async function fetchImg(q, page) {
  const images = await fetch(
    `${BASE_URL}?q=${q}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(data => data.json());
  return images.hits;
}
