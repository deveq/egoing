var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  try {
    // 변수 url에 현재 요청의 주소를 넣음.
    var _url = request.url;
    if (_url === "/favicon.ico") {
      return response.end("");
    }
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    if (_url === "/") {
      // 만약 요청주소가 루트라면 index.html을 넣어주고
      // _url = "/index.html";
      title = "Welcome";
    }

    if (request.url === "/favicon.ico") {
      return response.writeHead(404);
    }

    response.writeHead(200);
    var template = `<!doctype html>
    <html>
    <head>
      <title>WEB1 - HTML</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB1 - ${title}</a></h1>
      <ul>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ul>
      <h2>${title}</h2>
      <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
      <img src="coding.jpg" width="100%">
      </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
      </p>
    </body>
    </html>
    `;
    // 그 외에는 요청주소 그대로 파일을 읽어오게끔함
    response.end(template);
    // response.end(fs.readFileSync(__dirname + _url));
  } catch (error) {
    // response.end(fs.readFileSync(__dirname + "/index.html"));
    response.end("err");
  }
});

app.listen(80);
