var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]);

var roles = {
  programmer : 'egoing',
  designer : 'k8805',
  manager : 'hoya'
}

console.log(roles.designer);
console.log(roles['designer']);

//배열에 저장된 데이터 순회

var i = 0;
while(i < members.length) {
  console.log('array loop', members[i]);
  i = i + 1;
}

// 객체에 저장된 데이터 이름 순회

for (var name in roles) {
  // key값 순회
  // console.log('object => ', name);

  // value값 순회
  console.log(roles[name]);
}

console.log('aa',name);