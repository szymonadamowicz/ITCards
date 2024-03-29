import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/Header";
import { t } from "i18next";
import DeveloperBox from "./../components/developerBox";
import { useAppContext } from "../context/appContext"; 

const FirstPage = () => {
  let navigate = useNavigate();
  const { changeDeveloperType } = useAppContext(); 

  return (
    <Box>
      <Header titleHeader={t("Infiszki")} />
      <Box marginTop={"60px"}>
        <DeveloperBox
          Developer={[
            "FRONT-END Developer",
            "BACK-END Developer",
            "FULLSTACK Developer",
          ]}
          handleClick={(type: string) => {
            changeDeveloperType(type);
            navigate("/developer");
          }}
          styles={{
            height: "50px",
            width: "100%",
            marginTop: "10px",
            backgroundColor: "red",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            '&:hover': {
              backgroundColor: "red",
            },
          }}
          />
          </Box>
        </Box>
      );
    };

export default FirstPage;
