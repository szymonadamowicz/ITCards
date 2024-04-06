import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import LoginContainer from "../components/loginContainer";
import Register from "../components/registerContainer";
import Header from "../components/Header";
import { t } from "i18next";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box>
      <Header titleHeader={t("Infiszki")} />
      <Box
        paddingTop={"60px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        {isLogin ? <LoginContainer /> : <Register />}
        <Button onClick={toggleForm} sx={{ width: "400px", marginTop: "30px" }}>
          <Typography>
            {isLogin
              ? "Don't have an account? Register"
              : "Have an account? Login"}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
