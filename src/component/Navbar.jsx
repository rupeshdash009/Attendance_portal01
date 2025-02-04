import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion"; // For animations

const pages = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  { name: "SeatBooking", path: "/seatbooking" },
];

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
  textTransform: "none",
  padding: "8px 20px",
  fontWeight: "500",
  color: "#333", // Dark gray for minimalism
  '&:hover': {
    backgroundColor: "#e0e0e0", // Light gray on hover
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "15px",
    padding: "20px",
    backgroundColor: "#f5f5f5", // Soft light gray
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [userType, setUserType] = React.useState("student");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogin = () => {
    if (userType === "teacher") {
      if (username === "teacher123" && password === "adminpass") {
        alert("Teacher logged in successfully!");
      } else {
        alert("Invalid Teacher Credentials!");
      }
    } else {
      const storedUser = localStorage.getItem(username);
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
          alert("Student logged in successfully!");
        } else {
          alert("Incorrect password!");
        }
      } else {
        alert("No account found! Please create a profile first.");
      }
    }
    handleCloseLogin();
  };

  const handleCreateProfileRedirect = () => {
    navigate("/create-profile");
  };

  return (
    <AppBar position="sticky" sx={{ background: "#f5f5f5", boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* Logo/Title */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 600,
              color: "#333", // Dark gray for minimalistic style
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "#1976d2", // Blue hover effect
              },
            }}
          >
            Attendance
          </Typography>

          {/* Mobile Menu Toggle */}
          <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={handleMenuToggle}>
            <MenuIcon sx={{ color: "#333" }} />
          </IconButton>

          {/* Menu Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", flexGrow: 1 }}>
            {pages.map((page) => (
              <motion.div
                key={page.name}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StyledButton component={Link} to={page.path}>
                  {page.name}
                </StyledButton>
              </motion.div>
            ))}
          </Box>

          {/* Login Icon */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Tooltip title="Login">
              <IconButton onClick={handleOpenLogin} sx={{ p: 0 }}>
                <Avatar alt="Login Icon" src="" sx={{ bgcolor: "#1976d2", cursor: "pointer" }} />
              </IconButton>
            </Tooltip>
          </motion.div>
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <Box sx={{ display: { xs: "block", md: "none" }, backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
          {pages.map((page) => (
            <MenuItem key={page.name} component={Link} to={page.path} sx={{ color: "#333", textAlign: "center", margin: "10px 0" }}>
              {page.name}
            </MenuItem>
          ))}
        </Box>
      )}

      {/* Login Dialog */}
      <StyledDialog open={openLogin} onClose={handleCloseLogin}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>Login</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Username or ID"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <StyledButton onClick={() => setUserType("student")} variant={userType === "student" ? "contained" : "outlined"}>Student</StyledButton>
          <StyledButton onClick={() => setUserType("teacher")} variant={userType === "teacher" ? "contained" : "outlined"}>Teacher</StyledButton>
          <StyledButton onClick={handleLogin} variant="contained" color="primary">Login</StyledButton>
          {userType === "student" && (
            <StyledButton onClick={handleCreateProfileRedirect} variant="contained" color="secondary">
              Create Profile
            </StyledButton>
          )}
        </DialogActions>
      </StyledDialog>
    </AppBar>
  );
}

export default Navbar;
