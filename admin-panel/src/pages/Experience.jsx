
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiTrash, HiPlus } from 'react-icons/hi';
import { API_URL } from '../config';
import Loading from '../components/Loading';

const Experience = () => {
    const [qualifications, setQualifications] = useState([]);
    const [formData, setFormData] = useState({ type: 'Education', title: '', subtitle: '', calendar: '' });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem('token');

    const fetchQuals = async () => {
        try {
            const res = await axios.get(`${API_URL}/content/qualifications`);
            setQualifications(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchQuals(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${API_URL}/content/qualifications`, formData, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Added Successfully');
            setFormData({ type: 'Education', title: '', subtitle: '', calendar: '' });
            fetchQuals();
        } catch (err) { toast.error('Error adding'); }
        finally { setIsSubmitting(false); }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/content/qualifications/${id}`, {
                headers: { 'x-auth-token': token }
            });
            toast.success('Deleted');
            fetchQuals();
        } catch (err) { toast.error('Delete failed'); }
    };

    if (loading) return <Loading />;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Add Qualification</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500">Type</label>
                        <div className="flex gap-2 mt-1">
                            {['Education', 'Experience'].map(type => (
                                <button 
                                    type="button" 
                                    key={type}
                                    onClick={() => setFormData({...formData, type})}
                                    className={`flex-1 py-2 text-sm rounded-lg border ${formData.type === type ? 'bg-[#4ade80] text-white border-[#4ade80]' : 'bg-white text-gray-600 border-gray-200'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <input required placeholder="Title (e.g. B.Tech)" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#4ade80]" />
                    <input required placeholder="Subtitle (e.g. University Name)" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#4ade80]" />
                    <input required placeholder="Duration (e.g. 2020 - 2024)" value={formData.calendar} onChange={e => setFormData({...formData, calendar: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#4ade80]" />
                    
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-[#4ade80] text-white py-2.5 rounded-xl font-bold hover:bg-green-600 flex justify-center items-center gap-2 disabled:bg-green-300"
                    >
                        {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> : <><HiPlus /> Add Entry</>}
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2 space-y-6">
                {/* Education */}
                <SectionList title="Education" data={qualifications.filter(q => q.type === 'Education')} onDelete={handleDelete} />
                {/* Experience */}
                <SectionList title="Experience" data={qualifications.filter(q => q.type === 'Experience')} onDelete={handleDelete} />
            </div>
        </div>
    );
};

const SectionList = ({ title, data, onDelete }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
        {data.length === 0 ? <p className="text-sm text-gray-400">No entries yet.</p> : (
            <div className="space-y-3">
                {data.map(item => (
                    <div key={item._id} className="flex justify-between items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div>
                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.subtitle}</p>
                            <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded border mt-2 inline-block">{item.calendar}</span>
                        </div>
                        <button onClick={() => onDelete(item._id)} className="text-red-400 hover:text-red-600 p-2 bg-white rounded-lg shadow-sm"><HiTrash /></button>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default Experience;