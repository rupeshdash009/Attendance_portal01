import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

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
  "&:hover": { backgroundColor: "#1976d2" },
});

// Navbar Component
function Navbar() {
  const navigate = useNavigate(); // For navigation

  const handleAvatarClick = () => {
    navigate("/Signup"); // Redirect to login page
  };

  return (
    <AppBar position="sticky" sx={{ background: "#f5f5f5", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Title */}
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

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", flexGrow: 1 }}>
          {pages.map((page) => (
            <motion.div key={page.name} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <StyledButton component={Link} to={page.path}>
                {page.name}
              </StyledButton>
            </motion.div>
          ))}
        </Box>

        {/* Login Avatar */}
        <IconButton onClick={handleAvatarClick}>
          <Avatar sx={{ bgcolor: "#1976d2", cursor: "pointer" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
