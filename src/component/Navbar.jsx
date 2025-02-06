import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Close } from "@mui/icons-material";  // Import Close icon

// Pages for navigation
const pages = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  { name: "Seat Booking", path: "/seatbooking" },
];

// Styled Components for UI elements
const StyledButton = styled(Button)({
  borderRadius: "50px",
  textTransform: "none",
  padding: "8px 20px",
  fontWeight: "500",
  color: "#333",
  '&:hover': { backgroundColor: "#1976d2" },
});

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
  '& .MuiInputBase-input': {
    color: "#fff",
  },
  '& .MuiInputLabel-root': {
    color: "#fff",
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: "#fff",
    },
    '&:hover fieldset': {
      borderColor: "#1976d2",
    },
  },
});

const SwitchLabel = styled(Typography)({
  color: "#fff",
  fontWeight: "600",
  textTransform: "uppercase",
});

const StyledButtonLogin = styled(Button)({
  borderRadius: "30px",
  textTransform: "none",
  fontWeight: "600",
  color: "#fff",
  backgroundColor: "#1976d2",
  padding: "12px 25px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#115293",
  },
});

const CreateAccountLink = styled(Typography)({
  marginTop: "15px",
  fontSize: "14px",
  color: "#fff",
  cursor: "pointer",
  "&:hover": {
    color: "#1976d2",
  },
});

// Navbar Component
function Navbar() {
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const [userType, setUserType] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [blurBackground, setBlurBackground] = useState(false); // State to control background blur

  const handleOpenLogin = () => {
    setBlurBackground(true); // Apply blur to the background
    setOpenLogin(true);
  };
  
  const handleCloseLogin = () => {
    setBlurBackground(false); // Remove the blur when dialog is closed
    setOpenLogin(false);
  };

  const handleLogin = () => {
    if (userType === "teacher") {
      if (username === "teacher123" && password === "adminpass") {
        alert("Teacher logged in successfully!");
        navigate("/Attendance"); // Redirect to the attendance page
      } else {
        alert("Invalid Teacher Credentials!");
      }
    } else {
      const storedUser = localStorage.getItem(username);
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
          alert("Student logged in successfully!");
          navigate("/home");
        } else {
          alert("Incorrect password!");
        }
      } else {
        if (creatingAccount) {
          // Create new student account
          localStorage.setItem(username, JSON.stringify({ password: newPassword }));
          alert("Account created successfully! You can now log in.");
          setCreatingAccount(false);
        } else {
          alert("No account found! Please create an account first.");
        }
      }
    }
    handleCloseLogin();
  };
  

  return (
    <AppBar position="sticky" sx={{ background: "#f5f5f5", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontFamily: "monospace",
            fontWeight: 600,
            color: "#333",
            textDecoration: "none",
            cursor: "pointer",
            transition: "color 0.3s ease",
            "&:hover": { color: "#1976d2" },
          }}
        >
          Attendance
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", flexGrow: 1 }}>
          {pages.map((page) => (
            <motion.div key={page.name} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <StyledButton component={Link} to={page.path}>
                {page.name}
              </StyledButton>
            </motion.div>
          ))}
        </Box>

        <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
          <IconButton onClick={handleOpenLogin}>
            <Avatar sx={{ bgcolor: "#1976d2", cursor: "pointer" }} />
          </IconButton>
        </motion.div>
      </Toolbar>

      {/* Background Blur Wrapper */}
      {blurBackground && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            zIndex: 1,
          }}
        ></Box>
      )}

      {/* Styled Login Dialog */}
      <StyledDialog open={openLogin} onClose={handleCloseLogin}>
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "26px", marginBottom: "20px", position: "relative" }}>
          {userType === "student" ? "Student Login" : "Teacher Login"}
          <IconButton
            onClick={handleCloseLogin}
            sx={{ position: "absolute", top: "10px", right: "10px", color: "#fff" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={<Switch checked={userType === "teacher"} onChange={() => setUserType(userType === "student" ? "teacher" : "student")} />}
            label={<SwitchLabel>{userType === "student" ? "Switch to Teacher" : "Switch to Student"}</SwitchLabel>}
          />
          <InputField
            fullWidth
            label="Username or ID"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {userType === "student" && !creatingAccount && (
            <CreateAccountLink onClick={() => setCreatingAccount(true)}>
              Create a new account
            </CreateAccountLink>
          )}

          {creatingAccount && userType === "student" && (
            <>
              <InputField
                fullWidth
                label="Create Password"
                type="password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <StyledButtonLogin onClick={handleLogin} variant="contained">
            {creatingAccount ? "Create Account" : "Login"}
          </StyledButtonLogin>
        </DialogActions>
      </StyledDialog>
    </AppBar>
  );
}

export default Navbar;
