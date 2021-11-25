const express = require("express");
const app = express();
const fs = require("fs");
const compression = require("compression");
const topicRouter = require('./routes/topic');
const indexRouter = require('./routes/index');
const helmet = require('helmet');

// helmet : 보안 미들웨어
app.use(helmet());

app.use(express.static('public'));
// body-parser는 deprecated되었으므로 express 내장 미들웨어를 사용해야함
// application/x-www-form-urlencoded를 파싱함
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.get('*',(req, res, next) => {
  fs.readdir("./data", (error, filelist) => {
    req.list = filelist;
    next();
  });
});
// application/json을 파싱함
app.use(express.json());

app.use('/topic', topicRouter)
app.use('/',indexRouter);

app.use((req,res,next) => {
  res.status(404).send('Sorry cant find that!')
})

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('something broke!');
})

app.listen(3000, () => console.log("Example app listening on port 3000"));