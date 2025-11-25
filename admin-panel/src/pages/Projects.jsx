
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiTrash, HiPlus, HiOutlineRefresh } from 'react-icons/hi';
import { API_URL } from '../config';
import Loading from '../components/Loading';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. Explicit State for every field to prevent "undefined" issues
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Basic');
    const [description, setDescription] = useState('');
    const [demoLink, setDemoLink] = useState('');
    const [repoLink, setRepoLink] = useState('');
    const [image, setImage] = useState(null);

    const token = localStorage.getItem('token');

    // Fetch Projects
    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${API_URL}/portfolio/projects`);
            setProjects(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load projects");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { 
        fetchProjects(); 
    }, []);

    // 2. Submit Handler with Proper Debugging
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Create FormData
        const data = new FormData();
        data.append('title', title);
        data.append('category', category);
        data.append('description', description);
        data.append('demoLink', demoLink);
        data.append('repoLink', repoLink);
        if (image) {
            data.append('image', image);
        }

        try {
            await axios.post(`${API_URL}/portfolio/projects`, data, { 
                headers: { 'x-auth-token': token } 
            });
            
            toast.success('Project Added Successfully');
            setShowModal(false);
            
            // Reset Form
            setTitle('');
            setDescription('');
            setDemoLink('');
            setRepoLink('');
            setImage(null);
            
            fetchProjects();
        } catch (err) { 
            console.error(err);
            toast.error(err.response?.data?.msg || 'Error adding project'); 
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if(!confirm("Are you sure you want to delete this project?")) return;
        try {
            await axios.delete(`${API_URL}/portfolio/projects/${id}`, { 
                headers: { 'x-auth-token': token } 
            });
            toast.success('Project Deleted');
            fetchProjects();
        } catch (err) { 
            toast.error('Error deleting project'); 
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
                <button 
                    onClick={() => setShowModal(true)} 
                    className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-600 transition shadow-lg shadow-green-100"
                >
                    <HiPlus /> Add Project
                </button>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(proj => (
                        <div key={proj._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col">
                            <div className="h-48 overflow-hidden relative">
                                <img 
                                    src={proj.image} 
                                    alt={proj.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                                />
                                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                                    {proj.category}
                                </span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">{proj.title}</h3>
                                
                                {/* Show truncated description in card */}
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1" title={proj.description}>
                                    {proj.description ? proj.description : "No description provided"}
                                </p>

                                <div className="flex gap-2 mb-4 mt-auto">
                                    {proj.demoLink && <a href={proj.demoLink} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline bg-blue-50 px-2 py-1 rounded">Live Demo</a>}
                                    {proj.repoLink && <a href={proj.repoLink} target="_blank" rel="noreferrer" className="text-xs text-gray-600 hover:underline bg-gray-100 px-2 py-1 rounded">Github</a>}
                                </div>
                                <button 
                                    onClick={() => handleDelete(proj._id)} 
                                    className="w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                                >
                                    <HiTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-6">Add New Project</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            {/* Title */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                                <input 
                                    type="text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                                    required 
                                />
                            </div>
                            
                            {/* Category */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white"
                                >
                                    <option value="Basic">Basic</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            {/* Description - DIRECT STATE BINDING */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe project features..." 
                                    rows="4"
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                                    required 
                                />
                            </div>

                            {/* Links */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Demo Link</label>
                                    <input 
                                        type="text" 
                                        value={demoLink}
                                        onChange={(e) => setDemoLink(e.target.value)}
                                        className="w-full border border-gray-300 p-3 rounded-xl" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Repo Link</label>
                                    <input 
                                        type="text" 
                                        value={repoLink}
                                        onChange={(e) => setRepoLink(e.target.value)}
                                        className="w-full border border-gray-300 p-3 rounded-xl" 
                                    />
                                </div>
                            </div>
                            
                            {/* Image */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cover Image</label>
                                <input 
                                    type="file" 
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="w-full border border-gray-300 p-3 rounded-xl" 
                                    required 
                                />
                            </div>
                            
                            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)} 
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="flex-1 bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition disabled:bg-green-300 flex justify-center items-center gap-2"
                                >
                                    {isSubmitting ? <HiOutlineRefresh className="animate-spin" /> : "Save Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;