
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiSave } from 'react-icons/hi';
import { API_URL } from '../config';
import Loading from '../components/Loading';

const Hero = () => {
    const [formData, setFormData] = useState({
        title: '', subtitle: '', description: '', instagram: '', github: '', linkedin: '', email: '', image: null
    });
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await axios.get(`${API_URL}/content/hero`);
                if(res.data) {
                    setFormData({
                        ...res.data,
                        instagram: res.data.socials?.instagram || '',
                        github: res.data.socials?.github || '',
                        linkedin: res.data.socials?.linkedin || '',
                        email: res.data.socials?.email || '',
                        image: null
                    });
                    if(res.data.image) setPreview(res.data.image);
                }
            } catch (err) { 
                console.error(err); 
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if(formData[key]) data.append(key, formData[key]);
        });
        try {
            await axios.put(`${API_URL}/content/hero`, data, { headers: { 'x-auth-token': token } });
            toast.success('Hero Updated!');
        } catch (err) { 
            toast.error('Update failed'); 
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Home Section</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                        <input type="text" placeholder="Main Title (Name)" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 border rounded-xl" />
                        <input type="text" placeholder="Subtitle (Role)" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full p-3 border rounded-xl" />
                        <textarea rows="4" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 border rounded-xl"></textarea>
                    </div>
                    <div className="space-y-5">
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200">
                                {preview && <img src={preview} alt="Profile" className="w-full h-full object-cover" />}
                            </div>
                            <input type="file" onChange={(e) => { setFormData({...formData, image: e.target.files[0]}); setPreview(URL.createObjectURL(e.target.files[0])); }} />
                        </div>
                        <div className="pt-4 border-t border-gray-100 space-y-3">
                            <input type="text" placeholder="GitHub URL" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                            <input type="text" placeholder="LinkedIn URL" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                            <input type="text" placeholder="Instagram URL" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                            <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                        </div>
                    </div>
                </div>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="mt-8 w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition disabled:bg-green-300 flex justify-center items-center"
                >
                    {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> : "Update Hero"}
                </button>
            </form>
        </div>
    );
};

export default Hero;