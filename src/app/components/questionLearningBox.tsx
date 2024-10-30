import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppContext } from "../context/appContext";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import { marked } from "marked";
import {
  faArrowsRotate,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import fetchAllCards, { toggleLike } from "../backend/axios";

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

const QuestionInterviewBox: React.FC = () => {
  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const { languageType } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [orderQuestions, setOrderQuestions] = useState<Question[]>([]);
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
    setOrderQuestions(questionData);
    setCurrentQuestionIndex(0);
  }, [languageType, questionData]);

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
      height={"80vh"}
      gap={5}
    >
      <Box>
        <Typography textAlign={"center"} fontSize={24}>
          {currentQuestionIndex}/{orderQuestions.length}
        </Typography>
        <progress
          value={currentQuestionIndex / orderQuestions.length}
          style={{ width: 250, height: 10, backgroundColor: "blue" }}
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
                currentQuestionIndex !== orderQuestions.length
              ) {
                setIsFlipped((prev) => !prev);
              }
              setHasDragged(false);
            }}
            disabled={currentQuestionIndex >= orderQuestions.length}
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
              fontSize={isMobile ? 20 : 24}
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
                currentQuestionIndex !== orderQuestions.length
              ) {
                setIsFlipped((prev) => !prev);
              }
              setHasDragged(false);
            }}
            disabled={currentQuestionIndex >= orderQuestions.length}
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
              fontSize={isMobile ? 16 : 24}
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

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignContent={"center"}
        alignItems={"center"}
      >
        <Button
          onClick={() => handleSwipe(-1)}
          disabled={currentQuestionIndex === 0}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
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
