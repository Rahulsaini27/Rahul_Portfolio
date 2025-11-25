import React, { useState } from 'react';
import "./contact.css";
import { HiOutlineMail, HiOutlineArrowSmRight } from "react-icons/hi";
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from "../../config";

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/messages`, formData);
            Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'Your message has been sent to the admin.',
                confirmButtonText: 'Okay',
                confirmButtonColor: 'var(--title-color)'
            });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
                confirmButtonText: 'Retry',
                confirmButtonColor: 'var(--title-color)'
            });
        }
    };

    return (
        <section className="contact section" id="contact">
            <h2 className="section__title">Let's Connect</h2>
            <span className="section__subtitle">Contact Me</span>
            <div className="contact__container container grid">
                <div className="contact__content">
                    <h3 className="contact__title">Talk to me</h3>
                    <div className="contact__info">
                        <div className="contact__card">
                            <HiOutlineMail className="contact__card-icon" />
                            <h3 className="contact__card-title">Email</h3>
                            <span className="contact__card-data">rahulsaini42854@gmail.com</span>
                            <a href="mailto:rahulsaini42854@gmail.com" className="contact__button">Write Me <HiOutlineArrowSmRight className="contact__button-icon" /></a>
                        </div>
                    </div>
                </div>
                <div className="contact__content">
                    <h3 className="contact__title">Send a Message</h3>
                    <form onSubmit={submitHandler} className="contact__form">
                        <div className="contact__form-div"><label className="contact__form-tag">Name</label><input required type="text" name="name" value={formData.name} onChange={handleChange} className="contact__form-input" placeholder="Type your name" /></div>
                        <div className="contact__form-div"><label className="contact__form-tag">Email</label><input required type="email" name="email" value={formData.email} onChange={handleChange} className="contact__form-input" placeholder="Type your email" /></div>
                        <div className="contact__form-div contact__form-area"><label className="contact__form-tag">Message</label><textarea required name="message" value={formData.message} onChange={handleChange} cols="30" rows="10" className="contact__form-input" placeholder="Write your message..."></textarea></div>
                        <button className="button button--flex">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;