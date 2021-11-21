a# MySQL

기존 코드 중 fs 모듈에서 DB로 변경<br>
Nodejs의 코어에는 mysql관련 모듈이 없으므로 npm을 통해 추가해야함<br>

## 설치 

[mysql-npm](https://www.npmjs.com/package/mysql)

`$ npm i mysql`


## 사용

```js
var mysql = require('mysql');

// 필요한 정보를 object형태로 createConnection의 인수로 전달
var connection = mysql.createConnection({
  host : 'localhost', // DB가 있는 서버 주소
  user : 'root', // 사용자 이름
  password : '111111', // 비번
  database : 'opentutorials' // 접속할 DB 이름

})

connection.connect();

connection.query('select * from topic', (err, results, field) => {
  console.log(Array.isArray(results)); // true
  
})

connection.end(); // 접속 끊기

```

## 에러발생 시 - ER_ACCESS_DENIED_ERROR 

권한이 없어서 발생하는 에러로 mysql.user테이블에 Host와 User를 맞게 등록해줘야함

```sh
mysql > select Host, User from mysql.user;
# Host : 각 사용자가 어떤 IP 주소로 접속해야 접근할 수 있는지
# User : DB에 등록된 사용자 이름

# user는 nodejs로, host는 모든(%)주소에서, 비밀번호는 111111
mysql > create user 'nodejs'@'%' identified by '111111';

# user : nodejs, host : %에게 opentutorials DB에 대한 모든 권한을 줌
mysql > grant all privilleges on opentutorials.* to 'nodejs'@'%';

# grant 명령어로 설정한 권한을 실제 데이터베이스에 적용함
mysql > flush privilleges
```


## 4 - mysql 모듈을 이용한 홈페이지 구현

### 연결 및 질의문 작성 

```js
// main.js
if (pathname === '/') {
  if (queryData.id === undefined) { // 홈(쿼리스트링이 없을떄)

    // 상단에 보여질 li태그(기존의 파일목록)을 작성하기 위해 topic을 받아옴
    db.query(`select * from topic`, (error, topics) => {
      console.log(topics);
      response.writeHead(200);
      response.end('success');
    })
  }
}
```

### DB에 저장된 데이터로 웹페이지 생성

```js
// main.js
db.query('select * from topic', (error, topics) => {
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(topics);
  var html = template.HTML(title, list,
    `<h2>${title}</h2>${description}`,
    `<a href="/create">create</a>`
  );
  response.writeHead(200);
  response.end(html);
})

// li태그가 정상적으로 나오지 않으므로 
// template.js의 list메서드 수정
while(i < topics.length) {
  list += `<li><a href="/?id=${topics[i].id}"><${topics[i].title}</a></li>`;
  i++;
}
```

## 5 - 상세보기 구현

```js
// main.js
if (pathname === '/') {
  
  if (queryData.id === undefined) {
    //....
  } else { // 쿼리스트링이 존재할 경우
    db.query('select * from topic', (error, topics) => {
      // db.query(`select * from topic where id = ${queryData.id}`, (error2, topic) => {
      db.query(`select * from topic where id = ?`, [queryData.id], (error2, topic) => {
        // query의 2번째 매개변수로 배열과 값을 넣어주게되면, 쿼리문의 ? 부분에 순서대로 들어감
        var title = 'Welcome';
        var description = 'Hello, Node.js';
      })
    })
  }
}

```

## 6 - 글 생성 기능 구현

```js
// /create
else if (pathname === '/craete') {
  db.query('select * from topic', (error, topics) => {
    var title = 'Create';
    var list = template.list(topics);
    var html = template.HTML(title, list,
    `
    <form action="/create_process" method="post">
      <p>
        <input type="text" name="title" placehoder="title">
      </p>
      <p>
        <textarea></textarea>
      </p>
      <p>
        <input type="submit" value="create">
      </p>
    </form>
    `,
    `
      <a href=:/create">create</a>
    `,
    );
    response.writeHead(200):
    response.end(html);
  })
}

// /create_process
else if (pathname === '/create_process') {
  var body = '';
  request.on('data', (data) => {
    body += data;
  });

  request.on('end', () => {
    var post = qs.parse(body);
    db.query(`insert into topic (title, description, created, author_id) values (?, ?, NOW(), ?)`,
    [post.title, post.description, 1],
    (error, result) => {
      if (error) throw error;
      // insert할 경우 삽입한 row의 id가 반환됨.
      response.writeHead(302, { Location : `/?id=${result.insertId}`})
      response.end();
    }
    )
  })
}
```

## 7 - 수정 기능 구현

```js
// main.js

// 업데이트 페이지
else if (pathname === '/update') {
  // 변경할 데이터의 id를 hidden으로 넣는다.
  var html = template.HTML(title,list,
    `
      <form action="/update_process" method="post">
        <input type="hidden" name="id" value=${topic[0].id}>
        <p>
          <input type="text" name="title" placeholder="title" value="${topic[0].title}">
        </p>
        <textarea name="description"></textarea>
        <input type="submit" value="update">
      </form>
    `
  )
}

// 업데이트 처리
else if (pathname === '/update_process') {
  var body = '';
  request.on('data', data => {
    body += data;
  })

  request.on('end', () => {
    var { title, description, id } = qs.parse(body);
    db.query(
      'update topic set title=?, description=?, author_id=1 where id=?', 
      [title, description, id],
      (error, result) => {
        response.writeHead(302, { Location : `/?id=${id}`});
        response.end();
    })
  })
}

```

## 8 삭제

```js
// 삭제기능
else if (pathname==='delete_process') {
  var body = '';
  request.on('data', data => {
    body += data;
  })
  request.on('end', () => {
    var { id } = qs.parse(body);
    db.query('delete from topic where id = ?', [id], (error, results) => {
      if (error) throw error;
      response.write(302, { Location : '/'});
      response.end();
    })
  })
}
```

## 9 JOIN을 이용한 상세보기 구현

topic과 author 테이블이 가진 관계를 이용해 분리된 테이블을 하나로 합쳐서 표현할 수 있다.<br>

```sh
# topic을 왼쪽에 두고 오른쪽에 author를 합칠 수 있다
mysql > select * from topic left join author on topic.author_id = author.id;

# where절을 사용할 경우 동일한 컬럼값이 있을 경우 에러가 발생한다.
mysql > select * from topic left join author on topic.author_id = author.id where id = 3;

# 그럴 경우 id가 어느 테이블의 값인지 명확하게 명시한다.
mysql > .... author.id= 3;

```

## 10 글 생성 구현 - 작성자 선택기능

```js
else if (pathname === '/create') {
  // ...
  db.query('select * from author', (err2, authors) => {
    var i = 0;
    var tag = '';
    while (i < authors.length) {
      tags += `<option value="${authors[i].id}">${authors[i].name}</option>`;
      i++;
    }
    // ...
  })
} else if (pathname === '/create_process') {
  // ...  
  request.on('end', () => {
    var post = qs.parse(body);
    db.query(`insert into topic (title, description, created, author_id) values (?, ?, NOW(), ?)`,
    [post.title, post.description, post.author],
    (error, result) => {
      if (error) throw error;
      // insert할 경우 삽입한 row의 id가 반환됨.
      response.writeHead(302, { Location : `/?id=${result.insertId}`})
      response.end();
    }
    )
  })
}
```

## 11 글쓴이 수정

```js
// main.js
else if (pathname === '/update') {
  //...
  var html = template.HTML(topic[0].title, list,
  `<p>
    ${template.authorSelect(authors, topic[0].author_id)}
  </p>`
  )
}

// template.js
// select태그 - option태그의 select 속성을 추가
module.exports = {
  authorSelect = function(authors, author_id) {
    var tag = '';
    var i = 0;
    while(i < authors.length) {
      var selected = '';
      if (authors[i].id === author_id) {
        selected = ' selected';
      }
      tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
      i++;
    }
  }
}
```

## 13 - DB 설정정보관리
db의 설정정보를 관리하는 코드를 main.js에서 분리한다
```js
// lib/db.js
var mysql = require('mysql');
var db = mysql.createConnection({
  //..
});
db.connect();
module.exports = db;
```

## 14 - 코드 정리

모듈을 한개만 제공할 경우 module.exports를 사용하지만<br>
여러개 제공할 경우 exports.xxx = aaa 의 형태로 사용한다

```js
//하나만 제공할 경우
module.exports = {
  sayHello = function() {
    //...
  }
}

// 여러개 제공할 경우
exports.sayHello = function() {
  //..
}

exports.sayBye = function() {
  //..
}
```

## 16 - 저자 관리 기능 구현

table태그
```html
<table>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>
<style>
  table {
    border-collapse : collapse;
  }

  td {
    border : 1px solid black;
  }
</style>
```

tr : table row, 하나의 행
td : table data, 데이터, 이를 기준으로 각 컬럼이 형성됨

## 20 - 보안 SQL 인젝션

```js
// 1. 템플릿 리터럴 사용
db.query(`select * from topic where id = ${}`, (err, results) => {
  // 처리..
})

// 2. query메서드의 2번째 인자 사용
db.query(`select * from topic where id = ?`,[id], (err, results) => {
  // 처리..
})

```

mysql라이브러리는 자체적으로 SQL인젝션을 막을 수 있는 기능을 제공한다.<br>
만약 사용자로부터 전달받은 데이터를 1번을 사용할 경우 옵션에 따라 인젝션이 허용되어<br>
원치 않는 결과가 발생할 수 있다.<br>
(createConnection시 multipleStatements를 true로 줄 경우 1번 방식사용 시 위험)<br>

## 21 이스케이프

사용자로부터의 입력을 필터링해서 공격을 막는 방법<br>
sanitize-html 라이브러리 사용 시 사용자 입력 중 &lt;script&gt;태그를 사용한 입력이 있을경우<br>
해당 스크립트가 실행될 수 있으므로, sanitize-html라이브러리를 사용하여<br>
스크립트 코드가 실행될 수 없도록 처리한다.

```js
var sanitizeHtml = require('sanitize-html');

var = userInput = '....';
var = result = sanitizeHtml(userInput);
```