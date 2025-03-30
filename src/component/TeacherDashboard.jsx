import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  font-family: 'Inter', sans-serif;
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
  font-weight: 700;
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

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'attendance') {
      navigate('/Attendance');
    }
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderTitle>Teacher Dashboard</HeaderTitle>
      </DashboardHeader>

      <DashboardTabs>
        <TabButton 
          $active={activeTab === 'overview'}
          onClick={() => handleTabClick('overview')}
        >
          Overview
        </TabButton>
        <TabButton 
          $active={activeTab === 'classes'}
          onClick={() => handleTabClick('classes')}
        >
          Classes
        </TabButton>
        <TabButton 
          $active={activeTab === 'attendance'}
          onClick={() => handleTabClick('attendance')}
        >
          Attendance
        </TabButton>
      </DashboardTabs>
    </DashboardContainer>
  );
};

export default TeacherDashboard;
