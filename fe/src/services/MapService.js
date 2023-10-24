import axios from 'axios';

export async function getGalleryInfo() {
  const res = await axios.get('/api/getgalleryinfo');
  return res.data;
}

export async function getMapquiz() {
  const res = await axios.get('/api/getmapquiz');
  return res.data;
}