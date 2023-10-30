const {Router} = require('express');
const fetch = require('node-fetch');
const os = require('os');
const { login_check } = require('../service/loginService');
const db = require('../database/pool');
require('dotenv').config();
const router = Router();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
let state = "COOL";
const redirectURI = encodeURI(process.env.NAVER_CALLBACK_URL);
let api_url = "";
// 네이버 로그인 로고 표출
router.get('/naverlogin', function (req, res) {
  // console.log('들어옴');
  api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
});


// 네이버 정보 불러오기
router.get('/oauthnaver', async function (req, res) {
  // console.log('로그인 버튼 클릭');
  code = req.query.code;
  state = req.query.state;
  // console.log(code);
  // console.log(state);
  api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
  + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
  const token_req = await fetch(api_url, {
    method: 'GET',
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
  });
  //  console.log(await token_req.json());
  const token_data = await token_req.json();
  if(token_data.access_token) {
    //  console.log(os.platform());
    let token_for = 'Bearer';
    if(os.platform() === 'darwin') {
      token_for = 'MAC';
    }
    const token = token_data.access_token;
    const header = 'Bearer ' + token;
    const userDataRaw = await fetch('https://openapi.naver.com/v1/nid/me', {
      method: "GET",
      headers: {
        Authorization: header,
      },
    });
    const userData = await userDataRaw.json();
    // console.log(userData.response);

    const check_res = await login_check(userData.response);
    // console.log(check_res);
    if(check_res.status ==1) {
      console.log('쿠키 굽는 중');
      res.cookie(
        "naver_access",
        {...userData, access_token: token},
        {
          maxAge: 100000000,
        }
      )
      if(os.platform() === 'darwin') res.redirect("http://192.168.0.25:3000");
      else res.redirect("http://localhost:3000");
    }
   }
});


router.post('/loginCheck', async (req, res)=> {
  // console.log(req.query);
  const user_id = req.query.id;
  try{
    const check_res = await db.query(`SELECT * FROM users WHERE user_id='${user_id}'`);
    // console.log(check_res[0][0].user_id == user_id);
    if(check_res[0][0].user_id == user_id) {
      res.send({'msg': 'logined'});
    }
  } catch(e) {
    res.send({'msg': e});
  }
});



module.exports = router;