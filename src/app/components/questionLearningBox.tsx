import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppContext } from "../context/appContext";
import rawQuestionData from "../questions/questions.json";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import { marked } from "marked";
import {
  faArrowsRotate,
  faChevronLeft,
  faChevronRight,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  answer: string;
}

interface QuestionData {
  [key: string]: Question[];
}

const questionData: QuestionData = rawQuestionData;

const QuestionInterviewBox: React.FC = () => {
  const { languageType } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [orderQuestions, setOrderQuestions] = useState<Question[]>([]);
  const [hasSwiped, setHasSwiped] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(0);

  useEffect(() => {
    const questionsDataMap =
      questionData[languageType as keyof QuestionData] ||
      questionData.JAVASCRIPT;
    setOrderQuestions(questionsDataMap);
    setCurrentQuestionIndex(0);
  }, [languageType]);

  const handleSwipe = (direction: number) => {
    setSwipeDirection(direction);
    if (
      (direction > 0 && currentQuestionIndex < orderQuestions.length) ||
      (direction < 0 && currentQuestionIndex > 0)
    ) {
      setIsFlipped(false);

      setTimeout(() => {
        if (direction > 0) {
          setCurrentQuestionIndex((prevIndex) =>
            Math.min(prevIndex + 1, orderQuestions.length)
          );
        } else {
          setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
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

  const renderMarkdown = (text: string) => {
    if (text == null) {
      return { __html: "" };
    }
    return { __html: marked.parse(text) };
  };

  let navigate = useNavigate();

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box mb={5}>
        <Typography textAlign={"center"}>
          {currentQuestionIndex}/{orderQuestions.length}
        </Typography>
        <progress value={currentQuestionIndex / 5} />
      </Box>
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
              currentQuestionIndex < orderQuestions.length
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
                currentQuestionIndex != orderQuestions.length
              ) {
                setIsFlipped((prev) => !prev);
              }
              setHasDragged(false);
            }}
            disabled={currentQuestionIndex >= orderQuestions.length}
            sx={{
              height: 300,
              width: 200,
              bgcolor: "white",
              "&:hover": { backgroundColor: "white" },
            }}
          >
            <Typography
              color="black"
              fontSize={13}
              dangerouslySetInnerHTML={
                renderMarkdown(
                  currentQuestionIndex < orderQuestions.length
                    ? orderQuestions[currentQuestionIndex]?.question
                    : "All questions have been asked."
                ) as { __html: string }
              }
            />
          </Button>
          <Button
            onClick={() => {
              if (
                !hasDragged &&
                currentQuestionIndex != orderQuestions.length
              ) {
                setIsFlipped((prev) => !prev);
              }
              setHasDragged(false);
            }}
            disabled={currentQuestionIndex >= orderQuestions.length}
            sx={{
              height: 300,
              width: 200,
              bgcolor: "white",
              "&:hover": { backgroundColor: "white" },
            }}
          >
            <Typography
              color="black"
              fontSize={13}
              dangerouslySetInnerHTML={
                renderMarkdown(
                  currentQuestionIndex < orderQuestions.length
                    ? orderQuestions[currentQuestionIndex]?.answer
                    : "All questions have been asked."
                ) as { __html: string }
              }
            />
          </Button>
        </ReactCardFlip>
      </motion.div>
      <Box display="flex" flexDirection="row" justifyContent="center" mt={2}>
        <Button
          onClick={() => handleSwipe(-1)}
          disabled={currentQuestionIndex === 0}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </Button>
        <Button
          onClick={
            currentQuestionIndex >= orderQuestions.length
              ? () => navigate("/firstPage")
              : handleClick
          }
        >
          {currentQuestionIndex >= orderQuestions.length ? (
            <FontAwesomeIcon icon={faHouse} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faArrowsRotate} />
          )}
        </Button>
        <Button
          onClick={() => handleSwipe(1)}
          disabled={currentQuestionIndex >= orderQuestions.length}
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionInterviewBox;
