import { useEffect, useState } from "react";

const QuizResult = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [quizData, setQuizData] = useState({});

  useEffect(()=> {
    const userAnswers_tmp = JSON.parse(window.sessionStorage.getItem("userAnswers"));
    setUserAnswers(userAnswers_tmp);

    const quizData_tmp = JSON.parse(window.sessionStorage.getItem("moodQuiz"));
    let quizAnswers = {};
    for (let key of Object.keys(quizData_tmp)) {
      // console.log(quizData_tmp[key].answer);
      quizAnswers[key] = quizData_tmp[key].answer;
    }
    setQuizData(quizAnswers);
  },[]);

  

  return <></>
}

export default QuizResult;