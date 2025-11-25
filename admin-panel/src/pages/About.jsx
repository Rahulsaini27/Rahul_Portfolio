
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
   import { API_URL } from '../config';

const About = () => {
    const [description, setDescription] = useState('');
    const [info, setInfo] = useState([{ title: 'Experience', subtitle: '' }, { title: 'Completed', subtitle: '' }, { title: 'Support', subtitle: '' }]);
    const [files, setFiles] = useState({ image: null, cv: null });
    const [previews, setPreviews] = useState({ image: '', cvLink: '' });
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/content/about`);
                if (res.data) {
                    setDescription(res.data.description || '');
                    if (res.data.info && res.data.info.length > 0) setInfo(res.data.info);
                    if (res.data.image) setPreviews(prev => ({...prev, image: res.data.image}));
                    if (res.data.cv) setPreviews(prev => ({...prev, cvLink: res.data.cv}));
                }
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, []);


const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('info', JSON.stringify(info));
    if (files.image) formData.append('image', files.image);
    if (files.cv) formData.append('cv', files.cv);

    try {
        await axios.put(`${API_URL}/content/about`, formData, {
            headers: { 'x-auth-token': token }
        });

        toast.success('About Section Updated');
    } catch (err) {
        toast.error('Update failed');
    }
};

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit About Section</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
                <textarea rows="5" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-4 border rounded-xl" placeholder="About Description"></textarea>
                <div className="grid grid-cols-3 gap-4">
                    {info.map((item, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-xl border"><label className="block text-xs font-bold uppercase mb-2">{item.title}</label><input value={item.subtitle} onChange={e => {const n=[...info]; n[i].subtitle=e.target.value; setInfo(n)}} className="w-full p-2 border rounded-lg text-sm" /></div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div><label className="block text-sm font-bold mb-2">Image</label><div className="flex items-center gap-4">{previews.image && <img src={previews.image} className="w-16 h-16 rounded-lg object-cover" />}<input type="file" onChange={e => { setFiles({...files, image: e.target.files[0]}); setPreviews({...previews, image: URL.createObjectURL(e.target.files[0])}); }} /></div></div>
                    <div><label className="block text-sm font-bold mb-2">CV (PDF)</label><div className="flex items-center gap-4">{previews.cvLink && <a href={previews.cvLink} target="_blank" className="text-xs text-green-500 underline">View CV</a>}<input type="file" accept="application/pdf" onChange={e => setFiles({...files, cv: e.target.files[0]})} /></div></div>
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600">Save Details</button>
            </form>
        </div>
    );
};
export default About;