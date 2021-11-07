var fs = require("fs");

// fs.readFile(__dirname + "/sample.txt", (err, data) => {
//   console.log(data);
// });
fs.readFile(__dirname + "/sample.txt", "utf8", function (err, data) {
  // fs.readFile("sample.txt", "utf8", function (err, data) {
  console.log(data);
});
