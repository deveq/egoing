var v = 'v';
function f() {
  console.log(this.v);
}

module.exports = {
  v : v,
  f : f
}