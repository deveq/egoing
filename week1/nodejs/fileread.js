// fs 모듈을 사용하겠다는 의미
// fs를 통해 파일을다루는 여러가지 기능을 사용할 수 있다.
var fs = require("fs");

// readFile(경로, 인코딩, 콜백)
fs.readFile(__dirname + "/sample.txt", "utf8", function (err, data) {
  // fs.readFile("sample.txt", "utf8", function (err, data) {
  console.log(data);
});
