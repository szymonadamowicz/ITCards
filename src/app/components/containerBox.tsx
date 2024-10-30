import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

type DeveloperType = {
  Content?: string[];
  handleClick?: (type: string) => void;
};

const ContainerBox = ({ Content, handleClick }: DeveloperType) => {
  return (
    <Box>
      {Content?.map((item, index) => (
        <Grid item key={item}>
          <Button
            onClick={() => handleClick && handleClick(item)}
            sx={{
              height: "70px",
              width: "100%",
              marginTop: "30px",
              backgroundColor: "white",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            <Typography color={"black"}>{item}</Typography>
          </Button>
        </Grid>
      ))}
    </Box>
  );
};

export default ContainerBox;
