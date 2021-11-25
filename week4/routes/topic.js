const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const template = require('../lib/template');
const sanitizeHtml = require('sanitize-html');

router.get("/create", (request, response) => {
    const { list: filelist } = request;
    var title = "WEB - create";
    var list = template.list(filelist);
    var html = template.HTML(
      title,
      list,
      `
            <form action="/topic/create" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
        `,
      ""
    );
    response.status(200).send(html);
  });
  
  router.post("/create", (request, response) => {
    const { body: post } = request;
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, "utf8", function (err) {
      response.writeHead(302, { Location: `/?id=${title}` });
      response.end();
    });
  });
  
  
  router.get("/update/:pageId", (request, response) => {
    const {
      params: { pageId },
      list: filelist,
    } = request;
    var filteredId = path.parse(pageId).base;
    fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
      var title = filteredId;
      var list = template.list(filelist);
      var html = template.HTML(
        title,
        list,
        `
              <form action="/topic/update" method="post">
                  <input type="hidden" name="id" value="${title}">
                  <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                  <p>
                      <textarea name="description" placeholder="description">${description}</textarea>
                  </p>
                  <p>
                      <input type="submit">
                  </p>
              </form>
              `,
        `<a href="/topic/create">create</a> <a href="/topic/update?id=${title}">update</a>`
      );
      response.status(200).send(html);
    });
  });
  
  router.post("/update", (request, response) => {
    const { body: post } = request;
    fs.rename(`./data/${post.id}`, `./data/${post.title}`, (error) => {
      fs.writeFile(`./data/${post.title}`, post.description, (err) => {
        response.redirect(`/topic/${post.title}`);
      });
    });
  });
  
  
  router.get("/:pageId", (request, response, next) => {
    const {
      list: filelist,
      params: { pageId },
    } = request;
    var filteredId = path.parse(pageId).base;
    fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
      if (err) return next(err);
      var title = pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ["h1"],
      });
      var list = template.list(filelist);
      var html = template.HTML(
        sanitizedTitle,
        list,
        `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
        `<a href="/topic/create">create</a>
              <a href="/topic/update/${sanitizedTitle}">update</a>
              <form action="/topic/delete" method="post">
                  <input type="hidden" name="id" value="${sanitizedTitle}">
                  <input type="submit" value="delete">
              </form>`
      );
      response.writeHead(200);
      response.end(html);
    });
  });
  
  router.post("/delete", (request, response) => {
    const { body: post } = request;
    var id = post.id;
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function (error) {
      response.redirect("/");
    });
  });

  module.exports = router;