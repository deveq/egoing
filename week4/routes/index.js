const router = require('express').Router();
const template = require('../lib/template')

router.get("/", (request, response) => {
    const { list: filelist } = request;
    var title = "Welcome";
    var description = "Hello, Node.js";
    var list = template.list(filelist);
    var html = template.HTML(
      title,
      list,
      `<h2>${title}</h2><p>${description}</p>
      <span>bbb</span>
      <img src="/images/hello.jpeg" style="width: 300px; margin : 10px; display: block;">
      <span>aaa</span>
      `,
      `<a href="/topic/create">create</a>`
  
    );
    response.status(200).send(html);
  });

module.exports = router;