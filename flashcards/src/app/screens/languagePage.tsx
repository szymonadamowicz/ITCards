import { Box } from "@mui/material";
import Header from "../components/Header";
import { t } from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import ContainerBox from "../components/containerBox";

const Developer = () => {
  const { languageType } = useAppContext();
  const { changeLearningType } = useAppContext();
  const { developerType } = useAppContext();

  let navigate = useNavigate();

  console.log(languageType, developerType);

  const renderLanguageBox = () => {
    let languages: string[] | undefined = [];
    switch (languageType) {
      case "JAVASCRIPT":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      case "REACT":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      case "ANGULAR":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      case "C#":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      case "NODE.JS":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      case "PHP":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      case "JAVASCRIPT":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      case "REACT":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      case "ANGULAR":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      case "C#":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      case "NODE.JS":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      case "PHP":
        languages = ["INTERVIEW", "LEARNING"];
        break;
      default:
        languages = [];
    }

    return (
      <ContainerBox
        Content={languages}
        handleClick={(type: string) => {
          changeLearningType(type);
          navigate("/learning");
        }}
        styles={{
          height: "50px",
          width: "100%",
          marginTop: "10px",
          backgroundColor: "red",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "red",
          },
        }}
      />
    );
  };

  return (
    <Box>
      <Header
        titleHeader={t(languageType)}
        backArrow={true}
        handleClick={() => navigate(-1)}
      />
      <Box marginTop={"60px"}>{renderLanguageBox()}</Box>
    </Box>
  );
};

export default Developer;
