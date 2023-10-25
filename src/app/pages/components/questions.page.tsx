"use client";
import { useEffect, useMemo, useState } from "react";
import { TQuestions as AllQuestions } from "../../questions";
import EndGameView from "./endGameView";
import { clearInterval } from "timers";

export default function QuestionPageRenderer() {
  const questionsCount = AllQuestions.length;
  const [page, setPage] = useState(0);
  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [timer, setTimer] = useState<number>(0);
  console.log({ questionsCount });

  console.log({ score });

  const presentQuestion = useMemo(() => {
    console.log("page changed", page);
    setTimer(AllQuestions[page].timer);
    return AllQuestions[page];
  }, [page]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (submittedAnswer && selectedIndex !== null) {
        console.log("selected an answer");
        clearInterval(intervalId);
      }
      if (timer <= 0) {
        clearInterval(intervalId);
        // Handle countdown expiration here
      } else {
        //   if (selectedIndex && selectedIndex > -1) {
        //     console.log("tjeu have selected index");
        //     clearInterval(intervalId);
        //   }
        setTimer(timer - 1);
      }
      console.log({ timer });
    }, 1000); // Update the timer every 1 second (1000 milliseconds).

    return () => clearInterval(intervalId); // Clear the interval on unmount.
  }, [presentQuestion.timer, timer, setTimer, submittedAnswer]);

  const handleNextButton = () => {
    if (!submittedAnswer) {
      // has not submitted answer - get question and verify answers
      setSubmittedAnswer(true);
      calculateScore();
      return;
    }
    // pick next question if it exists
    console.log("aks", page, page + 1);
    if (questionsCount > page + 1) {
      setPage(page + 1);
      setSubmittedAnswer(false);
      setSelectedIndex(null);
    } else setEndGame(true);
  };

  const calculateScore = () => {
    if (selectedIndex === presentQuestion.aIndex) {
      setScore(score + presentQuestion.points);
    }
  };

  return endGame ? (
    <EndGameView />
  ) : (
    <>
      <div className='w-full items-center justify-around flex'>
        <div className='flex-none'>
          <div>{presentQuestion.question}</div>
          <div>
            {presentQuestion.options.map((option, index: number) => (
              <button
                className={`border-2 w-full my-4 p-3 rounded border-sky-600 hover:bg-sky-200 cursor-pointer disabled:cursor-not-allowed hover:disabled:bg-inherit ${
                  selectedIndex === index ? "bg-sky-400" : null
                } ${
                  submittedAnswer &&
                  selectedIndex === index &&
                  selectedIndex !== presentQuestion.aIndex &&
                  "bg-red-600"
                } ${
                  submittedAnswer &&
                  presentQuestion.aIndex === index &&
                  "bg-green-400"
                }`}
                key={index}
                disabled={submittedAnswer}
                onClick={() => {
                  if (submittedAnswer) return;
                  setSelectedIndex(index);
                }}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            className='mt-10 p-4 bg-green-500 rounded-lg disabled:opacity-25 disabled:cursor-not-allowed'
            disabled={selectedIndex === null}
            onClick={handleNextButton}
          >
            {!submittedAnswer
              ? "Submit Answer"
              : questionsCount === page + 1 && submittedAnswer
              ? "End Game"
              : "Next Question"}
          </button>
        </div>
        <p className='flex-initial text-8xl'>{timer}</p>
      </div>
      <div className='text-center mt-16'>
        Total Score: <br /> <p className='text-9xl text-sky-800'>{score}</p>
      </div>
    </>
  );
}
