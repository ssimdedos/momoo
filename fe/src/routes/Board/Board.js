import BoardTable from "components/Board/BoardTable";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import './board.css';


const Board = () => {
  const [cookies] = useCookies("naver_access");
  const navigate = useNavigate();

  const toPost = () => {
    if(cookies.naver_access !== undefined) {
      navigate('/posting');
    } else {
      alert('로그인이 필요합니다');
    }
  }
  return (
    <div className="contents">
      <h1>자유게시판</h1>
      <div id="table-div" >
        <button className="posting-btn btn-dark" onClick={toPost} >글쓰기</button>
        <BoardTable />
      </div>
    </div>
  );
};

export default Board;
