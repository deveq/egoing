var http = require("http");
var fs = require("fs");
var url = require("url");

function templateHTML(title, list, body) {
  return `<!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB1 - ${title}</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist) {
  var list = "<ul>";
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + "</ul>";
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      title = "Welcome";
      var description = "Hello, Node.js";
      fs.readdir("../data", function (error, filelist) {
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2<${title}</h2><p>${description}</p>`);

        response.writeHead(200);
        response.write(template);
      });
    } else {
      fs.readdir("../data", function (error, filelist) {
        var list = templateList(filelist);
        fs.readFile(`../data/${queryData.id}`, "utf8", function (err, description) {
          title = queryData.id;

          var template = templateHTML(title, list, `<h2<${title}</h2><p>${description}</p>`);

          response.writeHead(200);
          response.write(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end("not found");
  }
});

app.listen(3000);
