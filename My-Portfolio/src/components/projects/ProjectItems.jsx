import React from 'react';
import { HiOutlineArrowSmRight } from "react-icons/hi";

const ProjectItems = ({ item }) => {
    // If image comes from firebase, use it. Otherwise fall back.
    const imageUrl = item.image || '';

    return (
        <div className="project__card">
            <img className="project__img" src={imageUrl} alt={item.title} />
            <h3 className="project__title">{item.title}</h3>
            <a href={item.demoLink} target="_blank" rel="noopener noreferrer" className="project__button">
                Demo <HiOutlineArrowSmRight className="project__button-icon" />
            </a>
        </div>
    );
}

export default ProjectItems;