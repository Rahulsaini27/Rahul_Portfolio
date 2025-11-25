import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    HiOutlineTemplate,
    HiOutlineBriefcase,
    HiOutlineCode,
    HiOutlineChatAlt2,
    HiOutlineLogout,
    HiOutlineUser,
    HiOutlineIdentification,
    HiOutlineAcademicCap,
    HiOutlineClipboardList
} from 'react-icons/hi';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: <HiOutlineTemplate />, path: '/' },
        { name: 'Home / Hero', icon: <HiOutlineUser />, path: '/hero' },
        { name: 'About Me', icon: <HiOutlineIdentification />, path: '/about' },
        { name: 'Services', icon: <HiOutlineClipboardList />, path: '/services' },
        { name: 'Skills & Categories', icon: <HiOutlineCode />, path: '/skills' },
        { name: 'Experience', icon: <HiOutlineAcademicCap />, path: '/experience' },
        { name: 'Projects', icon: <HiOutlineBriefcase />, path: '/projects' },
        { name: 'Messages', icon: <HiOutlineChatAlt2 />, path: '/messages' },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 flex flex-col z-50">
            <div className="h-20 flex items-center px-8 border-b border-gray-50">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#4ade80] rounded-lg flex items-center justify-center text-white text-lg">D</div>
                    Dasher
                </h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Content</p>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
                                    ? 'bg-green-50 text-[#4ade80]'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-50">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
                >
                    <HiOutlineLogout className="text-xl" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;