// import { hello } from './hello.js'; // export default가 아닌 export는 개별이니까 { 가져올 함수,변수명 }
// import hello from './hello.js'; // export default는 하나의 파일에 하나만, default가 붙은 것은 {} 없이
import * as hell from './hello.js'; // 모든 export를 hell이라는 이름으로 가져온다. 객체의 이름처럼 사용한다.

// console.log(hello());
console.log(hell.hello());
console.log(hell.hello2());
