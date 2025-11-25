
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiTrash, HiPlus } from 'react-icons/hi';
import { API_URL } from '../config';
import Loading from '../components/Loading';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', pointInput: '' });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem('token');

    const fetchServices = async () => {
        try {
            const res = await axios.get(`${API_URL}/content/services`);
            setServices(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchServices(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Convert comma separated string to array
        const pointsArray = form.pointInput.split(',').map(item => item.trim());
        
        try {
            await axios.post(`${API_URL}/content/services`, {
                title: form.title,
                description: form.description,
                points: pointsArray
            }, { headers: { 'x-auth-token': token } });
            
            toast.success('Service Added');
            setForm({ title: '', description: '', pointInput: '' });
            fetchServices();
        } catch (err) { toast.error('Error adding service'); }
        finally { setIsSubmitting(false); }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/content/services/${id}`, { 
                headers: { 'x-auth-token': token } 
            });
            toast.success('Deleted');
            fetchServices();
        } catch (err) { toast.error('Delete failed'); }
    };

    if (loading) return <Loading />;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Add Service</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input required placeholder="Title (e.g. Frontend Dev)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#4ade80]" />
                    <textarea required placeholder="Description" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#4ade80]"></textarea>
                    <textarea required placeholder="Points (Comma separated: Clean Code, fast, secure)" rows="3" value={form.pointInput} onChange={e => setForm({...form, pointInput: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#4ade80]"></textarea>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-[#4ade80] text-white py-2.5 rounded-xl font-bold hover:bg-green-600 flex justify-center items-center gap-2 disabled:bg-green-300"
                    >
                        {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> : <><HiPlus /> Add Service</>}
                    </button>
                </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
                {services.map(item => (
                    <div key={item._id} className="flex justify-between items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div>
                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                            <p className="text-sm text-gray-600 mt-1 mb-2">{item.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {item.points.map((p, i) => (
                                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{p}</span>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-600 p-2"><HiTrash /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesManager;