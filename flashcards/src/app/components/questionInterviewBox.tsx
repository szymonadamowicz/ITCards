import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import rawQuestionData from "../questions/questions.json";
import { useSwipeable } from "react-swipeable";
import ReactCardFlip from "react-card-flip";

interface Question {
  question: string;
  answer: string;
}

interface QuestionData {
  JAVASCRIPT: Question[];
  REACT: Question[];
  ANGULAR: Question[];
  "C#": Question[];
  "NODE.JS": Question[];
  PHP: Question[];
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const questionData: QuestionData = rawQuestionData;

const QuestionInterviewBox: React.FC = () => {
  const { languageType } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const questionsDataMap =
      questionData[languageType as keyof QuestionData] ||
      questionData.JAVASCRIPT;
    const shuffledQuestionsCopy = [...questionsDataMap];
    shuffleArray(shuffledQuestionsCopy);
    setShuffledQuestions(shuffledQuestionsCopy);
    setCurrentQuestionIndex(0);
  }, [languageType]);

  const handleNextQuestion = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 290);
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setIsFlipped(false);
      }, 0);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextQuestion(),
    trackMouse: true,
  });

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <ReactCardFlip
        isFlipped={isFlipped}
        flipSpeedBackToFront={1}
        flipSpeedFrontToBack={1}
        flipDirection="horizontal"
      >
        <Button
          onClick={() => {
            setIsFlipped((prev) => !prev);
          }}
          {...handlers}
          sx={{
            pointerEvents:
              currentQuestionIndex === shuffledQuestions.length
                ? "none"
                : "unset",
            height: 300,
            width: 200,
            bgcolor: "red",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
        >
          {currentQuestionIndex < shuffledQuestions.length ? (
            <Typography>
              {shuffledQuestions[currentQuestionIndex]?.question}
            </Typography>
          ) : (
            <Typography variant="h5">All questions have been asked.</Typography>
          )}
        </Button>
        <Button
          onClick={() => {
            setIsFlipped((prev) => !prev);
          }}
          {...handlers}
          sx={{
            pointerEvents:
              currentQuestionIndex === shuffledQuestions.length
                ? "none"
                : "unset",
            height: 300,
            width: 200,
            bgcolor: "red",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
        >
          {currentQuestionIndex < shuffledQuestions.length ? (
            <Typography>
              {shuffledQuestions[currentQuestionIndex]?.answer}
            </Typography>
          ) : (
            <Typography variant="h5">All questions have been asked.</Typography>
          )}
        </Button>
      </ReactCardFlip>
      <Box display="flex" flexDirection="row" justifyContent="center" mt={2}>
        <Button
          onClick={() => setIsFlipped((prev) => !prev)}
          sx={{
            pointerEvents:
              currentQuestionIndex === shuffledQuestions.length
                ? "none"
                : "unset",
            opacity:
              currentQuestionIndex === shuffledQuestions.length ? 0.5 : 1,
          }}
        >
          Show Answer
        </Button>
        <Button
          sx={{
            pointerEvents:
              currentQuestionIndex === shuffledQuestions.length
                ? "none"
                : "unset",
            opacity:
              currentQuestionIndex === shuffledQuestions.length ? 0.5 : 1,
          }}
          onClick={handleNextQuestion}
        >
          Next Question
        </Button>
      </Box>
    </Box>
  );
};
export default QuestionInterviewBox;
