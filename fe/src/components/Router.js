import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import "./layout/layout.css";
import Header from './layout/Header';
import Footer from './layout/Footer';
import Main from '../routes/Main';
import Board from '../routes/Board/Board';
import CreatePost from 'routes/Board/CreatePost';
import Post from './Board/Post';
import LoginPage from 'routes/Login/Login';
import axios from 'axios';
import { authCheck } from 'services/AuthService';

const AppRouter = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies] = useCookies(["naver_access"]);



  useEffect(()=> {
    if(cookies.naver_access !== undefined) {
      authCheck(cookies.naver_access.response.id).then((e)=> {
        if(e ==='logined') {
          setIsLogin(true);
        }
      });
    }
    // console.log(cookies.naver_access.response);
  },[]);

  return (
    <Router>
      <Header isLogin={isLogin}/>
      <div className='container'>
      <Routes>
          <>
            <Route path='/' element={<Main />} />
            <Route path='/board' element={<Board />} />
            <Route path='/posting' element={<CreatePost />} />
            <Route path='/post' element={<Post />} />
            <Route path='/login' element={<LoginPage />} />
          </>
      </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRouter;