import axios from 'axios';

export async function getGalleryInfo() {
  const res = await axios.get('/api/getgalleryinfo');
  return res.data;
}

