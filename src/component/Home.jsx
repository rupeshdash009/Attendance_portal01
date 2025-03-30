import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaRegClock, FaBook, FaBell, FaTimes, FaUserGraduate, FaUsers, FaChartLine, FaQuoteLeft, FaLaptopCode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const useAnimateOnScroll = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const handleScroll = () => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          element.classList.add('opacity-100', 'transform', 'translate-y-0');
        } else {
          element.classList.remove('opacity-100', 'transform', 'translate-y-0');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

const Home = () => {
  useAnimateOnScroll();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setNotifications([
      { id: 1, message: 'Attendance reports are now available!' }
    ]);
  }, []);

  return (
    <div className="bg-gray-100 font-sans relative">
      {/* Notifications Bell */}
      <div 
        className="fixed top-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg cursor-pointer z-50 hover:bg-indigo-700 transition duration-300"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <FaBell className="text-2xl" />
      </div>

      {/* Notification Panel */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-lg w-80 transform ${showNotifications ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 border-l border-gray-300 p-4`}>
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-semibold">Latest Updates</h3>
          <FaTimes className="text-gray-500 cursor-pointer hover:text-gray-800" onClick={() => setShowNotifications(false)} />
        </div>
        <ul className="mt-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li key={notification.id} className="mt-2 text-gray-800 text-sm bg-gray-100 p-2 rounded-md">
                {notification.message}
              </li>
            ))
          ) : (
            <p className="text-gray-600 text-sm mt-2">No new notifications.</p>
          )}
        </ul>
      </div>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[650px] flex items-center justify-center text-white text-center px-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000" style={{ backgroundImage: "url('/attendance-portal-hero.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-12 rounded-xl shadow-xl">
          <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-md">Seamless Attendance Management</h1>
          <p className="mt-4 text-lg text-gray-200">Empowering students and teachers with real-time tracking.</p>
          <button className="mt-6 bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition duration-300" onClick={() => navigate('/login')}>
            Access Portal
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 text-center bg-white animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
        <h2 className="text-4xl font-bold text-gray-800">Why Choose Our Attendance System?</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{ icon: <FaUserGraduate />, text: "Students can track their attendance records effortlessly." },
            { icon: <FaChartLine />, text: "Teachers & Admins can monitor attendance analytics easily." },
            { icon: <FaLaptopCode />, text: "Advanced AI-driven analytics for better insights." }
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
              <div className="text-indigo-600 text-5xl mb-4">{feature.icon}</div>
              <p className="text-gray-700 text-lg">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-indigo-600 text-white animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
        <h2 className="text-4xl font-bold">Join the Future of Attendance Tracking</h2>
        <p className="mt-4 text-lg">Sign up today and experience a smarter way to manage attendance.</p>
        <button className="mt-6 bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition duration-300" onClick={() => navigate('/register')}>
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center mt-10">
        <p className="text-lg">&copy; 2025 Attendance Portal. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-6">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
