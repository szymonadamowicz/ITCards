import { Box, Button, Grid, SxProps, Theme, Typography } from "@mui/material";
import React from "react";

type DeveloperType = {
  Content?: string[];
  styles?: SxProps<Theme>;
  handleClick?: (type: string) => void;
};

const ContainerBox = ({ Content, styles, handleClick }: DeveloperType) => {
  return (
    <Box>
      {Content?.map((item, index) => (
        <Grid item key={item}>
          <Button onClick={() => handleClick && handleClick(item)} sx={styles}>
            <Typography color={"black"}>{item}</Typography>
          </Button>
        </Grid>
      ))}
    </Box>
  );
};

export default ContainerBox;
