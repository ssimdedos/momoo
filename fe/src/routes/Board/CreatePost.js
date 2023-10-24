import {React, useState} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { createPost } from "services/BoardService";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [cookies] = useCookies("naver_access");
  const navigate = useNavigate();
  
  const sendPost = async () => {
    if(title === '') {
      alert('제목을 입력해주세요');
      return
    } else if(contents === '') {
      alert('내용을 입력해주세요');
      return
    }
    try {
      const user_id = cookies.naver_access.response.id;
      const res = await createPost(title, contents, user_id);
      if(res === 'complete!') {
        alert('등록 완료');
        navigate('/board');
      } else {
        alert(res);
        return;
      }
    } catch(err) {
      alert(err);
    }
  };

  return(
    <div className="contents">
      <h2>게시글 작성</h2>
      <table>
        <tbody>
          <tr>
            <th>
              제목: 
            </th>
            <td>
              <input type="text" onChange={ (e)=> setTitle(e.target.value)} ></input>
            </td>
          </tr>
          <tr>
            <th>
              내용: 
            </th>
          </tr>
          <tr>
            <td></td>
            <td>
              <textarea onChange={(e)=> setContents(e.target.value)} />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" onClick={sendPost}>전송</button>
    </div>
  );
};

export default CreatePost;