import React, { useState } from "react";
import { Box, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Paper } from "@mui/material";
import { styled } from "@mui/system";

// 🎨 Styled Components for Modern Professional UI
const DashboardContainer = styled(Box)({
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  minHeight: "100vh",
  padding: "40px 20px",
});

const Card = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  padding: "32px",
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
  backdropFilter: "blur(8px)",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  maxWidth: "1200px",
  margin: "0 auto",
}));

const SectionTitle = styled(Typography)({
  marginBottom: "24px",
  fontWeight: "600",
  color: "#2d3748",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: "-8px",
    left: "0",
    width: "60px",
    height: "4px",
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "2px",
  },
});

const AttendanceButton = styled(Button)(({ status, selected }) => ({
  background:
    selected && status === "present" ? "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)" :
    selected && status === "absent" ? "linear-gradient(135deg, #f87171 0%, #ef4444 100%)" :
    selected && status === "late" ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" :
    "rgba(255, 255, 255, 0.9)",
  color: selected ? "#fff" : "#4a5568",
  fontWeight: "600",
  borderRadius: "8px",
  padding: "8px 12px",
  width: "100%",
  marginTop: "8px",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  border: selected ? "none" : "1px solid #e2e8f0",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
}));

const StudentCard = styled(Paper)({
  padding: "16px",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  textAlign: "center",
  transition: "all 0.3s ease",
  backgroundColor: "#fff",
  border: "1px solid #edf2f7",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
  },
});

const SubmitButton = styled(Button)({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#fff",
  fontWeight: "600",
  padding: "12px 32px",
  borderRadius: "8px",
  marginTop: "32px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
  },
});

const TakeAttendance = () => {
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [period, setPeriod] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Sample data
  const courses = ["BBA", "BCA", "BCOM", "MBA", "MCA"];
  const semesters = [1, 2, 3, 4, 5, 6];
  const subjects = {
    BBA: ["Financial Accounting", "Business Economics", "Marketing Management", "Organizational Behavior"],
    BCA: ["Programming in C", "Data Structures", "Database Management", "Web Development"],
    BCOM: ["Business Law", "Corporate Accounting", "Taxation", "Auditing"],
    MBA: ["Strategic Management", "Financial Management", "Human Resource Management", "Operations Management"],
    MCA: ["Advanced Algorithms", "Machine Learning", "Cloud Computing", "Big Data Analytics"],
  };
  const periods = [1, 2, 3, 4, 5];

  const fetchStudents = (selectedCourse) => {
    if (selectedCourse === "BBA") {
      setStudents(Array.from({ length: 60 }, (_, i) => ({ id: i + 1, name: `Student ${i + 1}`, rollNo: `BBA${String(i + 1).padStart(3, '0')}` })));
    } else if (selectedCourse === "BCA") {
      setStudents(Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: `Student ${i + 1}`, rollNo: `BCA${String(i + 1).padStart(3, '0')}` })));
    } 
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = () => {
    const attendanceData = {
      course,
      semester,
      subject,
      period,
      date,
      time,
      attendance,
    };
    console.log("Attendance Submitted:", attendanceData);
    alert("Attendance submitted successfully!");
  };

  return (
    <DashboardContainer>
      <Card>
        <Typography variant="h4" fontWeight="700" color="#2d3748" gutterBottom>
          Attendance Management System
        </Typography>
        
        <SectionTitle variant="h5">Course Details</SectionTitle>
        
        <Grid container spacing={3} marginBottom={4}>
          {/* Course Selection */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value);
                  setSubject("");
                  setStudents([]);
                  setAttendance({});
                  fetchStudents(e.target.value);
                }}
                label="Course"
              >
                {courses.map((course) => (
                  <MenuItem key={course} value={course}>{course}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Semester Selection */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Semester</InputLabel>
              <Select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                label="Semester"
              >
                {semesters.map((sem) => (
                  <MenuItem key={sem} value={sem}>Semester {sem}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Subject Selection */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                label="Subject"
                disabled={!course}
              >
                {course && subjects[course]?.map((sub) => (
                  <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Period Selection */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Period</InputLabel>
              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                label="Period"
              >
                {periods.map((p) => (
                  <MenuItem key={p} value={p}>Period {p}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Date Selection */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>

          {/* Time Selection */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Grid>
        </Grid>

        {students.length > 0 && (
          <>
            <SectionTitle variant="h5">Mark Attendance</SectionTitle>
            
            <Typography variant="body1" color="textSecondary" marginBottom={3}>
              {students.length} students found for {course} Semester {semester}
            </Typography>

            <Grid container spacing={2}>
              {students.map((student) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}>
                  <StudentCard>
                    <Typography variant="subtitle1" fontWeight="600">{student.name}</Typography>
                    <Typography variant="body2" color="textSecondary" marginBottom={2}>{student.rollNo}</Typography>
                    <AttendanceButton 
                      status="present" 
                      selected={attendance[student.id] === "present"} 
                      onClick={() => handleAttendanceChange(student.id, "present")}
                    >
                      Present
                    </AttendanceButton>
                    <AttendanceButton 
                      status="absent" 
                      selected={attendance[student.id] === "absent"} 
                      onClick={() => handleAttendanceChange(student.id, "absent")}
                    >
                      Absent
                    </AttendanceButton>
                    <AttendanceButton 
                      status="late" 
                      selected={attendance[student.id] === "late"} 
                      onClick={() => handleAttendanceChange(student.id, "late")}
                    >
                      Late
                    </AttendanceButton>
                  </StudentCard>
                </Grid>
              ))}
            </Grid>

            <Box display="flex" justifyContent="center">
              <SubmitButton 
                onClick={handleSubmit}
                disabled={Object.keys(attendance).length !== students.length}
              >
                Submit Attendance
              </SubmitButton>
            </Box>
          </>
        )}
      </Card>
    </DashboardContainer>
  );
};

export default TakeAttendance;