import QuizMap from "components/map/QuizMap";
import { useEffect, useState } from "react";
import { getMapquiz } from "services/MapService";

const MoodQuiz = () => {
  const [quizReady, setQuizReady] = useState(false);
  const QuizSession = window.sessionStorage.getItem("moodQuiz");

  const quizStart = () => {
    window.sessionStorage.setItem("isQuizStart", 1);
    setQuizReady(true);
  }
  
  const quizStop = () => {
    window.sessionStorage.setItem("isQuizStart", 0);
    setQuizReady(false);
  }

  useEffect(()=> {
    const initQuiz = async () => {
      if(QuizSession) {
        console.log('세션 확인');
        // console.log(QuizSession);
      } else {
        console.log('세션 없음');
        let contents = await getMapquiz();
        window.sessionStorage.setItem('moodQuiz',contents);
      }
      // console.log(contents);
    }
    
    initQuiz();
  },[]);
  
  return(
    <div>
      {quizReady ? <><QuizMap /> <button onClick={quizStop}>나가기</button></> : <button onClick={quizStart}>시작하기</button>}
    </div>
  )
}

export default MoodQuiz;