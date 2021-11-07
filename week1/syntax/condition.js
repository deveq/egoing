var args = process.argv;

console.log("A");
console.log("B");
console.log(typeof args[2]);
if (args[2] == "1") {
  console.log("C1");
} else {
  console.log("C2");
}
console.log("D");
