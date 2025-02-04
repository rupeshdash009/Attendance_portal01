import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Grid, CircularProgress, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled components for the new UI

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "#20232a",  // Dark background
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(3),
}));

const ContentBox = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1000px",
  padding: theme.spacing(5),
  backgroundColor: "#282c34", // Dark gray content area
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
}));

const Header = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "700",
  marginBottom: theme.spacing(4),
  color: "#f1f1f1", // White color for text
  textAlign: "center",
}));

const CourseSelect = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: "100%",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: "1.1rem",
  borderRadius: "30px",
  fontWeight: "bold",
  backgroundColor: "#61dafb", // Light blue background
  color: "#20232a", // Dark text color
  "&:hover": {
    backgroundColor: "#4fa3f7", // Darker blue on hover
  },
  transition: "background-color 0.3s ease",
}));

const AttendanceButton = styled(Button)(({ theme, status }) => ({
  backgroundColor:
    status === "present" ? "#4CAF50" : // Green for present
    status === "absent" ? "#F44336" : // Red for absent
    status === "late" ? "#FF9800" : "#444", // Yellow-Orange for late
  color: "#fff",
  fontWeight: "500",
  borderRadius: "8px",
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  width: "100%",
  textTransform: "none",
  "&:hover": {
    backgroundColor:
      status === "present" ? "#388e3c" : // Darker green for present
      status === "absent" ? "#d32f2f" : // Darker red for absent
      status === "late" ? "#f57c00" : "#444", // Darker yellow-orange for late
  },
  transition: "background-color 0.3s ease",
}));

const StudentCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#333",
  padding: theme.spacing(2),
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
  color: "#fff", // White text inside the card
  textAlign: "center",
  transition: "box-shadow 0.3s ease, transform 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-10px)",
  },
}));

const GridContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const TakeAttendance = () => {
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [period, setPeriod] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  // Simulate fetching the student list for the selected course
  const fetchStudents = (selectedCourse) => {
    setLoading(true);
    setTimeout(() => {
      if (selectedCourse === "BBA") {
        setStudents(
          Array.from({ length: 60 }, (_, i) => ({
            id: i + 1,
            name: `Student ${i + 1}`,
          }))
        );
      } else if (selectedCourse === "BCA") {
        setStudents(
          Array.from({ length: 30 }, (_, i) => ({
            id: i + 1,
            name: `Student ${i + 1}`,
          }))
        );
      }
      setLoading(false);
    }, 1000); // Simulating an API call delay
  };

  // Handle attendance change
  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: status,
    }));
  };

  // Handle submit action (could send data to backend)
  const handleSubmit = () => {
    alert("Attendance submitted!");
    console.log("Attendance Data:", attendance);
    // Send the attendance data to your backend here
  };

  return (
    <Container>
      <ContentBox>
        <Header>Take Attendance</Header>

        {/* Course Selection */}
        <CourseSelect>
          <InputLabel style={{ color: "#fff" }}>Course</InputLabel>
          <Select
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setStudents([]); // Clear the student list
              setAttendance({}); // Reset attendance state
              fetchStudents(e.target.value); // Fetch students for the selected course
            }}
            label="Course"
            style={{ backgroundColor: "#444", color: "#fff" }}
          >
            <MenuItem value="BBA">BBA (60 students)</MenuItem>
            <MenuItem value="BCA">BCA (30 students)</MenuItem>
          </Select>
        </CourseSelect>

        {/* Year, Period, Time, and Date Inputs */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Year"
              fullWidth
              value={year}
              onChange={(e) => setYear(e.target.value)}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff", backgroundColor: "#444" } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Period"
              fullWidth
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff", backgroundColor: "#444" } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Time"
              fullWidth
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff", backgroundColor: "#444" } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff", backgroundColor: "#444" } }}
            />
          </Grid>
        </Grid>

        {/* If students are being fetched, show a loading indicator */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Display Students with Attendance Buttons */}
            {students.length > 0 && (
              <GridContainer container spacing={2}>
                {students.map((student) => (
                  <Grid item xs={12} sm={6} md={4} key={student.id}>
                    <StudentCard>
                      <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        {student.name}
                      </Typography>

                      <AttendanceButton
                        status={attendance[student.id] === "present" ? "present" : ""}
                        onClick={() => handleAttendanceChange(student.id, "present")}
                      >
                        Present
                      </AttendanceButton>
                      <AttendanceButton
                        status={attendance[student.id] === "absent" ? "absent" : ""}
                        onClick={() => handleAttendanceChange(student.id, "absent")}
                      >
                        Absent
                      </AttendanceButton>
                      <AttendanceButton
                        status={attendance[student.id] === "late" ? "late" : ""}
                        onClick={() => handleAttendanceChange(student.id, "late")}
                      >
                        Late
                      </AttendanceButton>
                    </StudentCard>
                  </Grid>
                ))}
              </GridContainer>
            )}

            {/* Submit Button */}
            {students.length > 0 && (
              <StyledButton onClick={handleSubmit} fullWidth>
                Submit Attendance
              </StyledButton>
            )}
          </>
        )}
      </ContentBox>
    </Container>
  );
};

export default TakeAttendance;
