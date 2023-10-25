import { useEffect, useState } from "react";

const QuizMap = () => {
  const QuizSession = window.sessionStorage.getItem("moodQuiz");
  // const isQuizStart = window.sessionStorage.getItem("quizStart");
  const quizData = JSON.parse(QuizSession);
  const [examples, setExamples] = useState([]);
  const [quizNum, setQuizNum] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});

  const makeQuiz = (num) => {
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

  const toPrevious = () => {
    makeQuiz(quizNum-2);
    const selectedBtn = document.querySelector(`input[value="${userAnswers[quizNum-2]}"]`);
    // const selectedBtn = document.querySelector(`input[name="${quizNum-1+'번 문제'}"]:checked`);
    // selectedBtn.checked = true;
    console.log(selectedBtn);
  }

  const pickAnswer = (answer) => {
    const num = quizNum-1
    setUserAnswers({...userAnswers, [num]:answer});
  }

  const submitQuiz = () => {
    console.log(userAnswers);
  }

  useEffect(()=> {
    if(QuizSession) {
      makeQuiz(1);
    } else {
      alert('잘못된 접근입니다. 다시 퀴즈를 시작해주세요');
      window.sessionStorage.setItem("isQuizStart", 0);
    }
  },[]);


  return (
    <div>
      <div id="maaap"></div>
      <h2>1. 다음 장소는 어디일까요?</h2>
      <div id="map" style={{ width: "700px", height: "450px" }} />
      <label>
        {examples.length !== 0 ? examples.map((e, i)=> {
          return <label><input type="radio" key={i+1} name={quizNum-1+'번 문제'} value={e} onClick={()=> {pickAnswer(e)}} ></input>{i+1+'번) '+e}</label>
        }):<h2>loading ...</h2>}
      </label>
      <div>
        {quizNum !== 2 ?<button onClick={toPrevious}>이전</button> : <></>}
        {quizNum > Object.keys(quizData).length ? <button onClick={submitQuiz} >제출하기</button> : <button onClick={()=>makeQuiz(quizNum)} >다음</button>}
      </div>
    </div>
  );
};

export default QuizMap