import axios from 'axios';

export async function createPost(title, contents, user_id) {
  // console.log(title, contents);
  const params = {title, contents, user_id};
  // console.log(data);
  const res = await axios.post('/api/createPost',{}, {params});
  // console.log(res.data.result);
  return res.data.result;
}

export async function getAllPosts() {
  const res = await axios.get('/api/getAllPosts');
  // console.log(res.data);
  return res.data;
}

