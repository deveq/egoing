var fs = require('fs');

// readFileSync

// console.log('a')
// var result = fs.readFileSync('./sample.txt', 'utf8');
// console.log('result', result);
// console.log('c');


// readFile
console.log('a');
fs.readFile('./sample.txt', 'utf8', function(err, data) {
  console.log('result', data);
})
console.log('c');