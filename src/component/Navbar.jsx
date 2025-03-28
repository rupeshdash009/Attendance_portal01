import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar,
  Dialog, DialogContent, Alert, Menu, MenuItem,
  InputAdornment, Divider, useTheme, TextField
} from "@mui/material";
import { 
  School, Person, Email, Lock, Visibility, VisibilityOff
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled Components
const ModernDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    padding: theme.spacing(4),
    maxWidth: '450px',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[10]
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1976d2 0%, #2196F3 100%)',
  color: 'white',
  borderRadius: '10px',
  padding: '10px 24px',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[3],
    background: 'linear-gradient(45deg, #1565c0 0%, #1E88E5 100%)'
  }
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  margin: '0 12px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '0%',
    height: '2px',
    background: theme.palette.primary.main,
    transition: 'width 0.3s ease'
  },
  '&:hover:after': {
    width: '100%'
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary
  }
}));

function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openTeacherLogin, setOpenTeacherLogin] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  
  const isTeacherLoggedIn = localStorage.getItem("isTeacherLoggedIn") === "true";
  const isStudentLoggedIn = localStorage.getItem("isStudentLoggedIn") === "true";

  const validTeachers = [
    { id: "teacher@school.com", password: "Teach@123" },
    { id: "professor@school.com", password: "Prof@456" }
  ];
  const handleTeacherLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!teacherId || !teacherPassword) {
      setError("Please enter both Email and Password");
      return;
    }

    const teacher = validTeachers.find(
      t => t.id === teacherId && t.password === teacherPassword
    );

    if (teacher) {
      localStorage.setItem("isTeacherLoggedIn", "true");
      localStorage.setItem("teacherId", teacherId);
      setOpenTeacherLogin(false);
      navigate("/TeacherDashboard"); // Redirect to teacher dashboard
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleStudentLogin = () => {
    navigate("/Signup"); // Redirect to your student login route
  };
  
  // Replace the Student Portal button with this:
  <GradientButton
    variant="contained"
    onClick={handleStudentLogin} // This will now redirect to student login page
  >
    Student Portal
  </GradientButton>

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (isTeacherLoggedIn) {
      localStorage.removeItem("isTeacherLoggedIn");
      localStorage.removeItem("teacherId");
    } else {
      localStorage.removeItem("isStudentLoggedIn");
      localStorage.removeItem("studentId");
    }
    navigate("/");
    handleMenuClose();
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Seat Booking", path: "/Seatbooking" },
  ];

  return (
    <>
      <AppBar position="static" sx={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        py: 1
      }}>
        <Toolbar sx={{ 
          display: "flex", 
          justifyContent: "space-between",
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '0 24px !important'
        }}>
          {/* Left side - Logo and Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1976d2 0%, #2196F3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: "none",
                mr: 4
              }}
            >
              EduAttend
            </Typography>
            
            <Box sx={{ display: 'flex' }}>
              {menuItems.map((item) => (
                <NavButton 
                  key={item.name} 
                  component={Link} 
                  to={item.path}
                >
                  {item.name}
                </NavButton>
              ))}
            </Box>
          </Box>

          {/* Right side - Login */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isTeacherLoggedIn && !isStudentLoggedIn ? (
              <>
                <Button
                  variant="text"
                  onClick={() => setOpenTeacherLogin(true)}
                  sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 600,
                    mr: 2,
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      backgroundColor: 'rgba(25, 118, 210, 0.04)'
                    }
                  }}
                >
                  Teacher Login
                </Button>
                <GradientButton
                  variant="contained"
                  onClick={handleStudentLogin}
                >
                  Student Portal
                </GradientButton>
              </>
            ) : (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                  sx={{ ml: 2 }}
                >
                  <Avatar
                    sx={{ 
                      width: 36,
                      height: 36,
                      bgcolor: isTeacherLoggedIn ? theme.palette.primary.main : theme.palette.success.main,
                      color: 'white'
                    }}
                  >
                    {isTeacherLoggedIn ? <School /> : <Person />}
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                      minWidth: '200px',
                      overflow: 'visible',
                      mt: 1.5,
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  <MenuItem 
                    onClick={() => {
                      navigate(isTeacherLoggedIn ? "/teacher-dashboard" : "/student-dashboard");
                      handleMenuClose();
                    }}
                    sx={{ py: 1.5 }}
                  >
                    My Dashboard
                  </MenuItem>
                  <Divider />
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ py: 1.5, color: theme.palette.error.main }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Teacher Login Dialog */}
      <ModernDialog open={openTeacherLogin} onClose={() => setOpenTeacherLogin(false)}>
        <DialogContent>
          <Box textAlign="center" mb={3}>
            <Avatar sx={{ 
              bgcolor: theme.palette.primary.main, 
              width: 60, 
              height: 60,
              margin: '0 auto 16px'
            }}>
              <School sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h5" fontWeight="700" gutterBottom>
              Teacher Portal
            </Typography>
            <Typography color="text.secondary">
              Enter your credentials to access the dashboard
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleTeacherLogin}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={teacherPassword}
              onChange={(e) => setTeacherPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 3 }}
            />

            <GradientButton
              fullWidth
              type="submit"
              size="large"
              endIcon={<School />}
            >
              Login
            </GradientButton>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Trouble signing in? Contact admin@school.com
          </Typography>
        </DialogContent>
      </ModernDialog>
    </>
  );
}

export default Navbar;