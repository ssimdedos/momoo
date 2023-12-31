import { useEffect, useState } from "react";

const QuizMap = () => {
  const QuizSession = window.sessionStorage.getItem("moodQuiz");
  // const isQuizStart = window.sessionStorage.getItem("quizStart");
  const quizData = JSON.parse(QuizSession);
  const [examples, setExamples] = useState([]);
  const [quizNum, setQuizNum] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});

  const makeQuiz = async (num) => {
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

  const toPrevious = () => {
    makeQuiz(quizNum-2);
  }

  const toNext = () => {
    if(userAnswers[quizNum-1]===undefined) {
      alert('정답을 선택해주세요.');
      return
    };
    makeQuiz(quizNum);
  }

  const pickAnswer = (answer) => {
    const num = quizNum-1;
    // console.log(answer);
    const contents = {...userAnswers, [num]:answer};
    setUserAnswers(contents);
    window.sessionStorage.setItem("userAnswers", JSON.stringify(contents));
  }

  const submitQuiz = () => {
    console.log(userAnswers);
    window.sessionStorage.setItem("moodQuizResult", userAnswers);
    window.sessionStorage.setItem("quizStatus", 2);
    window.location.reload();
  }

  useEffect(()=> {
    if(QuizSession) {
      let userAnswers_tmp = window.sessionStorage.getItem("userAnswers");
      let num = 1;
      if (userAnswers_tmp) {
        userAnswers_tmp = JSON.parse(userAnswers_tmp);
        num = Object.keys(userAnswers_tmp)[Object.keys(userAnswers_tmp).length-1];
        setUserAnswers(userAnswers_tmp);
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
      <h2>{quizNum-1}. 다음 장소는 어디일까요?</h2>
      <div id="map" style={{ width: "700px", height: "450px" }} />
      <label>
        {/* 로딩이 두 번 되는 이슈 확인 231031 */}
        {examples.length !== 0 ? examples.map((e, i)=> {
          let example_no = i+1;
          if (userAnswers[quizNum-1] === e) return <label><input defaultChecked type="radio" key={quizNum-1+'-'+example_no} name={quizNum-1+'번 문제'} value={e} onClick={()=> {pickAnswer(e)}} ></input>{i+1+'번) '+e}</label>
          else return <label><input type="radio" key={quizNum-1+'-'+example_no} name={quizNum-1+'번 문제'} value={e} onClick={()=> {pickAnswer(e)}} ></input>{i+1+'번) '+e}</label>
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