import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e: any) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Mock login validation
    if (email === "demouser@yopmail.com" && password === "password123") {
      alert("Login successful!");
      localStorage.setItem("authToken", "user_logged_in");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <Container sx={{ position: "absolute", top: "40vh", width: "40vw" }}>
        <Box
          sx={{ mt: 8, p: 4, border: "1px solid #ccc", borderRadius: "8px" }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleLogin}>
            <TextField
              sx={{ backgroundColor: "white" }}
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ backgroundColor: "white" }}
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
              className="loginBtn"
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}
