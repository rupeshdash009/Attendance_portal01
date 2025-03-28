import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar,
  Dialog, DialogContent, Alert, Menu, MenuItem, Badge,
  InputAdornment, Divider, useTheme, TextField, Slide
} from "@mui/material";
import { 
  School, Person, Email, Lock, Visibility, VisibilityOff,
  Notifications, Dashboard, ExitToApp, Help, Home, Info
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

// Styled Components
const ModernDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius * 3,
    padding: theme.spacing(4),
    maxWidth: '450px',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[24],
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  borderRadius: '12px',
  padding: '12px 28px',
  fontWeight: 700,
  textTransform: 'none',
  letterSpacing: '0.5px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[6],
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
  }
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  margin: '0 8px',
  padding: '8px 12px',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    color: theme.palette.primary.main,
    transform: 'translateY(-1px)'
  },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 700
  }
}));

const NotificationBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 5,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: theme.palette.error.main
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
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  
  const isTeacherLoggedIn = localStorage.getItem("isTeacherLoggedIn") === "true";
  const isStudentLoggedIn = localStorage.getItem("isStudentLoggedIn") === "true";
  const notifications = []; // You can populate this with actual notifications

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
      navigate("/TeacherDashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleStudentLogin = () => {
    navigate("/Signup");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotifAnchorEl(null);
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
    { name: "Home", path: "/", icon: <Home sx={{ mr: 1 }} /> },
    { name: "About", path: "/about", icon: <Info sx={{ mr: 1 }} /> },
    { name: "Seat Booking", path: "/Seatbooking", icon: <Dashboard sx={{ mr: 1 }} /> },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ 
        background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(18, 18, 18, 0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        py: 0.5
      }}>
        <Toolbar sx={{ 
          display: "flex", 
          justifyContent: "space-between",
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          px: { xs: 2, md: 4 } 
        }}>
          {/* Left side - Logo and Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: "none",
                mr: { xs: 2, md: 4 },
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <School sx={{ mr: 1, fontSize: 28 }} />
              EduAttend
            </Typography>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {menuItems.map((item) => (
                <NavButton 
                  key={item.name} 
                  component={Link} 
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.name}
                </NavButton>
              ))}
            </Box>
          </Box>

          {/* Right side - Login/Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isTeacherLoggedIn && !isStudentLoggedIn ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setOpenTeacherLogin(true)}
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    mr: 1,
                    px: 2.5,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.04)
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
                  size="medium"
                  aria-label="notifications"
                  onClick={handleNotifOpen}
                  sx={{ 
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08)
                    }
                  }}
                >
                  <NotificationBadge badgeContent={notifications.length} color="error">
                    <Notifications />
                  </NotificationBadge>
                </IconButton>
                
                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  onClick={handleMenuOpen}
                  sx={{ 
                    ml: 1,
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <Avatar
                    sx={{ 
                      width: 36,
                      height: 36,
                      bgcolor: isTeacherLoggedIn ? theme.palette.primary.main : theme.palette.success.main,
                      color: 'white',
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
                    }}
                  >
                    {isTeacherLoggedIn ? <School /> : <Person />}
                  </Avatar>
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Teacher Login Dialog */}
      <ModernDialog 
        open={openTeacherLogin} 
        onClose={() => setOpenTeacherLogin(false)}
        TransitionComponent={Slide}
        transitionDuration={300}
      >
        <DialogContent>
          <Box textAlign="center" mb={3}>
            <Avatar sx={{ 
              bgcolor: theme.palette.primary.main, 
              width: 72, 
              height: 72,
              margin: '0 auto 16px',
              boxShadow: theme.shadows[4]
            }}>
              <School sx={{ fontSize: 36 }} />
            </Avatar>
            <Typography variant="h5" fontWeight="700" gutterBottom>
              Educator Access
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Sign in to manage your classroom attendance
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleTeacherLogin} noValidate>
            <TextField
              fullWidth
              label="Institutional Email"
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
                      sx={{ color: theme.palette.text.secondary }}
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
              sx={{ mb: 2 }}
            >
              Access Dashboard
            </GradientButton>

            <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
              <Link to="#" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </Typography>
          </Box>
        </DialogContent>
      </ModernDialog>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 6,
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: '12px',
            overflow: 'visible',
            boxShadow: theme.shadows[10],
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
          onClick={() => {
            navigate(isTeacherLoggedIn ? "/TeacherDashboard" : "/Dashboard");
            handleMenuClose();
          }}
          sx={{ py: 1.5, borderRadius: '8px', mt: 0.5 }}
        >
          <Dashboard sx={{ mr: 1.5, color: theme.palette.primary.main }} />
          Dashboard
        </MenuItem>
        <MenuItem 
          onClick={() => {
            navigate("/profile");
            handleMenuClose();
          }}
          sx={{ py: 1.5, borderRadius: '8px' }}
        >
          <Person sx={{ mr: 1.5, color: theme.palette.info.main }} />
          My Profile
        </MenuItem>
        <MenuItem 
          onClick={() => {
            navigate("/help");
            handleMenuClose();
          }}
          sx={{ py: 1.5, borderRadius: '8px' }}
        >
          <Help sx={{ mr: 1.5, color: theme.palette.warning.main }} />
          Help Center
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem 
          onClick={handleLogout}
          sx={{ 
            py: 1.5, 
            borderRadius: '8px',
            color: theme.palette.error.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.error.main, 0.08)
            }
          }}
        >
          <ExitToApp sx={{ mr: 1.5 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notifAnchorEl}
        open={Boolean(notifAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 6,
          sx: {
            mt: 1.5,
            width: 320,
            borderRadius: '12px',
            overflow: 'visible',
            boxShadow: theme.shadows[10],
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="600">
            Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {notifications.length} new alerts
          </Typography>
        </Box>
        <Divider />
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <MenuItem key={index} sx={{ py: 1.5 }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="body2" fontWeight="500">
                  {notification.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {notification.message}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Notifications sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
            <Typography variant="body1" color="text.secondary">
              No new notifications
            </Typography>
          </Box>
        )}
      </Menu>
    </>
  );
}

export default Navbar;