import React from 'react';
import { HiOutlineArrowSmRight, HiOutlineExternalLink, HiCode } from "react-icons/hi";

const ProjectItems = ({ item, openModal }) => {
    // Handle image URL
    const imageUrl = item.image || '';

    return (
        <div className="project__card" key={item._id}>
            {/* Image Wrapper - Click to Open Modal */}
            <div className="project__img-wrapper" onClick={() => openModal(item)}>
                <img className="project__img" src={imageUrl} alt={item.title} />
                {/* Category Badge */}
                <span className="project__category-badge">{item.category}</span>
            </div>

            <div className="project__content">
                {/* Title - Click to Open Modal */}
                <h3 className="project__title" onClick={() => openModal(item)}>{item.title}</h3>
                
                {/* Truncated Description */}
                <p className="project__description">
                    {item.description || "No description available."}
                </p>
                
                {/* Action Buttons */}
                <div className="project__buttons">
                    {item.demoLink ? (
                        <a href={item.demoLink} target="_blank" rel="noreferrer" className="project__btn project__btn--primary">
                            Live Demo <HiOutlineExternalLink />
                        </a>
                    ) : (
                        <button disabled className="project__btn project__btn--disabled">No Demo</button>
                    )}

                    {item.repoLink ? (
                        <a href={item.repoLink} target="_blank" rel="noreferrer" className="project__btn project__btn--secondary">
                            Github <HiCode />
                        </a>
                    ) : (
                        <button disabled className="project__btn project__btn--disabled">No Repo</button>
                    )}
                </div>
                
                {/* "See More" Trigger */}
                <span className="project__read-more" onClick={() => openModal(item)}>
                    Read details <HiOutlineArrowSmRight />
                </span>
            </div>
        </div>
    );
}

export default ProjectItems;