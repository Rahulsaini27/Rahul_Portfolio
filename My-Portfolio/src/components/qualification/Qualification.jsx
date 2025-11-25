import React, { useState, useEffect } from "react";
import axios from "axios";
import "./qualification.css";
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineCalendar } from "react-icons/hi";
import { API_URL } from "../../config";

const Qualification = () => {
    const [toggleState, setToggleState] = useState(1);
    const [qualifications, setQualifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/content/qualifications`);
                setQualifications(res.data);
            } catch (err) {
                console.error("Error fetching qualifications:", err);
            }
        };
        fetchData();
    }, []);

    const educationData = qualifications.filter(q => q.type === 'Education');
    const experienceData = qualifications.filter(q => q.type === 'Experience');

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const renderTimelineItems = (data) => {
        if (data.length === 0) return <p className="qualification__subtitle" style={{textAlign: 'center', gridColumn: '1/-1'}}>No info added yet.</p>;

        return data.map((item, index) => {
            if (index % 2 === 0) {
                return (
                    <div className="qualification__data" key={item._id}>
                        <div>
                            <h3 className="qualification__title">{item.title}</h3>
                            <span className="qualification__subtitle">{item.subtitle}</span>
                            <div className="qualification__calendar"><HiOutlineCalendar className="qualification__calendar-icon" /> {item.calendar}</div>
                        </div>
                        <div><span className="qualification__rounder"></span><span className="qualification__line"></span></div>
                    </div>
                );
            } else {
                return (
                    <div className="qualification__data" key={item._id}>
                        <div></div>
                        <div><span className="qualification__rounder"></span><span className="qualification__line"></span></div>
                        <div>
                            <h3 className="qualification__title">{item.title}</h3>
                            <span className="qualification__subtitle">{item.subtitle}</span>
                            <div className="qualification__calendar"><HiOutlineCalendar className="qualification__calendar-icon" /> {item.calendar}</div>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <section className="qualification section">
            <h2 className="section__title">Qualification</h2>
            <span className="section__subtitle">My Journey</span>
            <div className="qualification__container container">
                <div className="qualification__tabs">
                    <div className={toggleState === 1 ? "qualification__button button--flex qualification__active" : "qualification__button button--flex"} onClick={() => toggleTab(1)}>
                        <HiOutlineAcademicCap className="qualification__icon" /> Education
                    </div>
                    <div className={toggleState === 2 ? "qualification__button button--flex qualification__active" : "qualification__button button--flex"} onClick={() => toggleTab(2)}>
                        <HiOutlineBriefcase className="qualification__icon" /> Experience
                    </div>
                </div>
                <div className="qualification__sections">
                    <div className={toggleState === 1 ? "qualification__content qualification__content-active" : "qualification__content"}>{renderTimelineItems(educationData)}</div>
                    <div className={toggleState === 2 ? "qualification__content qualification__content-active" : "qualification__content"}>{renderTimelineItems(experienceData)}</div>
                </div>
            </div>
        </section>
    );
}

export default Qualification;