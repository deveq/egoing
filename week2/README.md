# Week 2

## 28 - 동기와 비동기, 콜백

### 동기와 비동기 

동기방식 : 하나의 작업이 끝날때까지 기다렸다가 다음 작업처리<br>
비동기방식 : 병렬로 동시에 여러 일을 처리하는 방식

** 모듈에서 sync라는 이름이 붙은 메서드는 동기적처리, 없다면 비동기처리가 일반적<br>

### 콜백

어떠한 실행문을 마치면 내부적으로 자동호출되는 기능

## 29 - 패키지 매니저와 PM2

패키지 : 소프트웨어를 일컫는 여러가지 표현 중 하나<br>

### PM2

프로세스를 관리해주는 프로그램<br>
(프로세스 : 동작중인 프로그램, main.js도 프로세스)

```sh
$ npm i -g pm2 # pm2 설치

$ pm2 start main.js # 프로세스 실행

$ pm2 monit # 프로세스 감시

$ pm2 list # 프로세스 목록 확인

$ pm2 stop main # main이라는 이름의 프로세스 중단

$ pm2 start main.js --watch # main.js가 수정될 경우 자동 적용
```

## 30 - HTML - form

웹에서 서버쪽으로 데이터를 전송하는 방법<br>

```html
<!-- form의 속성
action : submit시 데이터를 전송할 url 
method : form의 전송 방식
-->

<form>
  <!-- 한줄입력 -->
  <input type="text">
  <!-- 여러줄 입력 -->
  <textarea></textarea>
  <!-- 전송 -->
  <input type="submit">
</form>
```

### 31 - 글생성 UI

```js
const template = `
<form action="/create_process" method="post">
  <p><input type="text" name="title"></p>
  ...
</form>
`;

request.end(template);
```

## 32 - POST 방식으로 데이터 받기

```js
var body = "";
request.on('data', function(data) {
  body = body + data;
})

request.on('end', function() {
  response.writeHead(200);
  response.end(body.title)
})
```

post방식의 경우 데이터가 클 경우를 대비하여 수신시 조각조각 나눠서 수신한다.<br>
(request.on('data')에서 처리)<br>
데이터를 모두 수신할 경우 응답을 처리한다<br>
(request.on('end')에서 처리 후 response.end(template))<br>

