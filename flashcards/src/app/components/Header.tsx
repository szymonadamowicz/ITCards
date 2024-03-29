import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

type Links = {
  titleHeader?: string;
};

const Header: React.FC<Links> = ({ titleHeader }) => {
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
      <Toolbar variant="dense" sx={{ 
          display: 'flex', 
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50px !important",
       }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {titleHeader?.toUpperCase()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
