import { Box } from "@mui/material";
import Header from "../components/Header";
import { t } from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import QuestionLearningBox from "../components/questionLearningBox";
import QuestionInterviewBox from "../components/questionInterviewBox";

const Learning = () => {
  const { languageType } = useAppContext();
  const { learningType } = useAppContext();
  console.log(learningType);
  let navigate = useNavigate();

  return (
    <Box>
      <Header
        titleHeader={t(languageType)}
        backArrow={true}
        handleClick={() => navigate(-1)}
      />
      <Box mt={"100px"}>
        {learningType == "INTERVIEW" ? (
          <QuestionInterviewBox />
        ) : (
          <QuestionLearningBox />
        )}
      </Box>
      <Box marginTop={"60px"}></Box>
    </Box>
  );
};

export default Learning;
