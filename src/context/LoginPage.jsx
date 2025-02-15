
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useAuth } from "../context/Authcontext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
};
  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
          boxShadow: 1,
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5" color="#ff6b6b" mb={2}>
          Log in to the Privily Admin Portal
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"} // Change type based on showPassword
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          {error && <Typography color="error">{error}</Typography>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mb: 2,
              backgroundColor: "#ff6b6b",
              "&:hover": { backgroundColor: "#e55a5a" },
            }}
          >
            Log in
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
