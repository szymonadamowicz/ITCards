import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Snackbar } from "@mui/material";
import { register } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { userName } = useAppContext();
  const { changeUserName } = useAppContext();

  let navigate = useNavigate();
  console.log(userName);
  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  useEffect(() => {
    changeUserName("");
  }, []);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !userName) {
      setSnackbarMessage("Please fill in all fields.");
      setOpenSnackbar(true);
      return;
    }

    if (!validateEmail(email)) {
      setSnackbarMessage("The email address is not valid.");
      setOpenSnackbar(true);
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const userCredential = await register(email, password);
      console.log("Registered User:", userCredential.user);
      setSnackbarMessage("Registration successful!");
      navigate("/firstPage");
    } catch (error: any) {
      console.error("Registration Error:", error);

      let errorMessage = "Registration failed. Please try again.";
      if (error.code === "too weak password, minimum 6 characters") {
        errorMessage = "Registration failed: The password is too weak.";
      } else if (error.code) {
        errorMessage = `Registration failed: ${error.message}`;
      }

      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box
        bgcolor="white"
        p={5}
        borderRadius={2}
        boxShadow="10px 10px 20px #ccc"
        display="flex"
        flexDirection="column"
        alignItems="center"
        width={400}
      >
        <Typography variant="h6" mb={4}>
          Register
        </Typography>

        <TextField
          label="Name"
          variant="outlined"
          value={userName}
          onChange={(e) => changeUserName(e.target.value)}
          fullWidth
          margin="normal"
        />
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
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
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

export default Register;
