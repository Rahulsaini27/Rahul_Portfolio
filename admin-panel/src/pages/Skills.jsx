import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiTrash, HiPlusCircle } from 'react-icons/hi';
   import { API_URL } from '../config';

const Skills = () => {
    const [categories, setCategories] = useState([]);
    const [skills, setSkills] = useState([]);
    const [catName, setCatName] = useState('');
    const [skillForm, setSkillForm] = useState({ name: '', level: 'Basic', category: '' });
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        const [catRes, skillRes] = await Promise.all([
            axios.get(`${API_URL}/category`),
            axios.get(`${API_URL}/portfolio/skills`)
        ]);
        setCategories(catRes.data);
        setSkills(skillRes.data);
    };

    useEffect(() => { fetchData(); }, []);

    // Add Category
    const addCategory = async () => {
        if(!catName) return;
        try {
            await axios.post(`${API_URL}/category`, { name: catName }, { headers: { 'x-auth-token': token } });
            setCatName('');
            toast.success('Category Added');
            fetchData();
        } catch { toast.error('Failed'); }
    };

    // Delete Category
    const deleteCategory = async (id) => {
        if(!confirm("Delete category and all related skills?")) return;
        try {
            await axios.delete(`${API_URL}/category/${id}`, { headers: { 'x-auth-token': token } });
            toast.success('Deleted');
            fetchData();
        } catch { toast.error('Failed'); }
    };

    // Add Skill
    const addSkill = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/portfolio/skills`, skillForm, { headers: { 'x-auth-token': token } });
            toast.success('Skill Added');
            fetchData();
            setSkillForm({ ...skillForm, name: '' }); // clear name
        } catch { toast.error('Failed'); }
    };

    // Delete Skill
    const deleteSkill = async (id) => {
        try {
            await axios.delete(`${API_URL}/portfolio/skills/${id}`, { headers: { 'x-auth-token': token } });
            toast.success('Skill Deleted');
            fetchData();
        } catch { toast.error('Failed'); }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- LEFT: CATEGORIES --- */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <HiPlusCircle className="text-[#4ade80]" /> Categories
                </h3>
                <div className="flex gap-2 mb-6">
                    <input 
                        value={catName} 
                        onChange={e => setCatName(e.target.value)} 
                        placeholder="New Category (e.g. Frontend)" 
                        className="flex-1 border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-[#4ade80] outline-none"
                    />
                    <button onClick={addCategory} className="bg-[#4ade80] text-white px-4 rounded-lg text-sm font-medium hover:bg-green-600">Add</button>
                </div>
                <div className="space-y-2">
                    {categories.map(cat => (
                        <div key={cat._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="font-medium text-gray-700">{cat.name}</span>
                            <button onClick={() => deleteCategory(cat._id)} className="text-red-400 hover:text-red-600"><HiTrash /></button>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- RIGHT: SKILLS --- */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <HiPlusCircle className="text-blue-500" /> Manage Skills
                </h3>
                
                {/* Add Skill Form */}
                <form onSubmit={addSkill} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="md:col-span-1">
                        <input required value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} placeholder="Skill Name" className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <select onChange={e => setSkillForm({...skillForm, level: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white">
                            <option value="Basic">Basic</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div>
                        <select required onChange={e => setSkillForm({...skillForm, category: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white">
                            <option value="">Category</option>
                            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Save</button>
                </form>

                {/* Skills List Grouped by Category could go here, but let's do a flat list for simplicity in admin */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map(skill => (
                        <div key={skill._id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:shadow-md transition">
                            <div>
                                <h4 className="font-bold text-gray-800">{skill.name}</h4>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{skill.level}</span>
                                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{skill.category?.name}</span>
                                </div>
                            </div>
                            <button onClick={() => deleteSkill(skill._id)} className="p-2 text-gray-400 hover:text-red-500 transition"><HiTrash /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;