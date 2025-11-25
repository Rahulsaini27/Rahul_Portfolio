import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectItems from "./ProjectItems";
import "./projects.css";
import { API_URL } from "../../config";

const Projects = () => {
    const [item, setItem] = useState({ name: "All" });
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [visibleProjects, setVisibleProjects] = useState(4);
    const [active, setActive] = useState(0);

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
            const newProjects = projects.filter((project) => project.category === item.name);
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
            <div className="project__filters">
                {projectsNav.map((item, index) => (
                    <span onClick={(e) => handleClick(e, index)} className={`${active === index ? 'active__project' : ''} project__item`} key={index}>{item.name}</span>
                ))}
            </div>
            <div className="project__container container grid">
                {filteredProjects.length > 0 ? (
                    filteredProjects.slice(0, visibleProjects).map((item) => <ProjectItems item={item} key={item._id} />)
                ) : <p className="text-center col-span-full">No projects found.</p>}
            </div>
            {visibleProjects < filteredProjects.length && (
                <button onClick={handleViewMore} className="view-more-btn">View More</button>
            )}
        </div>
    );
}

export default Projects;