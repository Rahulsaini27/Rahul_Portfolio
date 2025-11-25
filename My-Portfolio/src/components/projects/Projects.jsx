import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectItems from "./ProjectItems";
import "./projects.css";
import { API_URL } from "../../config";
import { HiX, HiOutlineExternalLink, HiCode } from "react-icons/hi";

const Projects = () => {
    const [item, setItem] = useState({ name: "All" });
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [visibleProjects, setVisibleProjects] = useState(4);
    const [active, setActive] = useState(0);
    
    // State for Modal
    const [activeProject, setActiveProject] = useState(null);

    const projectsNav = [
        { name: "All" },
        { name: "Advanced" },
        { name: "Intermediate" },
        { name: "Basic" },
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_URL}/portfolio/projects`);
                setProjects(res.data);
                setFilteredProjects(res.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (item.name === "All") {
            setFilteredProjects(projects);
        } else {
            const newProjects = projects.filter((project) => {
                return project.category === item.name;
            });
            setFilteredProjects(newProjects);
        }
        setVisibleProjects(4);
    }, [item, projects]);

    const handleClick = (e, index) => {
        setItem({ name: e.target.textContent });
        setActive(index);
    };

    const handleViewMore = () => {
        setVisibleProjects((prevValue) => prevValue + 2);
    };

    return (
        <div>
            {/* Filter Items */}
            <div className="project__filters">
                {projectsNav.map((item, index) => {
                    return (
                        <span 
                            onClick={(e) => handleClick(e, index)}
                            className={`${active === index ? 'active__project' : ''} project__item`}
                            key={index}>
                            {item.name}
                        </span>
                    )
                })}
            </div>

            {/* Projects Grid */}
            <div className="project__container container grid">
                {filteredProjects.length > 0 ? (
                    filteredProjects.slice(0, visibleProjects).map((item) => {
                        return (
                            <ProjectItems 
                                item={item} 
                                key={item._id} 
                                openModal={setActiveProject} // Pass function to open modal
                            />
                        )
                    })
                ) : (
                    <p className="text-center col-span-full">No projects found.</p>
                )}
            </div>

            {/* View More Button */}
            {visibleProjects < filteredProjects.length && (
                <button onClick={handleViewMore} className="view-more-btn">
                    View More
                </button>
            )}

            {/* --- POPUP MODAL --- */}
            <div className={activeProject ? "project__modal active-modal" : "project__modal"}>
                <div className="project__modal-content">
                    <HiX 
                        onClick={() => setActiveProject(null)} 
                        className="project__modal-close" 
                    />
                    
                    {activeProject && (
                        <>
                            <img src={activeProject.image} alt={activeProject.title} className="project__modal-img" />
                            
                            <h3 className="project__modal-title">{activeProject.title}</h3>
                            
                            <p className="project__modal-description">
                                {activeProject.description || "No description available."}
                            </p>

                            <div className="project__modal-links">
                                {activeProject.demoLink && (
                                    <a href={activeProject.demoLink} target="_blank" rel="noreferrer" className="button button--flex">
                                        Live Demo <HiOutlineExternalLink className="button__icon" />
                                    </a>
                                )}
                                
                                {activeProject.repoLink && (
                                    <a href={activeProject.repoLink} target="_blank" rel="noreferrer" className="button button--flex">
                                        GitHub <HiCode className="button__icon" />
                                    </a>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Projects;