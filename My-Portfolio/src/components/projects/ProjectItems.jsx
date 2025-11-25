import React from 'react';
import { HiOutlineArrowSmRight, HiOutlineExternalLink, HiCode } from "react-icons/hi";

const ProjectItems = ({ item, openModal }) => {
    const imageUrl = item.image || '';

    return (
        <div className="project__card">
            <img className="project__img" src={imageUrl} alt={item.title} />
            
            <h3 className="project__title">{item.title}</h3>
            
            {/* Container for buttons */}
            <div className="project__actions">
                
                {/* Left Side: Direct Links (Demo & Repo) */}
                <div className="project__links">
                    {item.demoLink && (
                        <a href={item.demoLink} target="_blank" rel="noreferrer" className="project__link-icon" title="Live Demo">
                            <HiOutlineExternalLink />
                        </a>
                    )}
                    {item.repoLink && (
                        <a href={item.repoLink} target="_blank" rel="noreferrer" className="project__link-icon" title="GitHub Repo">
                            <HiCode />
                        </a>
                    )}
                </div>

                {/* Right Side: Modal Trigger */}
                <span className="project__button" onClick={() => openModal(item)}>
                    Details <HiOutlineArrowSmRight className="project__button-icon" />
                </span>
            </div>
        </div>
    );
}

export default ProjectItems;