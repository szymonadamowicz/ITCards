import React from "react";
import { AppBar, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

type Links = {
  titleHeader?: string;
  handleClick?: (type?: string) => void;
  backArrow?: boolean;
};

const Header: React.FC<Links> = ({ titleHeader, handleClick, backArrow }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#122D7B",
        top: 0,
        width: "100%",
        height: "75px",
        boxShadow: "1px 1px 8px black",
        justifyContent:"center"
      }}
    >
        {backArrow ? (
          <Button
            onClick={() => handleClick && handleClick()}
            sx={{ position: "absolute", left: 0, color: "white" }}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </Button>
        ) : null}

        <Typography variant="h5" alignSelf={"center"}>
          {titleHeader?.toUpperCase()}
        </Typography>
    </AppBar>
  );
};

export default Header;
