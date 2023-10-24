import { useCookies } from 'react-cookie';
import './header.css';
import logo192 from 'assets/icons/logo192.png';
import {Link, useNavigate} from 'react-router-dom'

const Header = ({isLogin})=> {
  const [,,removeCookie] = useCookies(["naver_access"]);
  const navigate = useNavigate()
  const logout = ()=> {
    if(window.confirm('로그아웃 하시겠습니까?')) {
      removeCookie('naver_access');
      navigate('/');
      window.location.reload();
    }
  };


  return (
  <header className='header' >
      <a className="logo" href="/">
        <img src={logo192} alt='로고였던 것' />
        <div className='brand-name' >
          <h1>Monday Mood</h1>
        </div>
      </a>
      <nav>
        <ul className="nav-items">
          <li><Link to="/" >Home</Link></li>
          <li><Link to="/board" >자유게시판</Link></li>
          <li><Link to="/moodquiz" >Mood 퀴즈</Link></li>
          {isLogin? <li><button className='rm-btn-style logout-btn' onClick={logout} >로그아웃</button></li> : <li><Link to="/login" >로그인</Link></li>}
        </ul>
      </nav>
  </header>
  );
};

export default Header;
