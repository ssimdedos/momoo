import axios from "axios";

export async function authCheck(id) {
  const params = {id}
  const res = await axios.post('/auth/loginCheck', {}, {params});
  // console.log(res.data);
  return res.data.msg
}