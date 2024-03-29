import { Box, Button, Grid, SxProps, Theme, Typography } from "@mui/material"
import React from "react"

type DeveloperType = {
    Developer?: string[]
    styles?: SxProps<Theme>;
    handleClick?: (type: string) => void;
}

const DeveloperBox = ({ Developer, styles, handleClick }: DeveloperType) => {
    return(
        <Box>
            {Developer?.map((item, index) => (
                <Grid item key={item} >
                    <Button
                    onClick={() => handleClick && handleClick(item)}
                        sx={
                            styles
                        }>
                        <Typography color={"black"}>{item}</Typography>
                    </Button>
                </Grid>
            ))}
        </Box>
    )
}

export default DeveloperBox