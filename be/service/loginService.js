const db = require('../database/pool');

exports.login_check =  async(data) => {
  // console.log(id);
  const check_res = await db.query(`SELECT * FROM users WHERE user_id='${data.id}'`);
  // console.log(res[0].length);
  let msg = "";
  if(check_res[0].length == 0) {
    try {
      await db.query(`INSERT INTO users(user_id, user_name, user_age, user_email, user_profile) VALUES('${data.id}', '${data.name}', '${data.age}', '${data.email}', '${data.profile_image}')`);
      // 회원가입 후 바로 로그인 시켜줄 지 다시 로그인 시킬 지
      // msg = {'msg': '회원가입 완료', 'login_info': data}
      msg = {'msg': '회원가입 완료', 'status': 0}
    } catch (e) {
      msg = {'error': e}
    }
  } else {
    msg = {'msg': '로그인 완료', 'login_info': check_res[0], 'status': 1}
  }
  return msg
}
