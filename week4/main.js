const express = require("express");
const app = express();
const fs = require("fs");
const template = require("./lib/template");
const sanitizeHtml = require("sanitize-html");
const path = require("path");
const qs = require("querystring");
const compression = require("compression");

const myLogger = (req, res, next) => {
  console.log("LOGGED");
  next();
};

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

app.get('/:id', (req,res,next) => {
  if (req.params.id === '123') {
    console.log(req.params.id);
    next()
  } else {
    next('route');
  }
}, (req,res) => {
  res.send(req.params.id + '2번째 미들웨어');
});

app.get('/:id', (req,res) => {
  res.send("다른 미들웨어");
})

// app.get("/", (request, response) => {
//   const { list: filelist } = request;
//   var title = "Welcome";
//   var description = "Hello, Node.js";
//   var list = template.list(filelist);
//   var html = template.HTML(
//     title,
//     list,
//     `<h2>${title}</h2><p>${description}</p>`,
//     `<a href="/create">create</a>`
//   );
//   response.status(200).send(html);
// });

// app.get("/page/:pageId", (request, response) => {
//   const {
//     list: filelist,
//     params: { pageId },
//   } = request;
//   var filteredId = path.parse(pageId).base;
//   fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
//     var title = pageId;
//     var sanitizedTitle = sanitizeHtml(title);
//     var sanitizedDescription = sanitizeHtml(description, {
//       allowedTags: ["h1"],
//     });
//     var list = template.list(filelist);
//     var html = template.HTML(
//       sanitizedTitle,
//       list,
//       `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
//       `<a href="/create">create</a>
//             <a href="/update/${sanitizedTitle}">update</a>
//             <form action="/delete" method="post">
//                 <input type="hidden" name="id" value="${sanitizedTitle}">
//                 <input type="submit" value="delete">
//             </form>`
//     );
//     response.writeHead(200);
//     response.end(html);
//   });
// });

// app.get("/create", (request, response) => {
//   const { list: filelist } = request;
//   var title = "WEB - create";
//   var list = template.list(filelist);
//   var html = template.HTML(
//     title,
//     list,
//     `
//           <form action="/create" method="post">
//               <p><input type="text" name="title" placeholder="title"></p>
//               <p>
//                   <textarea name="description" placeholder="description"></textarea>
//               </p>
//               <p>
//                   <input type="submit">
//               </p>
//           </form>
//       `,
//     ""
//   );
//   response.status(200).send(html);
// });

// app.post("/create", (request, response) => {
//   const { body: post } = request;
//   var title = post.title;
//   var description = post.description;
//   fs.writeFile(`data/${title}`, description, "utf8", function (err) {
//     response.writeHead(302, { Location: `/?id=${title}` });
//     response.end();
//   });
// });

// app.get("/update/:pageId", (request, response) => {
//   const {
//     params: { pageId },
//     list: filelist,
//   } = request;
//   var filteredId = path.parse(pageId).base;
//   fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
//     var title = filteredId;
//     var list = template.list(filelist);
//     var html = template.HTML(
//       title,
//       list,
//       `
//             <form action="/update" method="post">
//                 <input type="hidden" name="id" value="${title}">
//                 <p><input type="text" name="title" placeholder="title" value="${title}"></p>
//                 <p>
//                     <textarea name="description" placeholder="description">${description}</textarea>
//                 </p>
//                 <p>
//                     <input type="submit">
//                 </p>
//             </form>
//             `,
//       `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
//     );
//     response.status(200).send(html);
//   });
// });

// app.post("/update", (request, response) => {
//   const { body: post } = request;
//   fs.rename(`./data/${post.id}`, `./data/${post.title}`, (error) => {
//     fs.writeFile(`./data/${post.title}`, post.description, (err) => {
//       response.redirect(`/page/${post.title}`);
//     });
//   });
// });

// app.post("/delete", (request, response) => {
//   const { body: post } = request;
//   var id = post.id;
//   var filteredId = path.parse(id).base;
//   fs.unlink(`data/${filteredId}`, function (error) {
//     response.redirect("/");
//   });
// });

app.listen(3000, () => console.log("Example app listening on port 3000"));