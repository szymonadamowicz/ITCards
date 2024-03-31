import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
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

const questionData: QuestionData = rawQuestionData;

const QuestionBox: React.FC = () => {
  const { languageType } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const questionsDataMap: Question[] =
    questionData[languageType as keyof QuestionData] || questionData.JAVASCRIPT;

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

  const handlePreviousQuestion = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
      }, 290);
    } else {
      setIsFlipped(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
        setIsFlipped(false);
      }, 0);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextQuestion(),
    onSwipedRight: () => handlePreviousQuestion(),
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
              currentQuestionIndex === questionsDataMap.length
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
          {currentQuestionIndex < questionsDataMap.length ? (
            <Typography>
              {questionsDataMap[currentQuestionIndex]?.question}
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
              currentQuestionIndex === questionsDataMap.length
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
          {currentQuestionIndex < questionsDataMap.length ? (
            <Typography>
              {questionsDataMap[currentQuestionIndex]?.answer}
            </Typography>
          ) : (
            <Typography variant="h5">All questions have been asked.</Typography>
          )}
        </Button>
      </ReactCardFlip>
      <Box display="flex" flexDirection="row" justifyContent="center" mt={2}>
        <Button
          sx={{
            opacity: currentQuestionIndex === 0 ? 0.5 : 1,
          }}
          onClick={handlePreviousQuestion}
        >
          Previous Question
        </Button>
        <Button
          onClick={() => setIsFlipped((prev) => !prev)}
          sx={{
            pointerEvents:
              currentQuestionIndex === questionsDataMap.length
                ? "none"
                : "unset",
            opacity: currentQuestionIndex === questionsDataMap.length ? 0.5 : 1,
          }}
        >
          Show Answer
        </Button>
        <Button
          sx={{
            pointerEvents:
              currentQuestionIndex === questionsDataMap.length
                ? "none"
                : "unset",
            opacity: currentQuestionIndex === questionsDataMap.length ? 0.5 : 1,
          }}
          onClick={handleNextQuestion}
        >
          Next Question
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionBox;
