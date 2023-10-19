import React, { useEffect, useState } from "react";
import "./table.css";
import { getAllPosts } from "services/BoardService";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const BoardTable = () => {
  const [postData, setPostData] = useState({});
  const [cookies] = useCookies("naver_access");

  const navigate = useNavigate();
  const loadPosts = async () => {
    const posts = await getAllPosts();
    setPostData(posts);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const linktopost = (data) => {
    if(cookies.naver_access !== undefined) {
      navigate('/post', {state: data});
    } else {
      alert('로그인이 필요합니다');
    }
    // console.log(data);
  }

  return (
    <table id="post-table">
      <thead>
        <tr>
          <th scope="column" className="th-num" >no</th>
          <th scope="column" className="th-title" >제목</th>
          <th scope="column" className="th-writer">작성자</th>
          <th scope="column" className="th-date" >등록일</th>
        </tr>
      </thead>
      <tbody>
        {postData.length > 0
          ? postData.map((e) => {
              return (
                <tr key={e.post_id}>
                  <td className="td-num" >{e.post_id}</td>
                  <td className="td-title" ><button className="rm-btn-style" onClick={()=> {linktopost(e)}}>{e.post_title}</button></td>
                  <td className="td-writer" >{e.user_name}</td>
                  <td className="td-date" >{e.post_date}</td>
                </tr>
              );
            })
          : <tr><td>표시할 게시글이 없습니다.</td></tr>}
      </tbody>
    </table>
  );
};

export default BoardTable;
