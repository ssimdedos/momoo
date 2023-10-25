const {Router} = require('express');
const db = require('../database/pool');
const fetch = require('node-fetch');
const router = Router();


router.get('/', (req, res)=> {
  res.send('api get request');
});

router.get('/getgalleryinfo', async(req, res)=> {
  const g_info = await db.query(`SELECT * FROM gallery_on_mon`);
  data = JSON.stringify(g_info[0]);
  res.send(data);
});

router.get('/getmapquiz', async(req, res)=> {
  let g_info = await db.query(`SELECT * FROM gallery_on_mon`);
  g_info = g_info[0];
  let randomIndexArray = [];
  let randomIndexArray2 = [];
  let quizArr = {};
  
  for (let i=0; i<5; i++) {
    const rannum = Math.floor(Math.random()* g_info.length);
    let examples = [];
    if (randomIndexArray.indexOf(rannum) === -1) {
      randomIndexArray.push(rannum);
      for (let j=0; j<4; j++) {
        let ran = Math.floor(Math.random()* g_info.length);
        if(randomIndexArray2.indexOf(ran) === -1) {
          if (ran === rannum) j--
          else {
            randomIndexArray2.push(ran);
            // console.log(ran);
            examples.push(g_info[ran].gallery_name);
          }
        } else {
          j--
        }
      }
      quizArr[`${i+1}`] = {'lat':g_info[rannum].latitude, 'long':g_info[rannum].longitude, 'answer':g_info[rannum].gallery_name, examples};
      // console.log(quizArr[`${i+1}`]['answer']);
      quizArr[`${i+1}`]['examples'].splice(Math.floor(Math.random()*examples.length),0,quizArr[`${i+1}`]['answer']);
    } else {
      i--
    }
  }
  // console.log(quizArr);
  res.json(JSON.stringify(quizArr));
});

router.post('/createPost', async(req, res)=> {
  const title = req.query.title;
  const contents = req.query.contents;
  const user_id = req.query.user_id;
  // console.log(title, contents);
  const db_res = await db.query(`INSERT INTO posts(post_title, post_body, user_id) VALUES('${title}', '${contents}', '${user_id}')`);
  // console.log(db_res);
  if(db_res[0].serverStatus == 2){
    data = JSON.stringify({'result': 'complete!'});
    res.send(data);
  } else {
    // console.log(db_res);
    res.status = 500;
    res.send({'result': 'fail'});
  }
});

router.get('/getAllPosts', async(req, res) => {
  const posts = await db.query(`SELECT p.*, u.user_name FROM posts p join users u on p.user_id = u.user_id ORDER BY p.post_id DESC`);
  data = JSON.stringify(posts[0]);
  // console.log(data);
  res.send(data);
});



module.exports = router;