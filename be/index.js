const express = require('express');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT;


app.use(cors());
app.use(cookieParser());
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname,'public/index.html'));
});


app.listen(port, ()=> {
  console.log(`This app is listening on port http://localhost:${port}`);
});