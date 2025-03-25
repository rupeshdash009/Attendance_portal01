import React, { useState } from "react";
import { Box, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/system";

// 🎨 Styled Components for Glassmorphism
const GlassContainer = styled(Box)({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "30px",
  width: "100%",
  maxWidth: "1000px",
  margin: "auto",
  textAlign: "center",
  color: "#fff",
  boxShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
});

const AttendanceButton = styled(Button)(({ status, selected }) => ({
  background:
    selected && status === "present" ? "rgba(76, 175, 80, 0.8)" :
    selected && status === "absent" ? "rgba(244, 67, 54, 0.8)" :
    selected && status === "late" ? "rgba(255, 152, 0, 0.8)" :
    "rgba(255, 255, 255, 0.2)",
  color: "#fff",
  fontWeight: "bold",
  borderRadius: "8px",
  padding: "10px",
  width: "100%",
  marginTop: "8px",
  transition: "0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const StudentCard = styled(Box)({
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(15px)",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
  textAlign: "center",
  transition: "0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
});

const TakeAttendance = () => {
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [period, setPeriod] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const fetchStudents = (selectedCourse) => {
    if (selectedCourse === "BBA") {
      setStudents(Array.from({ length: 60 }, (_, i) => ({ id: i + 1, name: `Student ${i + 1}` })));
    } else if (selectedCourse === "BCA") {
      setStudents(Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: `Student ${i + 1}` })));
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = () => {
    console.log("Attendance Submitted:", attendance);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#121212" }}>
      <GlassContainer>
        <Typography variant="h4" fontWeight="700">Take Attendance</Typography>

        {/* Course Selection */}
        <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
          <InputLabel sx={{ color: "#fff" }}>Course</InputLabel>
          <Select
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setStudents([]);
              setAttendance({});
              fetchStudents(e.target.value);
            }}
            sx={{ background: "rgba(255, 255, 255, 0.2)", color: "#fff" }}
          >
            <MenuItem value="BBA">BBA (60 students)</MenuItem>
            <MenuItem value="BCA">BCA (30 students)</MenuItem>
          </Select>
        </FormControl>

        {/* Semester Selection */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel sx={{ color: "#fff" }}>Semester</InputLabel>
          <Select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            sx={{ background: "rgba(255, 255, 255, 0.2)", color: "#fff" }}
          >
            <MenuItem value="1">Semester 1</MenuItem>
            <MenuItem value="2">Semester 2</MenuItem>
            <MenuItem value="3">Semester 3</MenuItem>
            <MenuItem value="4">Semester 4</MenuItem>
            <MenuItem value="5">Semester 5</MenuItem>
            <MenuItem value="6">Semester 6</MenuItem>
          </Select>
        </FormControl>

        {/* Period Selection */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel sx={{ color: "#fff" }}>Period</InputLabel>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            sx={{ background: "rgba(255, 255, 255, 0.2)", color: "#fff" }}
          >
            <MenuItem value="1">Period 1</MenuItem>
            <MenuItem value="2">Period 2</MenuItem>
            <MenuItem value="3">Period 3</MenuItem>
            <MenuItem value="4">Period 4</MenuItem>
            <MenuItem value="5">Period 5</MenuItem>
          </Select>
        </FormControl>

        {/* Date & Time Selection */}
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={6}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              sx={{ background: "rgba(255, 255, 255, 0.2)", borderRadius: "8px", color: "#fff" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              sx={{ background: "rgba(255, 255, 255, 0.2)", borderRadius: "8px", color: "#fff" }}
            />
          </Grid>
        </Grid>

        {/* Student List */}
        <Grid container spacing={2} marginTop={2}>
          {students.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <StudentCard>
                <Typography variant="h6">{student.name}</Typography>
                <AttendanceButton status="present" selected={attendance[student.id] === "present"} onClick={() => handleAttendanceChange(student.id, "present")}>Present</AttendanceButton>
                <AttendanceButton status="absent" selected={attendance[student.id] === "absent"} onClick={() => handleAttendanceChange(student.id, "absent")}>Absent</AttendanceButton>
                <AttendanceButton status="late" selected={attendance[student.id] === "late"} onClick={() => handleAttendanceChange(student.id, "late")}>Late</AttendanceButton>
              </StudentCard>
            </Grid>
          ))}
        </Grid>

        {/* Submit Button */}
        <Button onClick={handleSubmit} sx={{ marginTop: 3, background: "rgba(0, 123, 255, 0.8)", color: "#fff", padding: "12px 20px", fontWeight: "bold", borderRadius: "8px", "&:hover": { transform: "scale(1.05)" } }}>Submit</Button>
      </GlassContainer>
    </Box>
  );
};

export default TakeAttendance;
