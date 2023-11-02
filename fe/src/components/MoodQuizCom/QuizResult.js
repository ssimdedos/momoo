import { useEffect, useState } from "react";

const QuizResult = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [quizData, setQuizData] = useState({});
  const [score, setScore] = useState('0/0');
  const scoring = () => {
    const uaLen = Object.keys(userAnswers).length;
    if(uaLen === Object.keys(quizData).length && uaLen === 5) {
      let jumsu = 0;
      for (let i=0; i<uaLen; i++) {
        if(userAnswers[i] === quizData[i]) {
          jumsu+=1;
        }
      }
      setScore(`${jumsu}/${uaLen}`);
    }
  };

  useEffect(() => {
    const userAnswers_tmp = JSON.parse(window.sessionStorage.getItem("userAnswers"));
    setUserAnswers(userAnswers_tmp);

    const quizData_tmp = JSON.parse(window.sessionStorage.getItem("moodQuiz"));
    let quizAnswers = {};
    for (let key of Object.keys(quizData_tmp)) {
      // console.log(quizData_tmp[key].answer);
      quizAnswers[key] = quizData_tmp[key].answer;
    }
    setQuizData(quizAnswers);
    scoring();
  }, []);


  return (
    <div>
      {score}
    </div>
  );
};

export default QuizResult;
