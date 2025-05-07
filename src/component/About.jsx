import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-500 to-indigo-600 h-[500px] flex items-center justify-center text-white text-center px-6">
        <motion.div 
          className="p-10 rounded-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold">Discover Our Mission</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            We are committed to providing an intuitive and modern approach to attendance management.
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-8 text-center">
        <motion.h2 
          className="text-4xl font-bold text-gray-900" 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Who We Are
        </motion.h2>
        <motion.p 
          className="mt-4 text-gray-700 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Our attendance portal is designed to enhance student engagement, simplify record-keeping, and improve efficiency in educational institutions.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="bg-indigo-700 text-white py-20 text-center">
        <h2 className="text-4xl font-bold">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
          <motion.div 
            className="p-8 rounded-lg shadow-lg bg-white text-gray-900" 
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold">Seamless Integration</h3>
            <p className="mt-2">Easily integrates with your existing system for a hassle-free experience.</p>
          </motion.div>
          <motion.div 
            className="p-8 rounded-lg shadow-lg bg-white text-gray-900" 
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold"> Insights</h3>
            <p className="mt-2">Get detailed analytics and reports to track student performance.</p>
          </motion.div>
          <motion.div 
            className="p-8 rounded-lg shadow-lg bg-white text-gray-900" 
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold">Security & Privacy</h3>
            <p className="mt-2">We ensure your data is encrypted and securely stored.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-200 py-20 px-8 text-center rounded-lg mx-6">
        <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Have questions? Contact us to learn more about how we can help your institution.
        </p>
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4">
          <motion.input 
            type="email" 
            placeholder="Enter your email" 
            className="p-4 border rounded-md w-full md:w-96" 
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button 
            className="bg-purple-700 px-8 py-4 rounded-lg text-white font-semibold shadow-lg hover:bg-purple-800 transition" 
            whileHover={{ scale: 1.05 }}
          >
            Contact Us
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center mt-10">
        <p className="text-lg">&copy; 2025 Attendance Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
