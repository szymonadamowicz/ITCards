import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/Header";
import { t } from "i18next";
import ContainerBox from "../components/containerBox";
import { useAppContext } from "../context/appContext";

const FirstPage = () => {
  let navigate = useNavigate();
  const { changeDeveloperType } = useAppContext();
  return (
    <Box>
      <Header titleHeader={t("ITCards")} />
      <Box marginTop={"105px"}>
        <ContainerBox
          Content={[
            "FRONT-END Developer",
            "BACK-END Developer",
            "FULLSTACK Developer",
          ]}
          handleClick={(type: string) => {
            changeDeveloperType(type);
            navigate("/developer");
          }}
          
        />
      </Box>
    </Box>
  );
};

export default FirstPage;
