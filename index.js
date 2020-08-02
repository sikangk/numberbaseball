const btn = document.querySelector(".btn");
const baseball = document.querySelector(".baseball");
const result = document.querySelector(".result");
const second = document.querySelector(".second");

//숫자 10개 넘버배열
let numbers = [];
for (n = 0; n <= 9; n++) {
  numbers.push(n);
}

let answer = [];

//숫자야구 4자리 반복문 랜덤으로 4자리 배열 뽑기
for (let n = 0; n <= 3; n += 1) {
  //floor 함수 = 소수점 내림 , random 함수 = 0.1~ 0.9 범위 랜덤 곱하기 10해서 1~9//넘버배열에 인덱스가 감소되니 인덱스 수만큼 감소 (10-n)
  const index = Math.floor(Math.random() * numbers.length);
  //앤서 배열에 넘버스배열 해당 인덱스 벨류값 추가
  answer.push(numbers[index]);
  //넘버스 배열에서 splice 함수 사용하여 인덱스 하나 제거
  numbers.splice(index, 1);
}
console.log(answer);

let count = 0;

btn.addEventListener("click", () => {
  const value = baseball.value;
  event.preventDefault();
  //만약 해당 밸류가 존재하고 밸류 길이가 4라면
  if (value && value.length === 4) {
    //앤서 배열을 조인 메서드를 통해 스트링으로 호출해 value 값 비교 // 배열을 스트링으로 만든이유 배열은 객체인데 객체끼리 비교하면 false값이 나올수도 잇기때문
    if (answer.join("") === value) {
      document.querySelector(".index1").append(answer[0]);
      document.querySelector(".index2").append(answer[1]);
      document.querySelector(".index3").append(answer[2]);
      document.querySelector(".index4").append(answer[3]);
      result.appendChild(
        document.createTextNode("홈런!! 5초뒤 다음게임 시작합니다.")
      );
      result.appendChild(document.createElement("br"));
      let j = 0;
      const timeset = setInterval(() => {
        j++;
        result.appendChild(document.createTextNode(`${j}초...`));
        result.appendChild(document.createElement("br"));
      }, 1000);
      setTimeout(() => {
        clearTimeout(timeset);
        location.reload();
      }, 5000);
    } else if (isNaN(value) === true) {
      alert("숫자형으로 입력해주세요");
    } else {
      console.log("다르다");
      let strike = 0;
      let ball = 0;
      //entries() 키와 벨류값 리턴하는 메소드
      for (const [aIndex, anumber] of answer.entries()) {
        //split 문자열로 자르는 메소드
        for (const [bIndex, bstring] of baseball.value.split("").entries()) {
          if (anumber === Number(bstring)) {
            if (aIndex === bIndex) {
              strike = strike + 1;
            } else {
              ball = ball + 1;
            }
          }
        }
      }

      result.appendChild(
        document.createTextNode(
          `입력한값:${baseball.value}  [${strike}스트라이크]  [${ball}볼]`
        )
      );
      result.appendChild(document.createElement("br"));
    }
  } else {
    alert("4자리 값을 입력해주세요");
  }
  count = count + 1;
  //10번도전햇는데 실패시
  if (count === 10 && answer.join("") !== value) {
    document.querySelector(".index1").append(answer[0]);
    document.querySelector(".index2").append(answer[1]);
    document.querySelector(".index3").append(answer[2]);
    document.querySelector(".index4").append(answer[3]);
    result.appendChild(
      document.createTextNode(
        `다음기회에 꽝! 정답은 : ${answer} 이었습니다 5초후 다시 시작됩니다.`
      )
    );
    result.appendChild(document.createElement("br"));
    let j = 0;
    const timeset = setInterval(() => {
      j++;
      result.appendChild(document.createTextNode(`${j}초...`));
      result.appendChild(document.createElement("br"));
    }, 1000);
    setTimeout(() => {
      clearTimeout(timeset);
      location.reload();
    }, 5000);
  }
});
