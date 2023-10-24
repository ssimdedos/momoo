import QuizMap from "components/map/QuizMap";
import { useEffect, useState } from "react";
import { getMapquiz } from "services/MapService";

const MoodQuiz = () => {
  const [isReady, setIsready] = useState(false);
  const [answerInfo, setAnswerInfo] = useState({});
  const [examInfo, setExamInfo] = useState({});

  const quizStart = () => {
    setIsready(true);
  }

  const quizStop = () => {
    setIsready(false);
  }

  useEffect(()=> {
    const initQuiz = async () => {
      const contents = await getMapquiz();
      // console.log(contents);
      setAnswerInfo(contents.quizArr);
      setExamInfo(contents.galleryNames);
    }
    
    initQuiz();
  },[]);
  return(
    <div>
      {isReady ? <><QuizMap examInfo={examInfo} answerInfo={answerInfo} /> <button onClick={quizStop}>나가기</button></> : <button onClick={quizStart}>시작하기</button>}
    </div>
  )
}

export default MoodQuiz;