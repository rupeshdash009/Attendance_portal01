// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { FaCheckCircle, FaRegClock, FaBook } from 'react-icons/fa';
// import { FaBook, FaCheckCircle } from 'react-icons/fa';
// import { MdEmail } from 'react-icons/md';
// import { BsFillPersonFill } from 'react-icons/bs';


// Animation hook for scroll effects
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

  return '';
};

const Home = () => {
  useAnimateOnScroll();

  return (
    <div className="bg-gray-100 font-sans">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[650px] flex items-center justify-center text-white text-center px-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000" style={{ backgroundImage: "url('/attendance-hero-bg.jpg')" }}>
        <div className="bg-black bg-opacity-40 p-12 rounded-xl shadow-xl">
          <h1 className="text-6xl font-extrabold tracking-tight">Welcome to the Attendance Portal</h1>
          <p className="mt-4 text-lg text-gray-200">Effortlessly manage your academic progress, attendance, and stay up to date with the latest campus activities.</p>
          <button className="mt-6 bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-8 text-center bg-white shadow-lg rounded-lg mx-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
        <h2 className="text-4xl font-bold text-gray-800">Why Choose Our Attendance Portal?</h2>
        <p className="mt-4 text-gray-600 max-w-4xl mx-auto">Our system is designed to offer an intuitive experience, with real-time attendance tracking, comprehensive student data management, and easy integration with academic systems. Take control of your academic journey.</p>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 text-center bg-gray-50 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
        <h2 className="text-4xl font-bold text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
          <div className="p-8 border rounded-lg shadow-xl bg-white animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <FaCheckCircle className="text-4xl text-indigo-600 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">Real-Time Attendance</h3>
            <p className="mt-2 text-gray-600">Monitor student attendance instantly with up-to-date records, ensuring no discrepancies.</p>
          </div>
          <div className="p-8 border rounded-lg shadow-xl bg-white animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <FaRegClock className="text-4xl text-indigo-600 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">Flexible Timetable</h3>
            <p className="mt-2 text-gray-600">Manage class schedules and exam dates with ease. Get notified about important academic events.</p>
          </div>
          <div className="p-8 border rounded-lg shadow-xl bg-white animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <FaBook className="text-4xl text-indigo-600 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">Course & Study Resources</h3>
            <p className="mt-2 text-gray-600">Access your course materials, lecture notes, and assignments in one convenient place.</p>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="bg-indigo-600 text-white py-20 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
        <h2 className="text-4xl font-bold">Latest Campus Updates</h2>
        <div className="mt-8 max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800">New Semester Begins</h3>
            <p className="mt-4 text-gray-600">The new semester starts on February 10th, with orientation sessions scheduled for all new students.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800">Upcoming Faculty Meet & Greet</h3>
            <p className="mt-4 text-gray-600">Join the meet-and-greet event for all faculty members to discuss the upcoming academic year.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-8 text-center bg-gray-200 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
        <h2 className="text-4xl font-bold text-gray-800">Get Started with Your Attendance</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Sign up now to take full control of your attendance and academic records. Join thousands of students using our portal.</p>
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4">
          <input type="email" placeholder="Enter your email" className="p-4 border rounded-md w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          <button className="bg-indigo-700 px-8 py-4 rounded-lg text-white font-semibold shadow-md hover:bg-indigo-800 transition">Sign Up Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center mt-10">
        <p className="text-lg">&copy; 2025 College Attendance Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
