
# 06 자바스크립트 - 데이터타입

## 숫자 데이터 타입 - Number

[number](./syntax/number.js)

## 문자열 데이터 타입 - String

[string](./syntax/string.js)


# 07 자바스크립트 - 변수

[variable](./syntax/variable.js)

# 08 Template literals

[template](./syntax/template.js)


# Node.js

# 09 URL

http://opentutorials.org:3000/main?id=HTML&page=12

| 구분 | 이름 |
| --- | --- |
| http | 프로토콜 |
| opentutorials.org | 호스트(도메인네임) |
| 3000 | 포트번호 |
| main | 경로(path) |
| id=HTML&page=12 | 쿼리스트링 |

1. 프로토콜
    <br>
    사용자가 서버에 접속할 때 어떤 방식으로 통신할 것인지

2. 호스트(도메인네임)
    <br>
    인터넷에 접속된 각각의 컴퓨터를 의미

3. 포트
    <br>
    한 대의 컴퓨터 내에 여러대의 서버가 존재할 수 있어서 클라이언트는 그 중 어떤 서버와 통신할지 알 수 없으므로,<br>
    포트번호를 명시하면 해당 포트로 연결된 서버와 통신하게됨
    <br>
    node의 경우 app.listen을 통해 포트 설정가능
    <br>
    `app.listen(3000)`

4. 경로(path)
    <br>
    해당 컴퓨터 안에 있는 어떤 디렉토리에서 어떤 파일을 불러올지

5. 쿼리스트링(query string)
    <br>
    웹서버에 데이터 전달 가능
    <br>
    ?로 시작하고 값과 값 사이는 &로 구분, 이름과 값은 등호로 구분

> 80번 포트
    <br>
    80번포트는 웹서버 사용으로 약속되어있으므로 app.listen(80)을 하게되면 포트번호 생략가능


# 10 URL로 입력된 값 사용하기

쿼리스트링을 사용하면 웹에 데이터 전송가능하다
<br>
http://localhost:3000/?id=HTML 의 경우 querystring은 id=HTML

```js
var app = http.createServer(function(request, response) {
    var url = request.url;
    console.log(url); // /?id=HTML
})
```

URL에서 쿼리스트링 추출
```js
// localhost:3000/?id=HTML&page=12
var url = require('url');
http.createServer(function(request, response) {
    var queryData = url.parse(request.url, true).query;
    // url.parse(주소,true) 쿼리스트링에 담긴 내용을 추출해 객체로 만들어줌
    // { id : 'HTML', page : '12' }
    
    // 요청값에 따라 다른 응답
    response.end(queryData.id);
})

```

# 11 동적인 웹페이지 만들기

```html
<ol>
    <li><a href="/?id=HTML">HTML</a></li>
    <li><a href="/?id=CSS">CSS</a></li>
    <li><a href="/?id=JavaScript">JavaScript</a></li>
</ol>
```


# 12 파일 읽기

[fileread](./nodejs/fileread.js)

# 13 본문 구현

```js
http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    var title = queryData.id;
    if (_url === '/') {
        title = 'Welcome';
    }

    if (_url === '/favicon.ico') {
        return response.writeHead(404);
    }

    // 쿼리스트링의 id 값을 통해 읽어올 파일을 구분해준다.
    // data폴더 내의 파일이 수정될 경우 서버를 재시작하지 않아도 변경된 내용이 반영된다
    // (서버에 request가 들어올때마다 매번 readFile함수가 실행되어 새로운 콜백으로 description을 가져오기떄문 )
    // 단, main.js를 수정할 경우 재시작이 필요하다.
    fs.readFile(`data/${title}`, 'utf8', function(err, description) {
        var template = `내용..${description}`;

        response.writeHead(200);
        response.end(template);
    })
})
```

# 14 Boolean

true, false 단 두개의 데이터로 이루어진 타입
예약어로 지정되어있기 때문에 변수명으로 사용할 수 없다.

# 15 비교연산자

| 연산자 | 설명 |
| --- | --- |
| == | 서로 같은지 비교 |
| === | 타입까지 같은지 비교 |
| > | a > b, a가 b보다 크다 |
| < | a < b , b가 a보다 크다 |


# 16 제어문

제어문을 이용하면 시간 순서에 따라 실행되는 프로그램의 실행흐름을 제어할 수 있다.
<br>

# 17 조건문

```js
if (condition) {
    condition이 참일 경우 실행
} else if (condition2) {
    condition이 참이 아닐 때, condition2가 참이면 실행
} else {
    위 조건들 모두 만족하지 못했을 경우 실행
}
```

# 18 콘솔로 입력받기

```sh
$ node main.js 입력값1 입력값2
```

```js
// node로 프로그램을 실행시킬 경우 인자를 넣어줄 수 있는데,
// process.argv로 그 인자를 받을 수 있다.
var args = process.argv;
console.log(args); // ['node의 경로', '실행된 파일의 경로', '입력값1', '입력값2']
```

## 콘솔 입력값 활용

```js
var args = process.argv;

if (args[2] === '1') {
    console.log('1');
} else {
    console.log('2');
}
```

# 19 오류페이지와 홈페이지 구현

## Not found 구현

쿼리스트링으로 입력한 페이지를 열어주게끔 하였으므로, 루트 디렉토리 이외의 접근일 경우 page not found를 보여줘야한다.
<br>

```js
var pathname = url.parse(request.url, true).pathname

if (pathname === '/') {
    var queryData = url.parse(request.url, true).query;
    // queryData.id에 맞게끔 처리
} else {
    // else에 들어온 경우 pathname이 root가 아니란 의미이므로
    // page not found처리를 해야함
    response.writeHead(404);
    response.end('page not found');
}
```

# 20 반복문

```js
while (condition) {
    //실행할 동작
}
```
만약 condition을 false로 바꿔주는 코드를 넣지 않을 경우 무한반복이 되므로 주의

# 21 배열

배열도 CRUD 가능
## 배열 만들기 (create)

```js
// 배열 리터럴
var arr = [1,2,3,4,5];
// 생성자를 통한 생성
var arr = new Array(1,2,3,4,5);
```

## 배열에서 값 읽기 (read)

```js
var arr = [1,2,3,4,5];
console.log(arr[1]);
```

## 배열 값 갱신(update)

```js
var arr = [1,2,3,4];
arr[2] = 10;
```

## 배열의 크기 구하기
```js
var arr = [1,2,3,4];
arr.length // 메서드가 아닌 프로퍼티임 주의
```

## 배열의 마지막에 값 추가하기

```js
var arr = [1,2,3,4,5];
arr.push(6);
```

# 22 배열과 반복문

반복문을 통해 배열을 순회할 수 있다

```js
var number = [1, 400, 12, 34, 5];

var i = 0;
while (i < number.length) {
    console.log(number[i]);
    i = i + 1; // i++ 혹은 i += 1
} 

i = 0;
var total = 0;
while (i < number.length) {
    total += number[i];
} 

```

# 23 파일 목록 알아내기

ul태그 내의 li는 정적으로 작성된 태그이므로<br>
data폴더내의 데이터가 변경될때마다 template을 수정해줘야하는 문제점이 있다.<br>
fs모듈을 이용해 data폴더 내의 파일리스트를 읽고 동적으로 처리하게끔 수정한다.

```js
var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, function(err, filelist) {
    console.log(filelist); // [CSS, HTML, JavaScript]
})

```

# 24 글목록 출력하기

1. data 디렉토리에서 파일 목록 읽어오기
2. 읽어온 파일 목록을 표시하는 HTML코드를 list에 추가하기
3. 저장한 변수를 이용해 웹페이지 표시하기

```js
var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, function(err, filelist) {
    console.log(filelist); 

    var i = 0;
    var list = '<ul>'
    while (i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i += 1;
    }
    list += '</ul>';
})
```

# 25 함수

```js
function 함수이름(파라미터) {
    // 실행할 코드
}

// 반환 없는 함수
function sum(first, second) {
    console.log(first + second);
}

// 반환하는 값이 있는 함수
function sumWithReturn(first, second) {
    return first + second;
}

```

return은 함수 내부에서 특정 값을 반환하고 함수를 종료시키는 키워드이다.
return 뒤의 값은 해당 함수를 호출한곳에 반환된다.


