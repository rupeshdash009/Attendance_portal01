import { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const DashboardContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  color: #2d3748;
  background-color: #f8fafc;
  min-height: 100vh;
`;

const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  color: #4a5568;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    color: #2d3748;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.7rem;
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
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #edf2f7;
  }
`;

const UserAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
`;

const DashboardTabs = styled.nav`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  background: white;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  font-weight: 500;
  color: #4a5568;

  &:hover {
    background: #f1f5f9;
    color: #1e40af;
  }

  &.active {
    background: #eff6ff;
    color: #1e40af;
    font-weight: 600;
  }
`;

const DashboardMain = styled.main`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border-left: 4px solid ${props => props.color || '#3b82f6'};
  grid-column: span 4;

  @media (max-width: 1200px) {
    grid-column: span 3;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const StatValue = styled.p`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 8px 0 4px;
  color: #1e293b;
`;

const StatLabel = styled.h3`
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
  margin: 0;
`;

const StatChange = styled.p`
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  color: #1e293b;
  margin: 0;
`;

const ViewAllLink = styled.a`
  color: #3b82f6;
  font-size: 0.85rem;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ClassList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ClassItem = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8fafc;
  }
`;

const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ClassName = styled.span`
  font-weight: 600;
  color: #1e293b;
`;

const ClassMeta = styled.span`
  font-size: 0.85rem;
  color: #64748b;
`;

const ClassTime = styled.span`
  font-weight: 600;
  color: #3b82f6;
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ActionButton = styled.button`
  padding: 14px;
  background: ${props => props.primary ? '#3b82f6' : '#f1f5f9'};
  color: ${props => props.primary ? 'white' : '#1e293b'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.primary ? '#2563eb' : '#e2e8f0'};
    transform: translateY(-1px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const AnnouncementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AnnouncementItem = styled.li`
  padding: 16px 0;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8fafc;
  }
`;

const AnnouncementTitle = styled.h4`
  font-size: 1rem;
  color: #1e293b;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AnnouncementDate = styled.p`
  color: #64748b;
  font-size: 0.85rem;
  margin: 0 0 8px 0;
`;

const AnnouncementContent = styled.p`
  color: #475569;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
`;

const ClassesTab = styled.div`
  padding: 16px 0;
`;

const ClassCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

const ClassCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
`;

const ClassCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ClassCardTitle = styled.h3`
  font-size: 1.2rem;
  color: #1e293b;
  margin: 0;
`;

const ClassCardBadge = styled.span`
  background: #e0f2fe;
  color: #0369a1;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const ClassCardStats = styled.div`
  display: flex;
  gap: 16px;
  margin: 12px 0;
`;

const ClassStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ClassStatValue = styled.span`
  font-weight: 700;
  color: #1e293b;
`;

const ClassStatLabel = styled.span`
  font-size: 0.8rem;
  color: #64748b;
`;

const ClassActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ClassActionButton = styled.button`
  padding: 8px 12px;
  background: ${props => props.primary ? '#3b82f6' : '#f1f5f9'};
  color: ${props => props.primary ? 'white' : '#1e293b'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.primary ? '#2563eb' : '#e2e8f0'};
  }
`;

const AssignmentsTab = styled.div`
  padding: 16px 0;
`;

const AssignmentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const CreateButton = styled.button`
  padding: 10px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: #2563eb;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const AssignmentTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  padding: 8px;
  background: #f1f5f9;
  border-radius: 8px;
`;

const AssignmentTabButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#1e40af' : '#475569'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '500'};
  box-shadow: ${props => props.active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};
  transition: all 0.2s;

  &:hover {
    color: #1e40af;
  }
`;

const AssignmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AssignmentCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AssignmentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AssignmentTitle = styled.h3`
  font-size: 1.1rem;
  color: #1e293b;
  margin: 0;
`;

const AssignmentMeta = styled.div`
  display: flex;
  gap: 16px;
`;

const AssignmentClass = styled.span`
  font-size: 0.85rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AssignmentDueDate = styled.span`
  font-size: 0.85rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AssignmentStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProgressText = styled.span`
  font-size: 0.85rem;
  color: #64748b;
  min-width: 80px;
`;

const ProgressBar = styled.div`
  flex-grow: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #3b82f6;
  border-radius: 4px;
  width: ${props => props.percentage}%;
`;

const AssignmentActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-top: 12px;
  }
`;

const GradeButton = styled.button`
  padding: 8px 16px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: #059669;
  }
`;

const EditButton = styled.button`
  padding: 8px 16px;
  background: #f1f5f9;
  color: #1e293b;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: #e2e8f0;
  }
`;

const GradesTab = styled.div`
  padding: 16px 0;
`;

const GradebookControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 0.9rem;
  color: #1e293b;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background: ${props => props.primary ? '#3b82f6' : '#f1f5f9'};
  color: ${props => props.primary ? 'white' : '#1e293b'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: ${props => props.primary ? '#2563eb' : '#e2e8f0'};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const GradebookTableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  background: white;
  margin-top: 16px;
`;

const GradebookTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px 16px;
  text-align: left;
  background: #f8fafc;
  font-weight: 600;
  color: #475569;
  font-size: 0.9rem;
  border-bottom: 1px solid #e2e8f0;
`;

const TableCell = styled.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
  color: #1e293b;
`;

const GradeCell = styled.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
  font-weight: 600;
  color: ${props => {
    if (props.grade < 70) return '#ef4444';
    if (props.grade < 80) return '#f59e0b';
    if (props.grade < 90) return '#3b82f6';
    return '#10b981';
  }};
`;

const AverageCell = styled.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
  font-weight: 700;
  color: #1e293b;
  background: #f8fafc;
`;

const TableRow = styled.tr`
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8fafc;
  }
`;

// Icons (using simple emojis for demonstration)
const CalendarIcon = () => <span>📅</span>;
const AssignmentIcon = () => <span>📝</span>;
const GradeIcon = () => <span>📊</span>;
const AnnouncementIcon = () => <span>📢</span>;
const PlusIcon = () => <span>➕</span>;
const ChevronDownIcon = () => <span>⌄</span>;
const DownloadIcon = () => <span>⤓</span>;

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeAssignmentTab, setActiveAssignmentTab] = useState('upcoming');
  
  // Sample data
  const classes = [
    { id: 1, name: 'Math 101', period: '1st Period', students: 24, assignments: 3 },
    { id: 2, name: 'Algebra II', period: '3rd Period', students: 20, assignments: 2 },
    { id: 3, name: 'Calculus', period: '5th Period', students: 18, assignments: 4 },
  ];
  
  const upcomingClasses = [
    { id: 1, name: 'Math 101', period: '1st Period', time: '8:00 AM', room: 'Room 204' },
    { id: 2, name: 'Algebra II', period: '3rd Period', time: '10:30 AM', room: 'Room 112' },
    { id: 3, name: 'Calculus', period: '5th Period', time: '1:15 PM', room: 'Room 204' },
  ];
  
  const upcomingAssignments = [
    { id: 1, class: 'Math 101', title: 'Chapter 3 Quiz', dueDate: 'Nov 15, 2023', submissions: 18, total: 24 },
    { id: 2, class: 'Algebra II', title: 'Linear Equations HW', dueDate: 'Nov 16, 2023', submissions: 12, total: 20 },
    { id: 3, class: 'Calculus', title: 'Derivatives Test', dueDate: 'Nov 17, 2023', submissions: 8, total: 18 },
  ];
  
  const recentAnnouncements = [
    { id: 1, title: 'School Holiday', date: 'Nov 10, 2023', content: 'No classes on November 23rd for Thanksgiving. Enjoy the break with your family!' },
    { id: 2, title: 'Parent-Teacher Conferences', date: 'Nov 5, 2023', content: 'Sign up sheets are now available in the faculty lounge. Please schedule your conferences by Friday.' },
  ];

  const studentPerformance = [
    { name: 'Alice Johnson', math: 92, science: 88, english: 95 },
    { name: 'Bob Smith', math: 85, science: 90, english: 82 },
    { name: 'Charlie Brown', math: 78, science: 85, english: 88 },
    { name: 'Diana Prince', math: 95, science: 94, english: 93 },
    { name: 'Ethan Hunt', math: 68, science: 72, english: 75 },
    { name: 'Fiona Green', math: 89, science: 91, english: 87 },
  ];

  return (
    <DashboardContainer>
      {/* Header */}
      <DashboardHeader>
        <h1 style={{ fontSize: '1.8rem', color: '#1e293b', margin: 0 }}>Teacher Dashboard</h1>
        <HeaderActions>
          <NotificationButton>
            <span role="img" aria-label="Notifications">🔔</span>
            <Badge>3</Badge>
          </NotificationButton>
          <UserProfile>
            <span style={{ fontWeight: '500' }}>Ms. Rodriguez</span>
            <UserAvatar>JR</UserAvatar>
          </UserProfile>
        </HeaderActions>
      </DashboardHeader>

      {/* Navigation Tabs */}
      <DashboardTabs>
        <TabButton 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </TabButton>
        <TabButton 
          className={activeTab === 'classes' ? 'active' : ''} 
          onClick={() => setActiveTab('classes')}
        >
          Classes
        </TabButton>
        <TabButton 
          className={activeTab === 'assignments' ? 'active' : ''} 
          onClick={() => setActiveTab('assignments')}
        >
          Assignments
        </TabButton>
        <TabButton 
          className={activeTab === 'grades' ? 'active' : ''} 
          onClick={() => setActiveTab('grades')}
        >
          Grades
        </TabButton>
      </DashboardTabs>

      {/* Main Content Area */}
      <DashboardMain>
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <OverviewGrid>
              <StatsCard color="#3b82f6">
                <StatLabel>Total Students</StatLabel>
                <StatValue>62</StatValue>
                <StatChange positive>
                  <span>↑</span> 5% from last term
                </StatChange>
              </StatsCard>
              
              <StatsCard color="#10b981">
                <StatLabel>Assignments Due</StatLabel>
                <StatValue>3</StatValue>
                <StatChange>
                  <span>2 to grade</span>
                </StatChange>
              </StatsCard>
              
              <StatsCard color="#6366f1">
                <StatLabel>Attendance Rate</StatLabel>
                <StatValue>94%</StatValue>
                <StatChange positive>
                  <span>↑</span> Consistent
                </StatChange>
              </StatsCard>
            </OverviewGrid>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <ActionButtons>
                <ActionButton primary>
                  <AssignmentIcon />
                  Create Assignment
                </ActionButton>
                <ActionButton>
                  <GradeIcon />
                  Record Grades
                </ActionButton>
                <ActionButton>
                  <AnnouncementIcon />
                  Post Announcement
                </ActionButton>
                <ActionButton>
                  <CalendarIcon />
                  Add Event
                </ActionButton>
              </ActionButtons>
            </Card>

            {/* Cards Grid */}
            <CardGrid>
              {/* Upcoming Classes */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Classes</CardTitle>
                  <ViewAllLink>View All</ViewAllLink>
                </CardHeader>
                <ClassList>
                  {upcomingClasses.map(cls => (
                    <ClassItem key={cls.id}>
                      <ClassInfo>
                        <ClassName>{cls.name}</ClassName>
                        <ClassMeta>{cls.room} • {cls.period}</ClassMeta>
                      </ClassInfo>
                      <ClassTime>{cls.time}</ClassTime>
                    </ClassItem>
                  ))}
                </ClassList>
              </Card>

              {/* Upcoming Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                  <ViewAllLink>View All</ViewAllLink>
                </CardHeader>
                <ClassList>
                  {upcomingAssignments.map(assignment => (
                    <ClassItem key={assignment.id}>
                      <ClassInfo>
                        <ClassName>{assignment.title}</ClassName>
                        <ClassMeta>{assignment.class} • Due {assignment.dueDate}</ClassMeta>
                      </ClassInfo>
                      <ClassTime>{assignment.submissions}/{assignment.total}</ClassTime>
                    </ClassItem>
                  ))}
                </ClassList>
              </Card>

              {/* Recent Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Announcements</CardTitle>
                  <ViewAllLink>View All</ViewAllLink>
                </CardHeader>
                <AnnouncementList>
                  {recentAnnouncements.map(announcement => (
                    <AnnouncementItem key={announcement.id}>
                      <AnnouncementTitle>
                        <span role="img" aria-label="Announcement">📢</span>
                        {announcement.title}
                      </AnnouncementTitle>
                      <AnnouncementDate>{announcement.date}</AnnouncementDate>
                      <AnnouncementContent>{announcement.content}</AnnouncementContent>
                    </AnnouncementItem>
                  ))}
                </AnnouncementList>
              </Card>
            </CardGrid>
          </>
        )}

        {activeTab === 'classes' && (
          <ClassesTab>
            <CardHeader>
              <CardTitle>Your Classes</CardTitle>
              <Button primary>
                <PlusIcon />
                Add Class
              </Button>
            </CardHeader>
            <ClassCards>
              {classes.map(cls => (
                <ClassCard key={cls.id}>
                  <ClassCardHeader>
                    <ClassCardTitle>{cls.name}</ClassCardTitle>
                    <ClassCardBadge>{cls.period}</ClassCardBadge>
                  </ClassCardHeader>
                  <ClassCardStats>
                    <ClassStat>
                      <ClassStatValue>{cls.students}</ClassStatValue>
                      <ClassStatLabel>Students</ClassStatLabel>
                    </ClassStat>
                    <ClassStat>
                      <ClassStatValue>{cls.assignments}</ClassStatValue>
                      <ClassStatLabel>Assignments</ClassStatLabel>
                    </ClassStat>
                    <ClassStat>
                      <ClassStatValue>94%</ClassStatValue>
                      <ClassStatLabel>Attendance</ClassStatLabel>
                    </ClassStat>
                  </ClassCardStats>
                  <ClassActions>
                    <ClassActionButton>Roster</ClassActionButton>
                    <ClassActionButton>Grades</ClassActionButton>
                    <ClassActionButton primary>View</ClassActionButton>
                  </ClassActions>
                </ClassCard>
              ))}
            </ClassCards>
          </ClassesTab>
        )}

        {activeTab === 'assignments' && (
          <AssignmentsTab>
            <AssignmentsHeader>
              <CardTitle>Assignments</CardTitle>
              <CreateButton>
                <PlusIcon />
                Create Assignment
              </CreateButton>
            </AssignmentsHeader>
            
            <AssignmentTabs>
              <AssignmentTabButton 
                active={activeAssignmentTab === 'upcoming'}
                onClick={() => setActiveAssignmentTab('upcoming')}
              >
                Upcoming
              </AssignmentTabButton>
              <AssignmentTabButton 
                active={activeAssignmentTab === 'past'}
                onClick={() => setActiveAssignmentTab('past')}
              >
                Past Due
              </AssignmentTabButton>
              <AssignmentTabButton 
                active={activeAssignmentTab === 'graded'}
                onClick={() => setActiveAssignmentTab('graded')}
              >
                Graded
              </AssignmentTabButton>
            </AssignmentTabs>
            
            <AssignmentsList>
              {upcomingAssignments.map(assignment => (
                <AssignmentCard key={assignment.id}>
                  <AssignmentInfo>
                    <AssignmentTitle>{assignment.title}</AssignmentTitle>
                    <AssignmentMeta>
                      <AssignmentClass>
                        <span role="img" aria-label="Class">🏫</span>
                        {assignment.class}
                      </AssignmentClass>
                      <AssignmentDueDate>
                        <span role="img" aria-label="Due date">⏰</span>
                        Due {assignment.dueDate}
                      </AssignmentDueDate>
                    </AssignmentMeta>
                  </AssignmentInfo>
                  <AssignmentStats>
                    <ProgressContainer>
                      <ProgressText>
                        {assignment.submissions}/{assignment.total} submitted
                      </ProgressText>
                      <ProgressBar>
                        <ProgressFill percentage={(assignment.submissions / assignment.total) * 100} />
                      </ProgressBar>
                    </ProgressContainer>
                  </AssignmentStats>
                  <AssignmentActions>
                    <GradeButton>
                      <GradeIcon />
                      Grade
                    </GradeButton>
                    <EditButton>
                      <AssignmentIcon />
                      Edit
                    </EditButton>
                  </AssignmentActions>
                </AssignmentCard>
              ))}
            </AssignmentsList>
          </AssignmentsTab>
        )}

        {activeTab === 'grades' && (
          <GradesTab>
            <GradebookControls>
              <ControlGroup>
                <Select>
                  {classes.map(cls => (
                    <option key={cls.id}>{cls.name}</option>
                  ))}
                </Select>
                <Select>
                  <option>All Assignments</option>
                  <option>Chapter 3 Quiz</option>
                  <option>Linear Equations HW</option>
                  <option>Derivatives Test</option>
                </Select>
              </ControlGroup>
              <ControlGroup>
                <Button>
                  <DownloadIcon />
                  Export
                </Button>
                <Button primary>
                  <PlusIcon />
                  Add Grade
                </Button>
              </ControlGroup>
            </GradebookControls>
            
            <GradebookTableContainer>
              <GradebookTable>
                <thead>
                  <tr>
                    <TableHeader>Student</TableHeader>
                    <TableHeader>Math</TableHeader>
                    <TableHeader>Science</TableHeader>
                    <TableHeader>English</TableHeader>
                    <TableHeader>Average</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {studentPerformance.map((student, index) => {
                    const average = Math.round((student.math + student.science + student.english) / 3);
                    return (
                      <TableRow key={index}>
                        <TableCell>{student.name}</TableCell>
                        <GradeCell grade={student.math}>{student.math}</GradeCell>
                        <GradeCell grade={student.science}>{student.science}</GradeCell>
                        <GradeCell grade={student.english}>{student.english}</GradeCell>
                        <AverageCell>{average}</AverageCell>
                      </TableRow>
                    );
                  })}
                </tbody>
              </GradebookTable>
            </GradebookTableContainer>
          </GradesTab>
        )}
      </DashboardMain>
    </DashboardContainer>
  );
};

export default TeacherDashboard;