import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppContext } from "../context/appContext";
import fetchAllCards, { toggleLike } from "../backend/axios";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import { marked } from "marked";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faHeart,
  faHouse,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  answer: string;
}

interface QuestionData {
  id: string;
  question: string;
  answer: string;
  liked: boolean;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const QuestionInterviewBox: React.FC = () => {
  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const { languageType } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [, setHasSwiped] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960);

  const handleLike = (id: number) => {
    toggleLike(id);
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    const loadData = async () => {
      if (languageType !== null) {
        const cardsData = await fetchAllCards(languageType);

        if (cardsData !== null) {
          setQuestionData(cardsData);
        }
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let shuffledQuestionsCopy = [...questionData];
    shuffleArray(shuffledQuestionsCopy);
    setShuffledQuestions(shuffledQuestionsCopy);
    setCurrentQuestionIndex(0);
  }, [languageType, questionData]);

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
      height={"80vh"}
      gap={5}
    >
      <Box>
        <Typography textAlign={"center"} fontSize={24}>
          {currentQuestionIndex}/{shuffledQuestions.length}
        </Typography>
        <progress
          style={{ width: 250, height: 10 }}
          value={currentQuestionIndex / shuffledQuestions.length}
        />
      </Box>
      <motion.div
        key={currentQuestionIndex}
        custom={swipeDirection}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 180, damping: 20 },
          opacity: { duration: 0.4 },
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
                currentQuestionIndex !== shuffledQuestions.length
              ) {
                setIsFlipped((prev) => !prev);
              }
              setHasDragged(false);
            }}
            disabled={currentQuestionIndex >= shuffledQuestions.length}
            sx={{
              height: isMobile ? 310 : 400,
              width: isMobile ? 280 : 350,
              padding: 15,
              bgcolor: "white",
              "&:hover": { backgroundColor: "white" },
            }}
          >
            <Typography
              minWidth={isMobile ? 230 : 300}
              minHeight={isMobile ? 230 : 350}
              maxHeight={300}
              maxWidth={300}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              color="black"
              textTransform="none"
              fontSize={isMobile ? 18 : 24}
              dangerouslySetInnerHTML={
                renderMarkdown(
                  currentQuestionIndex < shuffledQuestions.length
                    ? t(shuffledQuestions[currentQuestionIndex]?.question)
                    : t("All questions have been asked.")
                ) as { __html: string }
              }
            />
          </Button>
          <Button
            onClick={() => {
              if (
                !hasDragged &&
                currentQuestionIndex !== shuffledQuestions.length
              ) {
                setIsFlipped((prev) => !prev);
              }
              setHasDragged(false);
            }}
            disabled={currentQuestionIndex >= shuffledQuestions.length}
            sx={{
              height: isMobile ? 310 : 400,
              width: isMobile ? 280 : 350,
              padding: 15,
              bgcolor: "white",
              "&:hover": { backgroundColor: "white" },
            }}
          >
            <Typography
              minWidth={isMobile ? 230 : 300}
              minHeight={isMobile ? 230 : 350}
              maxHeight={300}
              maxWidth={300}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              color="black"
              textTransform="none"
              fontSize={isMobile ? 18 : 24}
              dangerouslySetInnerHTML={
                renderMarkdown(
                  currentQuestionIndex < shuffledQuestions.length
                    ? t(shuffledQuestions[currentQuestionIndex]?.answer)
                    : t("All questions have been asked.")
                ) as { __html: string }
              }
            />
          </Button>
        </ReactCardFlip>
      </motion.div>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Button
          onClick={
            currentQuestionIndex >= shuffledQuestions.length
              ? () => navigate("/firstPage")
              : handleClick
          }
        >
          {currentQuestionIndex >= shuffledQuestions.length ? (
            <FontAwesomeIcon icon={faHouse} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faRotate} size="lg" />
          )}
        </Button>
        {currentQuestionIndex < questionData.length && (
          <Button
            onClick={() =>
              handleLike(Number(questionData[currentQuestionIndex].id))
            }
          >
            <FontAwesomeIcon
              icon={faHeart}
              size="lg"
              style={{
                color: questionData[currentQuestionIndex]?.liked
                  ? "red"
                  : "grey",
              }}
            />
          </Button>
        )}
        <Button
          onClick={() => handleSwipe(1)}
          disabled={currentQuestionIndex >= shuffledQuestions.length}
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionInterviewBox;
