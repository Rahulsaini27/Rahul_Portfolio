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
    const [visibleProjects, setVisibleProjects] = useState(2); // Show 2 initially
    const [active, setActive] = useState(0);

    // Modal State
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
        setVisibleProjects(2); // Reset visible count on filter change
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
            {/* Filter Menu */}
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

            {/* Grid Container */}
            <div className="project__container container grid">
                {filteredProjects.length > 0 ? (
                    filteredProjects.slice(0, visibleProjects).map((item) => {
                        return (
                            <ProjectItems
                                item={item}
                                key={item._id}
                                openModal={setActiveProject}
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

            {/* --- MODAL --- */}
            <div className={activeProject ? "project__modal active-modal" : "project__modal"}>
                <div className="project__modal-content">
                    <HiX
                        onClick={() => setActiveProject(null)}
                        className="project__modal-close"
                    />

                    {activeProject && (
                        <>
                            <h3 className="project__modal-title">{activeProject.title}</h3>


                            <img
                                src={activeProject.image}
                                alt={activeProject.title}
                                className="project__modal-img"
                            />


                            <div className="project__modal-badge-container">
                                <span className="project__modal-badge">{activeProject.category}</span>
                            </div>

                            <div className="project__modal-description-box">
                                <h4 className="project__modal-subtitle">Description</h4>
                                <p className="project__modal-description">
                                    {activeProject.description || "No description provided."}
                                </p>
                            </div>

                            <div className="project__modal-links">
                                {activeProject.demoLink ? (
                                    <a href={activeProject.demoLink} target="_blank" rel="noreferrer" className="project__btn project__btn--primary">
                                        Live Demo <HiOutlineExternalLink />
                                    </a>
                                ) : (
                                    <button disabled className="project__btn project__btn--disabled">No Demo</button>
                                )}

                                {activeProject.repoLink ? (
                                    <a href={activeProject.repoLink} target="_blank" rel="noreferrer" className="project__btn project__btn--secondary">
                                        GitHub <HiCode />
                                    </a>
                                ) : (
                                    <button disabled className="project__btn project__btn--disabled">No Repo</button>
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