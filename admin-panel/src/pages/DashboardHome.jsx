
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { HiOutlineBriefcase, HiOutlineClipboardList, HiOutlineChatAlt2 } from 'react-icons/hi';
import { API_URL } from '../config';
import Loading from '../components/Loading';

const DashboardHome = () => {
    const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0 });
    const [recentProjects, setRecentProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projRes, skillRes, msgRes] = await Promise.all([
                    axios.get(`${API_URL}/portfolio/projects`),
                    axios.get(`${API_URL}/portfolio/skills`),
                    axios.get(`${API_URL}/messages`, { headers: { 'x-auth-token': token } })
                ]);

                setStats({
                    projects: projRes.data.length,
                    skills: skillRes.data.length,
                    messages: msgRes.data.length
                });
                setRecentProjects(projRes.data.slice(0, 5));
            } catch (error) { 
                console.error("Error loading dashboard data"); 
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const chartData = [
        { name: 'Projects', value: stats.projects },
        { name: 'Skills', value: stats.skills },
        { name: 'Messages', value: stats.messages },
    ];
    const COLORS = ['#10b981', '#3b82f6', '#f97316'];

    if (loading) return <Loading />;

    return (
        <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">Total Projects</p>
                        <h2 className="text-3xl font-bold text-gray-800">{stats.projects}</h2>
                    </div>
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl"><HiOutlineBriefcase /></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">Total Skills</p>
                        <h2 className="text-3xl font-bold text-gray-800">{stats.skills}</h2>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl"><HiOutlineClipboardList /></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">Messages</p>
                        <h2 className="text-3xl font-bold text-gray-800">{stats.messages}</h2>
                    </div>
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-xl"><HiOutlineChatAlt2 /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Projects */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Projects</h3>
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-400 text-xs uppercase border-b border-gray-100"><th className="pb-4">Project</th><th className="pb-4">Category</th><th className="pb-4">Status</th></tr>
                        </thead>
                        <tbody className="text-sm">
                            {recentProjects.map((proj) => (
                                <tr key={proj._id} className="border-b border-gray-50 last:border-none">
                                    <td className="py-4 flex items-center gap-3">
                                        <img src={proj.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                        <span className="font-semibold text-gray-800">{proj.title}</span>
                                    </td>
                                    <td className="py-4"><span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">{proj.category}</span></td>
                                    <td className="py-4 text-gray-500">Live</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Overview Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-80">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Content Overview</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;