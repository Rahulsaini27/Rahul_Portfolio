
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiTrash, HiMail } from 'react-icons/hi';
import { API_URL } from '../config';
import Loading from '../components/Loading';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${API_URL}/messages`, { headers: { 'x-auth-token': token } });
            setMessages(res.data);
        } catch (err) { 
            console.error(err); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleDelete = async (id) => {
        if(!confirm("Delete this message?")) return;
        try {
            await axios.delete(`${API_URL}/messages/${id}`, { headers: { 'x-auth-token': token } });
            toast.success('Message Deleted');
            fetchMessages();
        } catch { toast.error('Failed'); }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Messages ({messages.length})</h2>
            <div className="space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">No messages found.</div>
                ) : (
                    messages.map(msg => (
                        <div key={msg._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl">
                                        <HiMail />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{msg.name}</h3>
                                        <p className="text-sm text-blue-500">{msg.email}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">{new Date(msg.date).toLocaleString()}</span>
                            </div>
                            <p className="text-gray-600 bg-gray-50 p-4 rounded-xl text-sm leading-relaxed">
                                {msg.message}
                            </p>
                            <div className="mt-4 flex justify-end">
                                <button onClick={() => handleDelete(msg._id)} className="flex items-center gap-2 text-red-500 text-sm font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition">
                                    <HiTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Messages;