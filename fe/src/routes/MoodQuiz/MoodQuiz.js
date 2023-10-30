import QuizMap from "components/MoodQuizCom/QuizMap";
import QuizResult from "components/MoodQuizCom/QuizResult";
import { useEffect, useState } from "react";
import { getMapquiz } from "services/MapService";

const MoodQuiz = () => {
  const [quizStatus, setQuizStatus] = useState(0);
  const QuizSession = window.sessionStorage.getItem("moodQuiz");

  const quizStart = () => {
    window.sessionStorage.setItem("quizStatus", 1);
    setQuizStatus(1);
  }
  
  const quizStop = () => {
    window.sessionStorage.setItem("quizStatus", 0);
    setQuizStatus(0);
    window.sessionStorage.removeItem("moodQuiz");
    window.sessionStorage.removeItem("userAnswers");
    window.location.reload();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if(quizStatus === 0) return <button onClick={quizStart}>시작하기</button>
  else if(quizStatus === 1) return <><QuizMap /> <button onClick={quizStop}>나가기</button></>
  // else if(quizStatus === 2) return <><QuizResult /> <button onClick={quizStop}>나가기</button></>
}

export default MoodQuiz;