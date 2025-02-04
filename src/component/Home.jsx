import React, { useEffect } from 'react';

// Animation hook for scrolling
const useAnimateOnScroll = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const handleScroll = () => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          element.classList.add('opacity-100', 'translate-x-0');
        } else {
          element.classList.remove('opacity-100', 'translate-x-0');
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
      <section className="relative bg-cover bg-center h-[600px] flex items-center justify-center text-white text-center px-6 animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000" style={{ backgroundImage: "url('/college-hero-bg.jpg')" }}>
        <div className="bg-black bg-opacity-30 p-10 rounded-xl shadow-lg">
          <h1 className="text-5xl font-extrabold">Welcome to the College Portal</h1>
          <p className="mt-4 text-lg text-gray-200">Your gateway to academic resources, news, and student services.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-8 text-center bg-white shadow-sm rounded-lg mx-6 animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000">
        <h2 className="text-4xl font-bold text-gray-800">About the Portal</h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">The college portal provides easy access to course schedules, exam results, class notifications, and more. Stay up-to-date with everything related to your academics.</p>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 text-center bg-gray-50 animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000">
        <h2 className="text-4xl font-bold text-gray-800">Portal Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
          <div className="p-8 border rounded-lg shadow-lg bg-white animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000">
            <h3 className="text-2xl font-semibold text-gray-800">Course Management</h3>
            <p className="mt-2 text-gray-600">Easily manage and access course materials, lectures, assignments, and grades.</p>
          </div>
          <div className="p-8 border rounded-lg shadow-lg bg-white animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000">
            <h3 className="text-2xl font-semibold text-gray-800">Exam Results</h3>
            <p className="mt-2 text-gray-600">Access your latest exam results, track progress, and receive detailed performance reports.</p>
          </div>
          <div className="p-8 border rounded-lg shadow-lg bg-white animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000">
            <h3 className="text-2xl font-semibold text-gray-800">Timetable</h3>
            <p className="mt-2 text-gray-600">View your class schedule, exam dates, and important academic events.</p>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="bg-blue-600 text-white py-20 text-center animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000">
        <h2 className="text-4xl font-bold">Latest Campus News</h2>
        <div className="mt-8 max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800">New Semester Begins</h3>
            <p className="mt-4 text-gray-600">The new semester starts on February 10th, with orientation sessions scheduled for all new students.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800">Faculty Meet and Greet</h3>
            <p className="mt-4 text-gray-600">Join the meet-and-greet event for all faculty members to discuss the upcoming academic year.</p>
          </div>
        </div>
      </section>

      {/* Request Demo Section */}
      <section className="py-20 px-8 text-center bg-gray-200 animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000">
        <h2 className="text-4xl font-bold text-gray-800">Request a Demo</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Want to see how our college portal can benefit you? Request a demo to get started.</p>
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4">
          <input type="email" placeholder="Enter your email" className="p-4 border rounded-md w-full md:w-96" />
          <button className="bg-blue-700 px-8 py-4 rounded-lg text-white font-semibold shadow-md hover:bg-blue-800 transition">Request Demo</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center mt-10">
        <p className="text-lg">&copy; 2025 College Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
