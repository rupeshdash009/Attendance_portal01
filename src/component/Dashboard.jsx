import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FiLogOut, 
  FiUser, 
  FiHome, 
  FiClipboard, 
  FiBell,
  FiTrendingUp,
  FiCalendar,
  FiAward,
  FiChevronDown
} from "react-icons/fi";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

function Dashboard() {
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const headers = { 
          Authorization: `Bearer ${token}` 
        };

        const [userRes, attendanceRes] = await Promise.all([
          axios.get("https://attendance-backend12.onrender.com/api/auth/dashboard", { headers }),
          axios.get("https://attendance-backend12.onrender.com/api/attendance", { headers })
        ]);

        setUser(userRes.data.user);
        setAttendance(Array.isArray(attendanceRes.data.attendance) ? 
          attendanceRes.data.attendance : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Process attendance data
  const attendanceSummary = attendance.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, { Present: 0, Absent: 0, Late: 0, Excused: 0 });

  const totalClasses = attendance.length;
  const attendancePercentage = totalClasses ? 
    Math.round((attendanceSummary.Present / totalClasses) * 100) : 0;

  const barChartData = Object.keys(attendanceSummary).map((key) => ({
    name: key,
    count: attendanceSummary[key],
  }));

  const pieChartData = Object.keys(attendanceSummary)
    .filter(key => attendanceSummary[key] > 0)
    .map((key) => ({
      name: key,
      value: attendanceSummary[key],
    }));

  const recentAttendance = [...attendance]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-pulse text-xl font-semibold text-indigo-600">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <div className="w-20 md:w-64 bg-indigo-700 text-white flex flex-col p-4 fixed h-full transition-all duration-300">
        <h2 className="text-xl font-bold mb-10 mt-4 hidden md:block">EduTrack</h2>
        <ul className="space-y-6">
          <li 
            className="flex items-center justify-center md:justify-start gap-3 p-3 hover:bg-indigo-600 cursor-pointer rounded-lg transition"
            onClick={() => navigate("/dashboard")}
          >
            <FiHome className="text-xl" />
            <span className="hidden md:inline">Home</span>
          </li>
          <li 
            className="flex items-center justify-center md:justify-start gap-3 p-3 hover:bg-indigo-600 cursor-pointer rounded-lg transition"
            onClick={() => navigate("/profile")}
          >
            <FiUser className="text-xl" />
            <span className="hidden md:inline">Profile</span>
          </li>
          {/* Removed navigation from this list item since we're already on attendance */}
          <li className="flex items-center justify-center md:justify-start gap-3 p-3 bg-indigo-800 rounded-lg">
            <FiClipboard className="text-xl" />
            <span className="hidden md:inline">Attendance</span>
          </li>
        </ul>
        <button 
          className="mt-auto flex items-center justify-center md:justify-start gap-2 p-3 hover:bg-indigo-600 rounded-lg transition"
          onClick={() => setShowLogoutConfirm(true)}
        >
          <FiLogOut className="text-xl" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-20 md:ml-64 p-6">
        {/* Header with User Dropdown */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-indigo-800">
              Attendance Portal
            </h1>
            <p className="text-gray-500">View your attendance records and statistics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FiBell className="text-2xl text-indigo-600 cursor-pointer" />
            </div>
            <div className="relative">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <FiChevronDown className={`transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
              </div>
              
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    {user?.email || "user@example.com"}
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setShowLogoutConfirm(true);
                      setShowUserDropdown(false);
                    }}
                  >
                    <FiLogOut /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Overall Attendance</p>
                <h3 className="text-2xl font-bold text-indigo-600">{attendancePercentage}%</h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <FiTrendingUp className="text-indigo-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Present</p>
                <h3 className="text-2xl font-bold text-green-600">{attendanceSummary.Present}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiAward className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Classes</p>
                <h3 className="text-2xl font-bold text-gray-700">{totalClasses}</h3>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <FiCalendar className="text-gray-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-indigo-800">
              Attendance Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-indigo-800">
              Attendance Trends
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-indigo-800">
            Recent Attendance Records
          </h3>
          <div className="space-y-3">
            {recentAttendance.length > 0 ? (
              recentAttendance.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="font-medium">{record.courseName || "Class"}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                    record.status === "Present" ? "bg-green-100 text-green-800" :
                    record.status === "Absent" ? "bg-red-100 text-red-800" :
                    record.status === "Late" ? "bg-yellow-100 text-yellow-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {record.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-6">No attendance records available</p>
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Logout</h3>
            <p className="text-gray-600">Are you sure you want to sign out?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;