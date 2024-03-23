import { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const LoginSignup = ({ login, signup }) => {
  const INITIAL_STATE = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  };
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Username:", formData.username);
    console.log("Password:", formData.password);

    if (isLoginMode) {
      // Login logic
      console.log("Login:", formData.username, formData.password);
      try {
        const response = await login({
          username: formData.username,
          password: formData.password,
        });

        if (response.success) navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      // Register logic
      console.log("Register:", formData);
      try {
        const response = await signup({
          username: formData.username,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
        });
        if (response.success) navigate("/");
      } catch (error) {
        console.error("Signup failed:", error);
      }
    }

    // Clear the form after submission
    // setFormData(INITIAL_STATE);
  };

  return (
    <div className="login-display">
      <Paper className="paper" elevation={3}>
        <Typography variant="h4" gutterBottom className="text">
          {isLoginMode ? "Login" : "Register"}
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            className="input-box"
            label="Username"
            variant="filled"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <TextField
            className="input-box"
            type="password"
            label="Password"
            variant="filled"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
           {!isLoginMode && (
            <>
              <TextField
                className="input-box"
                label="First Name"
                variant="filled"
                required
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
              <TextField
                className="input-box"
                label="Last Name"
                variant="filled"
                required
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
               <TextField
                className="input-box"
                label="email"
                variant="filled"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </>
          )}
          <Button className="button" type="submit" variant="contained">
            {isLoginMode ? "Login" : "Register"}
          </Button>
          <Typography
            variant="body1"
            className="switch-text"
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? "New to PRIMAL? Register here" : "Already have an account? Login here"}
          </Typography>
        </form>
      </Paper>
    </div>
  );
            }

export default LoginSignup;
