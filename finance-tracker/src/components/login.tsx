import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../shared/services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const api = new ApiService();

  const handleLogin = async () => {
    if (isSignUp) return;

    if (!email || !password) {
      setError("Both email and password are required for login.");
      setOpen(true);
      return;
    }
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("authToken", response.token);
      navigate("/dashboard");
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Login failed!";
      setError(errorMessage);
      setOpen(true);
    }
  };

  const handleSignup = async () => {
    if (!isSignUp) {
      setIsSignUp(true);
      return;
    }

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields for sign up.");
      setOpen(true);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setOpen(true);
      return;
    }

    try {
      const response = await api.post("/auth/register", { email, password });
      setSuccessMessage(response.message || "Registration successful!");
      setOpen(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsSignUp(false);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Registration failed!";
      setError(errorMessage);
      setOpen(true);
    }
  };

  return (
    <>
      <div className="login-container">
        <Container sx={{ width: "40vw" }}>
          <Box className="login-box">
            <Typography variant="h4" align="center" gutterBottom>
              {isSignUp ? "Sign Up" : "Login"}
            </Typography>
            <form>
              <TextField
                sx={{ backgroundColor: "white" }}
                fullWidth
                label="Email"
                variant="filled"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                sx={{ backgroundColor: "white" }}
                fullWidth
                label="Password"
                type="password"
                variant="filled"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isSignUp && (
                <TextField
                  sx={{ backgroundColor: "white" }}
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  variant="filled"
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}
              <Button
                fullWidth
                variant="contained"
                type="button"
                onClick={handleLogin}
                disabled={isSignUp}
                sx={{ mt: 2 }}
                className="login-btn"
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="contained"
                type="button"
                onClick={handleSignup}
                sx={{ mt: 2 }}
                className="signup-btn"
              >
                Sign Up
              </Button>
            </form>
          </Box>
        </Container>
      </div>

      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={successMessage ? "success" : "error"}
          sx={{ width: "80%" }}
        >
          {successMessage ? successMessage : error}
        </Alert>
      </Snackbar>
    </>
  );
}
