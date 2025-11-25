import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardHome from './DashboardHome';

  
// Placeholder components for specific pages to keep router happy
const ProjectsPage = () => <div className="p-8"><h2>Projects Management (CRUD Forms Here)</h2></div>;
const SkillsPage = () => <div className="p-8"><h2>Skills Management (CRUD Forms Here)</h2></div>;
const MessagesPage = () => <div className="p-8"><h2>Messages (Inbox View Here)</h2></div>;

const Dashboard = ({ token, setToken }) => {
    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <div className="flex h-screen bg-[#f8f9fa]">
            {/* Sidebar */}
            <Sidebar handleLogout={handleLogout} />

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col">
                <Header />
                
                <div className="flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<DashboardHome token={token} />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/skills" element={<SkillsPage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;