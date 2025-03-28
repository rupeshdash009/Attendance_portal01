import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const ViewAll = styled.button`
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
  transition: all 0.2s;

  &:hover {
    color: #6366f1;
  }
`;

const AIIntegration = styled.div`
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
`;

const AITitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const AIInsights = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const AIInsightCard = styled.div`
  padding: 24px;
  border-radius: 12px;
  background: ${props => props.$bg || '#f9fafb'};
  border-left: 4px solid ${props => props.$color || '#4f46e5'};
  transition: all 0.2s;
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
`;

const AIInsightTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #111827;
`;

const AIInsightValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${props => props.$color || '#111827'};
`;

const AIInsightDesc = styled.div`
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const AIButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #111827;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;
  margin-top: 24px;

  &:hover {
    background: #1f2937;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

const ClassesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ClassCard = styled.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: all 0.2s;
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    border-color: #d1d5db;
  }
`;

const ClassHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ClassTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  font-weight: 600;
  color: #111827;
`;

const ClassBadge = styled.span`
  padding: 6px 12px;
  background: #f0f0f0;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
`;

const ClassStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 20px 0;
`;

const ClassStat = styled.div``;

const ClassStatValue = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
`;

const ClassStatLabel = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 4px;
`;

const ClassActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const SmallButton = styled.button`
  padding: 10px 16px;
  background: ${props => props.$primary ? '#111827' : '#f3f4f6'};
  color: ${props => props.$primary ? 'white' : '#111827'};
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${props => props.$primary ? 'transparent' : '#e5e7eb'};

  &:hover {
    background: ${props => props.$primary ? '#1f2937' : '#e5e7eb'};
    transform: translateY(-1px);
  }
`;

// ========== ATTENDANCE COMPONENTS ==========
const AttendanceContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
`;

const AttendanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const AttendanceTitle = styled.h2`
  font-size: 1.5rem;
  color: #111827;
  margin: 0;
  font-weight: 600;
`;

const AttendanceControls = styled.div`
  display: flex;
  gap: 16px;
`;

const DatePicker = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
  font-size: 0.95rem;
  color: #111827;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #d1d5db;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px #eef2ff;
  }
`;

const ClassSelect = styled.select`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
  font-size: 0.95rem;
  color: #111827;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 200px;

  &:hover {
    border-color: #d1d5db;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px #eef2ff;
  }
`;

const AttendanceTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 24px;
`;

const TableHeader = styled.th`
  padding: 14px 16px;
  text-align: left;
  background: #f9fafb;
  font-weight: 600;
  color: #6b7280;
  font-size: 0.9rem;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;

  &:first-child {
    border-radius: 8px 0 0 0;
  }

  &:last-child {
    border-radius: 0 8px 0 0;
  }
`;

const TableCell = styled.td`
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #f3f4f6;
  color: #111827;
`;

const StatusButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.85rem;
  transition: all 0.2s;
  background: ${props => {
    if (props.$status === 'present') return '#d1fae5';
    if (props.$status === 'absent') return '#fee2e2';
    if (props.$status === 'late') return '#fef3c7';
    return '#f3f4f6';
  }};
  color: ${props => {
    if (props.$status === 'present') return '#065f46';
    if (props.$status === 'absent') return '#b91c1c';
    if (props.$status === 'late') return '#92400e';
    return '#6b7280';
  }};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const SaveButton = styled.button`
  padding: 14px 24px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 28px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #6366f1;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

// ========== ICONS ==========
const NotificationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

const GradeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AnnouncementIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 4H2V16H16L22 22V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 10H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 10H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 10H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AttendanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 11L19 13L23 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AIIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 6H23V12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 20V10M12 20V4M6 20V14" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.9999 15L9.99994 12M14.2399 9.76L19.3399 4.66C19.7019 4.29801 19.7189 3.72099 19.3909 3.35599L19.3399 3.3C18.9789 2.93801 18.4019 2.92101 18.0369 3.24901L17.9999 3.3L12.8899 8.4C12.3309 8.148 11.7189 8 11.0699 8C8.99994 8 6.99994 9 5.99994 10.5C4.99994 12 4.26994 14.57 4.07994 15.7C4.02994 15.99 4.24994 16.26 4.53994 16.29C5.66994 16.48 8.23994 16 9.99994 15C11.7599 14 12.9999 12 12.9999 9.99C12.9999 9.341 12.8519 8.729 12.5999 8.17L17.6999 3.06L17.7499 3.01C18.1119 2.64801 18.6889 2.63101 19.0539 2.95901L19.1099 3.01C19.4719 3.37199 19.4889 3.94901 19.1609 4.31401L19.1099 4.37L14.2399 9.76Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15C11.2044 15 10.4413 15.3161 9.87868 15.8787C9.31607 16.4413 9 17.2044 9 18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18C15 17.2044 14.6839 16.4413 14.1213 15.8787C13.5587 15.3161 12.7956 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 21V13H7V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 3V8H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ========== MAIN COMPONENT ==========
const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const navigate = useNavigate();

  // Sample data
  const stats = [
    { label: 'Total Students', value: '142', trend: '+5%' },
    { label: 'Attendance Rate', value: '94%', trend: '+2%', positive: true },
    { label: 'Assignments Due', value: '3', trend: '2 to grade' },
    { label: 'Avg. Grade', value: 'B+', trend: '+0.5', positive: true }
  ];

  const classes = [
    { id: 'math101', name: 'Math 101', period: '1st Period', students: 24, assignments: 3, attendance: '94%' },
    { id: 'algebra2', name: 'Algebra II', period: '3rd Period', students: 20, assignments: 2, attendance: '92%' },
    { id: 'calculus', name: 'Calculus', period: '5th Period', students: 18, assignments: 4, attendance: '96%' }
  ];

  const students = [
    { id: 1, name: 'Alice Johnson', email: 'alice@school.edu' },
    { id: 2, name: 'Bob Smith', email: 'bob@school.edu' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@school.edu' },
    { id: 4, name: 'Diana Prince', email: 'diana@school.edu' },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@school.edu' },
    { id: 6, name: 'Fiona Green', email: 'fiona@school.edu' }
  ];

  const upcomingAssignments = [
    { class: 'Math 101', title: 'Chapter 3 Quiz', due: 'Nov 15', submissions: '18/24' },
    { class: 'Algebra II', title: 'Linear Equations HW', due: 'Nov 16', submissions: '12/20' },
    { class: 'Calculus', title: 'Derivatives Test', due: 'Nov 17', submissions: '8/18' }
  ];

  const announcements = [
    { title: 'School Holiday', date: 'Nov 10', content: 'No classes on November 23rd for Thanksgiving' },
    { title: 'Parent-Teacher Conferences', date: 'Nov 5', content: 'Sign up sheets available in faculty lounge' }
  ];

  const aiInsights = [
    { 
      title: 'Performance Trends', 
      value: '+12%', 
      description: 'Overall improvement in class performance compared to last month', 
      color: '#10b981',
      bg: '#ecfdf5',
      icon: <TrendUpIcon />
    },
    { 
      title: 'At-Risk Students', 
      value: '3', 
      description: 'Students showing signs of falling behind based on recent assessments', 
      color: '#ef4444',
      bg: '#fef2f2',
      icon: <AlertIcon />
    },
    { 
      title: 'Engagement Score', 
      value: '84/100', 
      description: 'Class participation and assignment completion metrics', 
      color: '#4f46e5',
      bg: '#eef2ff',
      icon: <ChartIcon />
    }
  ];

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
    // In a real app, you would send this data to your backend
  };

  const handleGenerateReport = () => {
    navigate('/ai-report-generator');
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderTitle>Teacher Dashboard</HeaderTitle>
        <HeaderActions>
          <NotificationButton>
            <NotificationIcon />
            <Badge>3</Badge>
          </NotificationButton>
          <UserProfile>
            <span>Ms. Rodriguez</span>
            <UserAvatar>JR</UserAvatar>
          </UserProfile>
        </HeaderActions>
      </DashboardHeader>

      <DashboardTabs>
        <TabButton 
          $active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </TabButton>
        <TabButton 
          $active={activeTab === 'classes'}
          onClick={() => setActiveTab('classes')}
        >
          Classes
        </TabButton>
        <TabButton 
          $active={activeTab === 'attendance'}
          onClick={() => setActiveTab('attendance')}
        >
          Attendance
        </TabButton>
        <TabButton 
          $active={activeTab === 'assignments'}
          onClick={() => setActiveTab('assignments')}
        >
          Assignments
        </TabButton>
        <TabButton 
          $active={activeTab === 'grades'}
          onClick={() => setActiveTab('grades')}
        >
          Grades
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
                <ActionButton $primary>
                  <AssignmentIcon />
                  New Assignment
                </ActionButton>
                <ActionButton onClick={handleTakeAttendance}>
                  <AttendanceIcon />
                  Take Attendance
                </ActionButton>
                <ActionButton>
                  <GradeIcon />
                  Record Grades
                </ActionButton>
                <ActionButton>
                  <AnnouncementIcon />
                  Post Announcement
                </ActionButton>
              </QuickActions>
            </Section>

            <AIIntegration>
              <AITitle>
                <AIIcon />
                <SectionTitle>AI Insights</SectionTitle>
              </AITitle>
              <AIInsights>
                {aiInsights.map((insight, index) => (
                  <AIInsightCard key={index} $color={insight.color} $bg={insight.bg}>
                    <AIInsightTitle>
                      {insight.icon} {insight.title}
                    </AIInsightTitle>
                    <AIInsightValue $color={insight.color}>
                      {insight.value}
                    </AIInsightValue>
                    <AIInsightDesc>
                      {insight.description}
                    </AIInsightDesc>
                    <ViewAll>
                      View details <ChevronRight />
                    </ViewAll>
                  </AIInsightCard>
                ))}
              </AIInsights>
              <AIButton onClick={handleGenerateReport}>
                <RocketIcon />
                Generate Comprehensive Report
              </AIButton>
            </AIIntegration>

            <Section>
              <SectionHeader>
                <SectionTitle>Today's Classes</SectionTitle>
                <ViewAll>
                  View all <ChevronRight />
                </ViewAll>
              </SectionHeader>
              <ClassesGrid>
                {classes.map((cls, index) => (
                  <ClassCard key={index}>
                    <ClassHeader>
                      <ClassTitle>{cls.name}</ClassTitle>
                      <ClassBadge>{cls.period}</ClassBadge>
                    </ClassHeader>
                    <ClassStats>
                      <ClassStat>
                        <ClassStatValue>{cls.students}</ClassStatValue>
                        <ClassStatLabel>Students</ClassStatLabel>
                      </ClassStat>
                      <ClassStat>
                        <ClassStatValue>{cls.assignments}</ClassStatValue>
                        <ClassStatLabel>Assignments</ClassStatLabel>
                      </ClassStat>
                      <ClassStat>
                        <ClassStatValue>{cls.attendance}</ClassStatValue>
                        <ClassStatLabel>Attendance</ClassStatLabel>
                      </ClassStat>
                    </ClassStats>
                    <ClassActions>
                      <SmallButton>Roster</SmallButton>
                      <SmallButton $primary>View</SmallButton>
                    </ClassActions>
                  </ClassCard>
                ))}
              </ClassesGrid>
            </Section>

            <Section>
              <SectionHeader>
                <SectionTitle>Upcoming Assignments</SectionTitle>
                <ViewAll>
                  View all <ChevronRight />
                </ViewAll>
              </SectionHeader>
              <ClassesGrid>
                {upcomingAssignments.map((assignment, index) => (
                  <ClassCard key={index}>
                    <ClassHeader>
                      <ClassTitle>{assignment.title}</ClassTitle>
                      <ClassBadge>{assignment.class}</ClassBadge>
                    </ClassHeader>
                    <div style={{ margin: '16px 0' }}>
                      <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>
                        Due {assignment.due}
                      </div>
                      <div style={{ fontSize: '0.95rem', marginTop: '8px', fontWeight: '500' }}>
                        {assignment.submissions} submitted
                      </div>
                    </div>
                    <ClassActions>
                      <SmallButton>Grade</SmallButton>
                      <SmallButton>Edit</SmallButton>
                    </ClassActions>
                  </ClassCard>
                ))}
              </ClassesGrid>
            </Section>

            <Section>
              <SectionHeader>
                <SectionTitle>Recent Announcements</SectionTitle>
                <ViewAll>
                  View all <ChevronRight />
                </ViewAll>
              </SectionHeader>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {announcements.map((announcement, index) => (
                  <div key={index} style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ fontWeight: '600' }}>{announcement.title}</div>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{announcement.date}</div>
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>
                      {announcement.content}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {activeTab === 'classes' && (
          <Section>
            <SectionHeader>
              <SectionTitle>Your Classes</SectionTitle>
              <SmallButton $primary>
                <PlusIcon />
                Add Class
              </SmallButton>
            </SectionHeader>
            <ClassesGrid>
              {classes.map((cls, index) => (
                <ClassCard key={index}>
                  <ClassHeader>
                    <ClassTitle>{cls.name}</ClassTitle>
                    <ClassBadge>{cls.period}</ClassBadge>
                  </ClassHeader>
                  <ClassStats>
                    <ClassStat>
                      <ClassStatValue>{cls.students}</ClassStatValue>
                      <ClassStatLabel>Students</ClassStatLabel>
                    </ClassStat>
                    <ClassStat>
                      <ClassStatValue>{cls.assignments}</ClassStatValue>
                      <ClassStatLabel>Assignments</ClassStatLabel>
                    </ClassStat>
                    <ClassStat>
                      <ClassStatValue>{cls.attendance}</ClassStatValue>
                      <ClassStatLabel>Attendance</ClassStatLabel>
                    </ClassStat>
                  </ClassStats>
                  <ClassActions>
                    <SmallButton>Roster</SmallButton>
                    <SmallButton onClick={handleTakeAttendance}>
                      Attendance
                    </SmallButton>
                    <SmallButton $primary>View</SmallButton>
                  </ClassActions>
                </ClassCard>
              ))}
            </ClassesGrid>
          </Section>
        )}

        {activeTab === 'attendance' && (
          <AttendanceContainer>
            <AttendanceHeader>
              <AttendanceTitle>Take Attendance</AttendanceTitle>
              <AttendanceControls>
                <ClassSelect 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name} - {cls.period}</option>
                  ))}
                </ClassSelect>
                <DatePicker 
                  type="date" 
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                />
              </AttendanceControls>
            </AttendanceHeader>

            {selectedClass && (
              <>
                <AttendanceTable>
                  <thead>
                    <tr>
                      <TableHeader>Student Name</TableHeader>
                      <TableHeader>Email</TableHeader>
                      <TableHeader>Status</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <StatusButton 
                              $status="present"
                              onClick={() => handleStatusChange(student.id, 'present')}
                              $active={attendanceStatus[student.id] === 'present'}
                            >
                              Present
                            </StatusButton>
                            <StatusButton 
                              $status="late"
                              onClick={() => handleStatusChange(student.id, 'late')}
                              $active={attendanceStatus[student.id] === 'late'}
                            >
                              Late
                            </StatusButton>
                            <StatusButton 
                              $status="absent"
                              onClick={() => handleStatusChange(student.id, 'absent')}
                              $active={attendanceStatus[student.id] === 'absent'}
                            >
                              Absent
                            </StatusButton>
                          </div>
                        </TableCell>
                      </tr>
                    ))}
                  </tbody>
                </AttendanceTable>
                <SaveButton onClick={handleSaveAttendance}>
                  <SaveIcon />
                  Save Attendance
                </SaveButton>
              </>
            )}
          </AttendanceContainer>
        )}

        {/* Other tabs (assignments, grades) would be implemented similarly */}
      </DashboardMain>
    </DashboardContainer>
  );
};

export default TeacherDashboard;