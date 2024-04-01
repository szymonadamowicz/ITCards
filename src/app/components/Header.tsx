import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

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
        top: 0,
        width: "100%",
        height: "50px",
        boxShadow: "1px 1px 8px black",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50px !important",
        }}
      >
        {backArrow ? (
          <Button
            onClick={() => handleClick && handleClick()}
            sx={{ position: "absolute", left: 0, color: "white" }}
          >
            asd
          </Button>
        ) : null}

        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {titleHeader?.toUpperCase()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
