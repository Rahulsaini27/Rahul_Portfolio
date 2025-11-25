import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import DashboardHome from './pages/DashboardHome';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Hero from './pages/Hero';
import About from './pages/About';
import Experience from './pages/Experience';
import ServicesManager from './pages/ServicesManager';
import Messages from './pages/Messages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem('token')) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="hero" element={<Hero />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experience" element={<Experience />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="projects" element={<Projects />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;