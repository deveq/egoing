/**
 * 템플릿 리터럴(template literal)
 *
 * 일반 문자열의 경우 \n으로 줄바꿈 가능
 * 템플릿 리터럴의 경우 엔터와 공백도 입력가능
 *
 */
var name = "egoing";
var letter = "Dear" + name + "\n\
\n\
aaa";
console.log(letter);
