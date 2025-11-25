import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './services.css';
import { HiOutlineClipboardList, HiOutlineArrowSmRight, HiOutlineCheckCircle, HiX } from 'react-icons/hi';
import { API_URL } from "../../config";

const Services = () => {
    const [services, setServices] = useState([]);
    const [toggleState, setToggleState] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get(`${API_URL}/content/services`);
                setServices(res.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, []);

    const toggleTab = (id) => {
        setToggleState(id);
    };

    return (
        <section className="services section" id="services">
            <h2 className="section__title">Services</h2>
            <span className="section__subtitle">Create + Collaborate</span>

            <div className="services__container container grid">
                {services.length > 0 ? (
                    services.map((service) => (
                        <div className="services__content" key={service._id}>
                            <div>
                                <HiOutlineClipboardList className="services__icon" />
                                <h3 className="services__title">{service.title}</h3>
                            </div>

                            <span className="services__button" onClick={() => toggleTab(service._id)}>
                                View More
                                <HiOutlineArrowSmRight className="services__button-icon" />
                            </span>

                            <div className={toggleState === service._id ? "services__modal active-modal" : "services__modal"}>
                                <div className="services__modal-content">
                                    <HiX onClick={() => toggleTab(null)} className="services__modal-close" />
                                    <h3 className="services__modal-title">{service.title}</h3>
                                    <p className="services__modal-description">{service.description}</p>
                                    <ul className="services__modal-services grid">
                                        {service.points && service.points.map((point, index) => (
                                            <li className="services__modal-service" key={index}>
                                                <HiOutlineCheckCircle className="services__modal-icon" />
                                                <p className="services__modal-info">{point}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No services added yet.</p>
                )}
            </div>
        </section>
    );
}

export default Services;