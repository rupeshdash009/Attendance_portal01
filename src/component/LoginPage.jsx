// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Switch, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Close } from "@mui/icons-material";

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    padding: "30px",
    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.65))",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    width: "100%",
    maxWidth: "420px",
    margin: "auto",
    backdropFilter: "blur(10px)",
  },
});

const InputField = styled(TextField)({
  marginBottom: "20px",
  '& .MuiInputBase-input': { color: "#fff" },
  '& .MuiInputLabel-root': { color: "#fff" },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: "#fff" },
    '&:hover fieldset': { borderColor: "#1976d2" },
  },
});

const StyledButtonLogin = styled(Button)({
  borderRadius: "30px",
  textTransform: "none",
  fontWeight: "600",
  color: "#fff",
  backgroundColor: "#1976d2",
  padding: "12px 25px",
  transition: "background-color 0.3s ease",
  "&:hover": { backgroundColor: "#115293" },
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const handleLogin = () => {
    if (!username) {
      alert("Please enter your username!");
      return;
    }

    if (userType === "teacher") {
      if (!password) {
        alert("Please enter your password!");
        return;
      }
      if (username === "teacher123" && password === "adminpass") {
        alert("Teacher logged in successfully!");
        handleClose();
        navigate("/Attendance");
      } else {
        alert("Invalid Teacher Credentials!");
      }
    } else {
      const storedUser = localStorage.getItem(username);
      if (!storedUser) {
        alert("No account found! Please create an account first.");
        return;
      }

      const userData = JSON.parse(storedUser);
      if (userData.password === password) {
        alert("Student logged in successfully!");
        handleClose();
        navigate("/home");
      } else {
        alert("Incorrect password!");
      }
    }
  };

  const handleCreateAccount = () => {
    if (!username) {
      alert("Please enter a username!");
      return;
    }
    if (!newPassword) {
      alert("Please enter a password!");
      return;
    }

    if (localStorage.getItem(username)) {
      alert("User already exists! Please log in.");
      setCreatingAccount(false);
      return;
    }

    localStorage.setItem(username, JSON.stringify({ password: newPassword }));
    alert("Account created successfully! You can now log in.");
    setCreatingAccount(false);
    setNewPassword("");
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "26px", marginBottom: "20px", position: "relative" }}>
        {userType === "student" ? (creatingAccount ? "Create Student Account" : "Student Login") : "Teacher Login"}
        <IconButton onClick={handleClose} sx={{ position: "absolute", top: "10px", right: "10px", color: "#fff" }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={<Switch checked={userType === "teacher"} onChange={() => { setUserType(userType === "student" ? "teacher" : "student"); setCreatingAccount(false); }} />}
          label={
            <Typography sx={{ color: "#fff", fontWeight: "600", textTransform: "uppercase" }}>
              {userType === "student" ? "Switch to Teacher" : "Switch to Student"}
            </Typography>
          }
        />
        <InputField fullWidth label="Username or ID" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
        
        {creatingAccount ? (
          <InputField fullWidth label="Create Password" type="password" variant="outlined" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        ) : (
          <InputField fullWidth label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
        )}

        {userType === "student" && !creatingAccount && (
          <Typography
            onClick={() => setCreatingAccount(true)}
            sx={{
              marginTop: "15px",
              fontSize: "14px",
              color: "#fff",
              cursor: "pointer",
              "&:hover": { color: "#1976d2" },
            }}
          >
            Create a new account
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        {creatingAccount ? (
          <StyledButtonLogin onClick={handleCreateAccount} variant="contained">Create Account</StyledButtonLogin>
        ) : (
          <StyledButtonLogin onClick={handleLogin} variant="contained">Login</StyledButtonLogin>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default LoginPage;
