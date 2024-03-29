import { Box } from "@mui/material";
import Header from "../components/Header";
import { t } from "i18next";
import React from "react";
import LanguageBox from "../components/languageBox";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Developer = () => {
    const { developerType} = useAppContext();
    const { changeLanguageType } = useAppContext();
    let navigate = useNavigate();
  
    console.log(developerType);
  
    const renderLanguageBox = () => {
      let languages: string[] | undefined = [];
      switch (developerType) {
        case "FRONT-END Developer":
          languages = ["JAVASCRIPT", "REACT", "ANGULAR"];
          break;
        case "BACK-END Developer":
          languages = ["C#", "NODE.JS", "PHP"];
          break;
        case "FULLSTACK Developer":
          languages = ["JAVASCRIPT", "REACT", "ANGULAR", "C#", "NODE.JS", "PHP"];
          break;
        default:
          languages = [];
      }
  
      return (
        <LanguageBox
          Language={languages}
          handleClick={(type: string) => {
            changeLanguageType(type);
            navigate("/language");
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
        <Header titleHeader={t(developerType)} />
        <Box marginTop={"60px"}>{renderLanguageBox()}</Box>
      </Box>
    );
  };
  
  export default Developer;
  