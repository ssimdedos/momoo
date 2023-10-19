import axios from "axios";
import React, { useEffect } from "react";

const LoginPage = ()=> {
  const login = async()=> {
    // console.log('버튼눌림');
    const res = await axios.get('/auth/naverlogin');
    if(res.status === 200) {
      document.querySelector('#login-btn').innerHTML = res.data;
    }
    // console.log(res.data);
  }

  useEffect(()=> {
    login();
  }, []);

  return(
    <div>
      <table>
        <tbody>
        <tr>
          <td>아이디</td>
          <td><input type="text"></input></td>
        </tr>
        <tr>
          <td>비밀번호</td>
          <td><input type="text"></input></td>
        </tr>
        </tbody>
      </table>
      <ul>
        <li id="login-btn" ></li>
      </ul>
    </div>
  )
};

export default LoginPage;