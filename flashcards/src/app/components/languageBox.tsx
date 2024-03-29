import { Box, Button, Grid, SxProps, Theme, Typography } from "@mui/material"
import React from "react"

type DeveloperType = {
    Language?: string[]
    styles?: SxProps<Theme>;
    handleClick?: (type: string) => void;
}

const LanguageBox = ({ Language, styles, handleClick }: DeveloperType) => {
    return(
        <Box>
            {Language?.map((item, index) => (
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

export default LanguageBox