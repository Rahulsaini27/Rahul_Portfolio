import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiTrash, HiPlus } from 'react-icons/hi';
   import { API_URL } from '../config';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', category: 'Basic', demoLink: '', repoLink: '', image: null });
    const token = localStorage.getItem('token');

    const fetchProjects = async () => {
        const res = await axios.get(`${API_URL}/portfolio/projects`);
        setProjects(res.data);
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        try {
            await axios.post(`${API_URL}/portfolio/projects`, data, { headers: { 'x-auth-token': token } });
            toast.success('Project Added');
            setShowModal(false);
            fetchProjects();
        } catch (err) { toast.error('Error adding project'); }
    };

    const handleDelete = async (id) => {
        if(!confirm("Delete this project?")) return;
        try {
            await axios.delete(`${API_URL}/portfolio/projects/${id}`, { headers: { 'x-auth-token': token } });
            toast.success('Project Deleted');
            fetchProjects();
        } catch (err) { toast.error('Error deleting'); }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-600 transition shadow-lg shadow-green-100">
                    <HiPlus /> Add Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(proj => (
                    <div key={proj._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group">
                        <div className="h-48 overflow-hidden relative">
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                                {proj.category}
                            </span>
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{proj.title}</h3>
                            <div className="flex gap-2 mb-4">
                                {proj.demoLink && <a href={proj.demoLink} target="_blank" className="text-xs text-blue-500 hover:underline">Live Demo</a>}
                                {proj.repoLink && <a href={proj.repoLink} target="_blank" className="text-xs text-gray-500 hover:underline">Github</a>}
                            </div>
                            <button onClick={() => handleDelete(proj._id)} className="w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition">
                                <HiTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl">
                        <h3 className="text-xl font-bold mb-6">Add New Project</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Project Title" className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" onChange={e => setFormData({...formData, title: e.target.value})} required />
                            <select className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option value="Basic">Basic</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            <input type="text" placeholder="Demo URL" className="w-full border border-gray-300 p-3 rounded-xl" onChange={e => setFormData({...formData, demoLink: e.target.value})} />
                            <input type="text" placeholder="Repo URL" className="w-full border border-gray-300 p-3 rounded-xl" onChange={e => setFormData({...formData, repoLink: e.target.value})} />
                            <input type="file" className="w-full border border-gray-300 p-3 rounded-xl" onChange={e => setFormData({...formData, image: e.target.files[0]})} required />
                            
                            <div className="flex gap-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-200">Cancel</button>
                                <button type="submit" className="flex-1 bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600">Save Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;