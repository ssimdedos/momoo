import { useEffect, useState } from "react";

const QuizMap = () => {
  const QuizSession = window.sessionStorage.getItem("moodQuiz");
  // const isQuizStart = window.sessionStorage.getItem("quizStart");
  const quizData = JSON.parse(QuizSession);
  const [examples, setExamples] = useState([]);
  const [quizNum, setQuizNum] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});

  const makeQuiz = (num) => {
    num = parseInt(num);
    const mapDiv = document.querySelector('#map');
    const mapOps = {
      center: new window.naver.maps.LatLng(quizData[num].lat,quizData[num].long),
      zoom: 16,
      zoomControl: false,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      mapTypeControl: false,
      minZoom: 16,
      maxZoom: 16
    }
    const map = new window.naver.maps.Map(mapDiv, mapOps);
  
    let marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(parseFloat(quizData[num].lat), parseFloat(quizData[num].long)),
      map: map
    });
    setExamples(quizData[num].examples);
    setQuizNum(num+1);
  }

  const toPrevious = async () => {
    console.log(quizNum-2);
    console.log(userAnswers[quizNum-2]);
    await makeQuiz(quizNum-2);
    // const selectedBtn = document.querySelector(`input[name="${quizNum-1+'번 문제'}"]:checked`);
    const selectedBtns = document.querySelectorAll(`input[name="${quizNum-2+'번 문제'}"]`);
    if(userAnswers[quizNum-2]) {
      const val = await Array.from(selectedBtns).filter(e=> e.value === userAnswers[quizNum-2]);
      val[0].checked = true;
    }
  }

  const toNext = async () => {
    if(userAnswers[quizNum-1]===undefined) {
      alert('정답을 선택해주세요.');
      return
    };
    await makeQuiz(quizNum);
    // console.log(quizNum);
    const selectedBtns = document.querySelectorAll(`input[name="${quizNum+'번 문제'}"]`);
    if(userAnswers[quizNum]) {
      const val = await Array.from(selectedBtns).filter(e=> e.value === userAnswers[quizNum]);
      val[0].checked = true;
    }
  }
  const pickAnswer = async (answer) => {
    const num = quizNum-1;
    // console.log(answer);
    const contents = {...userAnswers, [num]:answer};
    await setUserAnswers(contents);
    await window.sessionStorage.setItem("userAnswers", JSON.stringify(contents));
  }

  const submitQuiz = () => {
    console.log(userAnswers);
    window.sessionStorage.setItem("moodQuizResult", userAnswers);
    window.sessionStorage.setItem("quizStatus", 2);
  }

  useEffect(()=> {
    if(QuizSession) {
      let userAnswers_tmp = window.sessionStorage.getItem("userAnswers");
      let num = 1;
      if (userAnswers_tmp) {
        userAnswers_tmp = JSON.parse(userAnswers_tmp);
        // console.log(Object.keys(userAnswers_tmp)[Object.keys(userAnswers_tmp).length-1]);
        num = Object.keys(userAnswers_tmp)[Object.keys(userAnswers_tmp).length-1];
        setUserAnswers(userAnswers_tmp);
        const selectedBtns = document.querySelectorAll(`input[name="${num+'번 문제'}"]`);
        if(userAnswers_tmp[num]) {
          const val = Array.from(selectedBtns).filter(e=> e.value === userAnswers_tmp[num]);
          console.log(val);
          // val[0].checked = true;
        }
      }
      makeQuiz(num);
    } else {
      alert('잘못된 접근입니다. 다시 퀴즈를 시작해주세요');
      window.sessionStorage.setItem("quizStatus", 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <div>
      <div id="maaap"></div>
      <h2>{quizNum-1}. 다음 장소는 어디일까요?</h2>
      <div id="map" style={{ width: "700px", height: "450px" }} />
      <label>
        {examples.length !== 0 ? examples.map((e, i)=> {
          let example_no = i+1;
          // console.log(quizNum-1+'-'+example_no);
          return <label><input type="radio" key={quizNum-1+'-'+example_no} name={quizNum-1+'번 문제'} value={e} onClick={()=> {pickAnswer(e)}} ></input>{i+1+'번) '+e}</label>
        }):<h2>loading ...</h2>}
      </label>
      <div>
        {quizNum !== 2 ?<button onClick={toPrevious}>이전</button> : <></>}
        {quizNum > Object.keys(quizData).length ? <button onClick={submitQuiz} >제출하기</button> : <button onClick={toNext} >다음</button>}
      </div>
    </div>
  );
};

export default QuizMap