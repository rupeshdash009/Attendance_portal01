import { useState, useEffect } from 'react';
import styled from 'styled-components';

// ========== STYLED COMPONENTS ==========
const DashboardContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px;
  color: #111827;
  background-color: #f9fafb;
  min-height: 100vh;
`;

const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  color: #111827;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.025em;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 10px;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const UserAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1.1rem;
`;

const DashboardTabs = styled.nav`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  background: #f3f4f6;
  padding: 6px;
  border-radius: 12px;
`;

const TabButton = styled.button`
  padding: 10px 24px;
  background: ${props => props.$active ? 'white' : 'transparent'};
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  font-weight: 500;
  color: ${props => props.$active ? '#111827' : '#6b7280'};
  font-size: 0.95rem;
  box-shadow: ${props => props.$active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'};

  &:hover {
    background: ${props => props.$active ? 'white' : '#e5e7eb'};
  }
`;

const DashboardMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: all 0.2s;
  border: 1px solid #e5e7eb;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    border-color: #d1d5db;
  }
`;

const StatValue = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 12px;
`;

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: ${props => props.$positive ? '#10b981' : '#ef4444'};
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 16px;
  background: ${props => props.$primary ? '#111827' : '#f3f4f6'};
  color: ${props => props.$primary ? 'white' : '#111827'};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s;
  border: 1px solid ${props => props.$primary ? 'transparent' : '#e5e7eb'};

  &:hover {
    background: ${props => props.$primary ? '#1f2937' : '#e5e7eb'};
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #111827;
  margin: 0;
  font-weight: 600;
`;

const AttendanceContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
  font-family: 'Inter', sans-serif;
`;

const AttendanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
`;

const AttendanceTitle = styled.h2`
  font-size: 1.75rem;
  color: #111827;
  margin: 0;
  font-weight: 700;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AttendanceControls = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const ProgramBadge = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${props => props.$program === 'BBA' ? '#e0f2fe' : '#f3e8ff'};
  color: ${props => props.$program === 'BBA' ? '#0369a1' : '#7e22ce'};
`;

const DatePicker = styled.input`
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
  font-size: 0.95rem;
  color: #111827;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    border-color: #d1d5db;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px #eef2ff;
  }
`;

const SubjectSelect = styled.select`
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
  font-size: 0.95rem;
  color: #111827;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 220px;
  font-weight: 500;

  &:hover {
    border-color: #d1d5db;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px #eef2ff;
  }
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
  font-size: 0.95rem;
  color: #111827;
  transition: all 0.2s;
  width: 100%;
  max-width: 300px;
  font-weight: 500;

  &:hover {
    border-color: #d1d5db;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px #eef2ff;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const AttendanceTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 24px;
`;

const TableHeader = styled.th`
  padding: 16px;
  text-align: left;
  background: #f9fafb;
  font-weight: 600;
  color: #4b5563;
  font-size: 0.9rem;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;

  &:first-child {
    border-radius: 12px 0 0 0;
  }

  &:last-child {
    border-radius: 0 12px 0 0;
  }
`;

const TableCell = styled.td`
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #f3f4f6;
  color: #111827;
  font-size: 0.95rem;
`;

const StudentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StudentAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.9rem;
`;

const StatusSelect = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.85rem;
  transition: all 0.2s;
  background: ${props => {
    if (props.value === 'present') return '#d1fae5';
    if (props.value === 'absent') return '#fee2e2';
    if (props.value === 'late') return '#fef3c7';
    return '#f3f4f6';
  }};
  color: ${props => {
    if (props.value === 'present') return '#065f46';
    if (props.value === 'absent') return '#b91c1c';
    if (props.value === 'late') return '#92400e';
    return '#6b7280';
  }};
  appearance: none;
  padding-right: 28px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
`;

const SaveButton = styled.button`
  padding: 14px 28px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 32px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BatchIndicator = styled.div`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #e0f2fe;
  color: #0369a1;
`;

const SemesterIndicator = styled.div`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #fce7f3;
  color: #be185d;
`;

const AttendanceSummary = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
  min-width: 160px;
`;

const SummaryValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
`;

const SummaryLabel = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: #111827;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 8px;
  
  &:hover {
    color: #111827;
  }
`;

const NotificationItem = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const NotificationTime = styled.span`
  font-size: 0.8rem;
  color: #6b7280;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #6b7280;
`;

const ClassCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    border-color: #d1d5db;
  }
`;

const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// ========== ICONS ==========
const NotificationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AttendanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 11L19 13L23 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 21V13H7V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 3V8H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AssignmentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GradebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ========== COMPONENTS ==========
const BBABCAttendance = ({ program = 'BBA' }) => {
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for BBA/BCA
  const subjects = program === 'BBA' ? [
    { id: 'bba101', name: 'Principles of Management', code: 'BBA-101' },
    { id: 'bba102', name: 'Business Economics', code: 'BBA-102' },
    { id: 'bba103', name: 'Financial Accounting', code: 'BBA-103' },
    { id: 'bba104', name: 'Business Communication', code: 'BBA-104' }
  ] : [
    { id: 'bca101', name: 'Programming Fundamentals', code: 'BCA-101' },
    { id: 'bca102', name: 'Database Management', code: 'BCA-102' },
    { id: 'bca103', name: 'Computer Networks', code: 'BCA-103' },
    { id: 'bca104', name: 'Web Technologies', code: 'BCA-104' }
  ];

  const students = [
    { id: 1, name: 'Aarav Sharma', rollNo: program === 'BBA' ? 'BBA2023001' : 'BCA2023001', batch: '2023', semester: '1st' },
    { id: 2, name: 'Priya Patel', rollNo: program === 'BBA' ? 'BBA2023002' : 'BCA2023002', batch: '2023', semester: '1st' },
    { id: 3, name: 'Rahul Gupta', rollNo: program === 'BBA' ? 'BBA2023003' : 'BCA2023003', batch: '2023', semester: '1st' },
    { id: 4, name: 'Neha Singh', rollNo: program === 'BBA' ? 'BBA2023004' : 'BCA2023004', batch: '2023', semester: '1st' },
    { id: 5, name: 'Vikram Joshi', rollNo: program === 'BBA' ? 'BBA2023005' : 'BCA2023005', batch: '2023', semester: '1st' },
    { id: 6, name: 'Ananya Reddy', rollNo: program === 'BBA' ? 'BBA2023006' : 'BCA2023006', batch: '2023', semester: '1st' }
  ];

  useEffect(() => {
    // Initialize attendance status
    const initialStatus = {};
    students.forEach(student => {
      initialStatus[student.id] = 'present';
    });
    setAttendanceStatus(initialStatus);
  }, []);

  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    alert(`${program} Attendance saved successfully for ${selectedSubject} on ${attendanceDate}`);
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate attendance summary
  const presentCount = Object.values(attendanceStatus).filter(status => status === 'present').length;
  const absentCount = Object.values(attendanceStatus).filter(status => status === 'absent').length;
  const lateCount = Object.values(attendanceStatus).filter(status => status === 'late').length;
  const attendancePercentage = ((presentCount / students.length) * 100).toFixed(1);

  return (
    <AttendanceContainer>
      <AttendanceHeader>
        <AttendanceTitle>
          {program} Attendance Management
          <ProgramBadge $program={program}>{program}</ProgramBadge>
        </AttendanceTitle>
        <AttendanceControls>
          <DatePicker 
            type="date" 
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
          />
          <SubjectSelect 
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name} ({subject.code})
              </option>
            ))}
          </SubjectSelect>
        </AttendanceControls>
      </AttendanceHeader>

      {selectedSubject && (
        <>
          <SearchInput 
            type="text" 
            placeholder={`Search ${program} students...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <AttendanceTable>
            <thead>
              <tr>
                <TableHeader>Student Details</TableHeader>
                <TableHeader>Roll No</TableHeader>
                <TableHeader>Batch/Semester</TableHeader>
                <TableHeader>Attendance Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <TableCell>
                    <StudentInfo>
                      <StudentAvatar>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </StudentAvatar>
                      <div>
                        <div style={{ fontWeight: 500 }}>{student.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                          {program === 'BBA' ? 'BBA Student' : 'BCA Student'}
                        </div>
                      </div>
                    </StudentInfo>
                  </TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <BatchIndicator>Batch: {student.batch}</BatchIndicator>
                      <SemesterIndicator>Sem: {student.semester}</SemesterIndicator>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusSelect
                      value={attendanceStatus[student.id] || 'present'}
                      onChange={(e) => handleStatusChange(student.id, e.target.value)}
                    >
                      <option value="present">Present</option>
                      <option value="late">Late</option>
                      <option value="absent">Absent</option>
                    </StatusSelect>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </AttendanceTable>

          <AttendanceSummary>
            <SummaryCard>
              <SummaryValue>{presentCount}</SummaryValue>
              <SummaryLabel>Present</SummaryLabel>
            </SummaryCard>
            <SummaryCard>
              <SummaryValue>{absentCount}</SummaryValue>
              <SummaryLabel>Absent</SummaryLabel>
            </SummaryCard>
            <SummaryCard>
              <SummaryValue>{lateCount}</SummaryValue>
              <SummaryLabel>Late</SummaryLabel>
            </SummaryCard>
            <SummaryCard>
              <SummaryValue>{attendancePercentage}%</SummaryValue>
              <SummaryLabel>Attendance Rate</SummaryLabel>
            </SummaryCard>
          </AttendanceSummary>

          <SaveButton onClick={handleSaveAttendance}>
            <SaveIcon />
            Save {program} Attendance
          </SaveButton>
        </>
      )}
    </AttendanceContainer>
  );
};

// ========== MAIN COMPONENT ==========
const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [selectedClassDetails, setSelectedClassDetails] = useState(null);
  const [program, setProgram] = useState('BBA'); // 'BBA' or 'BCA'

  // Sample data
  const stats = [
    { label: 'Total Students', value: '142', trend: '+5%' },
    { label: 'Attendance Rate', value: '94%', trend: '+2%', positive: true },
    { label: 'Classes Today', value: '3', trend: '2 completed' },
    { label: 'Assignments Due', value: '5', trend: '3 graded' },
  ];

  const classes = [
    { id: 'math101', name: 'Math 101', period: '1st Period', students: 24, time: '8:00 AM - 9:15 AM', room: 'Room 204' },
    { id: 'algebra2', name: 'Algebra II', period: '3rd Period', students: 20, time: '10:45 AM - 12:00 PM', room: 'Room 205' },
    { id: 'calculus', name: 'Calculus', period: '5th Period', students: 18, time: '1:30 PM - 2:45 PM', room: 'Room 206' }
  ];

  const students = [
    { id: 1, name: 'Alice Johnson', email: 'alice@school.edu' },
    { id: 2, name: 'Bob Smith', email: 'bob@school.edu' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@school.edu' },
    { id: 4, name: 'Diana Prince', email: 'diana@school.edu' },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@school.edu' },
    { id: 6, name: 'Fiona Green', email: 'fiona@school.edu' }
  ];

  const notifications = [
    { id: 1, title: 'New assignment submitted', message: 'Alice Johnson submitted the Algebra homework', time: '10 minutes ago' },
    { id: 2, title: 'Meeting reminder', message: 'Department meeting today at 3:00 PM', time: '1 hour ago' },
    { id: 3, title: 'Attendance alert', message: '3 students marked absent in Math 101', time: 'Yesterday' }
  ];

  useEffect(() => {
    // Initialize attendance status for demo purposes
    const initialStatus = {};
    students.forEach(student => {
      initialStatus[student.id] = 'present';
    });
    setAttendanceStatus(initialStatus);
  }, []);

  const handleTakeAttendance = () => {
    setActiveTab('attendance');
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    alert('Attendance saved successfully!');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewClassDetails = (classId) => {
    const classInfo = classes.find(cls => cls.id === classId);
    setSelectedClassDetails(classInfo);
    setShowClassDetails(true);
  };

  const toggleProgram = () => {
    setProgram(program === 'BBA' ? 'BCA' : 'BBA');
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderTitle>Teacher Dashboard</HeaderTitle>
        <HeaderActions>
          <NotificationButton onClick={toggleNotifications}>
            <NotificationIcon />
            <Badge>{notifications.length}</Badge>
          </NotificationButton>
          <UserProfile>
            <span>Ms. Rodriguez</span>
            <UserAvatar>JR</UserAvatar>
          </UserProfile>
        </HeaderActions>
      </DashboardHeader>

      {showNotifications && (
        <ModalOverlay onClick={() => setShowNotifications(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Notifications</ModalTitle>
              <ModalCloseButton onClick={() => setShowNotifications(false)}>
                <CloseIcon />
              </ModalCloseButton>
            </ModalHeader>
            <div>
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <NotificationItem key={notification.id}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0' }}>{notification.title}</h4>
                      <p style={{ margin: '0 0 4px 0' }}>{notification.message}</p>
                      <NotificationTime>{notification.time}</NotificationTime>
                    </div>
                  </NotificationItem>
                ))
              ) : (
                <EmptyState>
                  <p>No new notifications</p>
                </EmptyState>
              )}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      <DashboardTabs>
        <TabButton 
          $active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </TabButton>
        <TabButton 
          $active={activeTab === 'attendance'}
          onClick={() => setActiveTab('attendance')}
        >
          Attendance
        </TabButton>
        <TabButton 
          $active={activeTab === 'classes'}
          onClick={() => setActiveTab('classes')}
        >
          My Classes
        </TabButton>
      </DashboardTabs>

      <DashboardMain>
        {activeTab === 'overview' && (
          <>
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatCard key={index}>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                  <StatTrend $positive={stat.positive}>
                    {stat.trend}
                  </StatTrend>
                </StatCard>
              ))}
            </StatsGrid>

            <Section>
              <SectionHeader>
                <SectionTitle>Quick Actions</SectionTitle>
              </SectionHeader>
              <QuickActions>
                <ActionButton onClick={handleTakeAttendance}>
                  <AttendanceIcon />
                  Take Attendance
                </ActionButton>
                <ActionButton>
                  <AssignmentIcon />
                  Create Assignment
                </ActionButton>
                <ActionButton>
                  <GradebookIcon />
                  Enter Grades
                </ActionButton>
                <ActionButton onClick={toggleProgram}>
                  <GradebookIcon />
                  Switch to {program === 'BBA' ? 'BCA' : 'BBA'}
                </ActionButton>
              </QuickActions>
            </Section>
          </>
        )}

        {activeTab === 'attendance' && (
          <BBABCAttendance program={program} />
        )}

        {activeTab === 'classes' && (
          <Section>
            <SectionHeader>
              <SectionTitle>My Classes</SectionTitle>
            </SectionHeader>
            <ClassGrid>
              {classes.map(cls => (
                <ClassCard key={cls.id} onClick={() => viewClassDetails(cls.id)}>
                  <h3 style={{ marginTop: 0 }}>{cls.name}</h3>
                  <p style={{ color: '#6b7280', margin: '8px 0' }}>{cls.period}</p>
                  <p style={{ margin: '8px 0' }}><strong>Students:</strong> {cls.students}</p>
                </ClassCard>
              ))}
            </ClassGrid>
          </Section>
        )}
      </DashboardMain>

      {showClassDetails && selectedClassDetails && (
        <ModalOverlay onClick={() => setShowClassDetails(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selectedClassDetails.name}</ModalTitle>
              <ModalCloseButton onClick={() => setShowClassDetails(false)}>
                <CloseIcon />
              </ModalCloseButton>
            </ModalHeader>
            <div>
              <p><strong>Period:</strong> {selectedClassDetails.period}</p>
              <p><strong>Time:</strong> {selectedClassDetails.time}</p>
              <p><strong>Room:</strong> {selectedClassDetails.room}</p>
              <p><strong>Students:</strong> {selectedClassDetails.students}</p>
              <div style={{ marginTop: '24px' }}>
                <ActionButton $primary style={{ width: '100%' }}>
                  View Class Roster
                </ActionButton>
              </div>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
};

export default TeacherDashboard;