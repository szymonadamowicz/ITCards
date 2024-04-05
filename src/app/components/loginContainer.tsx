import React, { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar } from "@mui/material";
import { register, login } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginContainer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  let navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setSnackbarMessage("Email and password are required");
      setOpenSnackbar(true);
      return;
    }
    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;
      console.log("Logged In User:", user);
      setSnackbarMessage("Login successful!");
      navigate("/firstPage");
    } catch (error: any) {
      console.error("Login Error:", error.message);
      setSnackbarMessage(`Login failed: Invalid Email or password`);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box
        bgcolor="red"
        p={5}
        borderRadius={2}
        boxShadow="10px 10px 20px #ccc"
        display="flex"
        flexDirection="column"
        alignItems="center"
        width={400}
      >
        <Typography variant="h6" mb={4}>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Box>
    </Box>
  );
};

export default LoginContainer;
