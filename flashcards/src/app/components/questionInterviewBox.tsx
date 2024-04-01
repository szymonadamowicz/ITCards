import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppContext } from "../context/appContext";
import rawQuestionData from "../questions/questions.json";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";

interface Question {
  question: string;
  answer: string;
}

interface QuestionData {
  [key: string]: Question[];
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
  const [hasSwiped, setHasSwiped] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(0);

  useEffect(() => {
    const questionsDataMap =
      questionData[languageType as keyof QuestionData] ||
      questionData.JAVASCRIPT;
    let shuffledQuestionsCopy = [...questionsDataMap];
    shuffleArray(shuffledQuestionsCopy);
    setShuffledQuestions(shuffledQuestionsCopy);
    setCurrentQuestionIndex(0);
  }, [languageType]);

  const handleSwipe = (direction: number) => {
    setSwipeDirection(direction);
    if (direction > 0 && currentQuestionIndex < shuffledQuestions.length) {
      setIsFlipped(false);
      setTimeout(() => {
        if (direction > 0) {
          setCurrentQuestionIndex((prevIndex) =>
            Math.min(prevIndex + 1, shuffledQuestions.length)
          );
        } else {
        }
      }, 10);
    }
    setHasSwiped(true);
  };
  const handleClick = () => {
    if (!hasDragged) {
      setIsFlipped((prev) => !prev);
    }
  };
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <motion.div
        key={currentQuestionIndex}
        custom={swipeDirection}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragStart={() => {
          setHasDragged(false);
        }}
        onDrag={() => {
          setHasDragged(true);
        }}
        onDragEnd={(event, { offset }) => {
          const swipeThreshold = 100;
          if (Math.abs(offset.x) > swipeThreshold) {
            if (offset.x > swipeThreshold && currentQuestionIndex > 0) {
              handleSwipe(-1);
            } else if (
              offset.x < -swipeThreshold &&
              currentQuestionIndex < shuffledQuestions.length
            ) {
              handleSwipe(1);
            }
          }
          setTimeout(() => setHasDragged(false), 0);
        }}
      >
        <ReactCardFlip
          key={currentQuestionIndex}
          isFlipped={isFlipped}
          flipDirection="horizontal"
        >
          <Button
            onClick={() => {
              if (
                !hasDragged &&
                currentQuestionIndex != shuffledQuestions.length
              ) {
                setIsFlipped((prev) => !prev);
              }
              setHasDragged(false);
            }}
            disabled={currentQuestionIndex >= shuffledQuestions.length}
            sx={{
              height: 300,
              width: 200,
              bgcolor: "red",
              "&:hover": { backgroundColor: "red" },
            }}
          >
            <Typography color={"white"}>
              {currentQuestionIndex < shuffledQuestions.length
                ? shuffledQuestions[currentQuestionIndex]?.question
                : "All questions have been asked."}
            </Typography>
          </Button>
          <Button
            onClick={() => {
              if (
                !hasDragged &&
                currentQuestionIndex != shuffledQuestions.length
              ) {
                setIsFlipped((prev) => !prev);
              }
              setHasDragged(false);
            }}
            disabled={currentQuestionIndex >= shuffledQuestions.length}
            sx={{
              height: 300,
              width: 200,
              bgcolor: "red",
              "&:hover": { backgroundColor: "red" },
            }}
          >
            <Typography color={"white"}>
              {currentQuestionIndex < shuffledQuestions.length
                ? shuffledQuestions[currentQuestionIndex]?.answer
                : "All questions have been asked."}
            </Typography>
          </Button>
        </ReactCardFlip>
      </motion.div>
      <Box display="flex" flexDirection="row" justifyContent="center" mt={2}>
        <Button
          onClick={handleClick}
          disabled={currentQuestionIndex >= shuffledQuestions.length}
        >
          Show Answer
        </Button>
        <Button
          onClick={() => handleSwipe(1)}
          disabled={currentQuestionIndex >= shuffledQuestions.length}
        >
          Next Question
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionInterviewBox;
