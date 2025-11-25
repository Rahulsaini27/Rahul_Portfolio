import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./skills.css";
import SkillBox from './SkillBox';
import { API_URL } from "../../config";

const Skills = () => {
  const [groupedSkills, setGroupedSkills] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
        try {
            const res = await axios.get(`${API_URL}/portfolio/skills`);
            const allSkills = res.data;
            
            // Group by Category Name
            const groups = {};
            allSkills.forEach(skill => {
                if (skill.category && skill.category.name) {
                    const categoryName = skill.category.name;
                    if (!groups[categoryName]) {
                        groups[categoryName] = [];
                    }
                    groups[categoryName].push(skill);
                }
            });
            setGroupedSkills(groups);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };
    fetchSkills();
  }, []);

  return (
    <section className="skills section" id="skills">
        <h2 className="section__title">Skills</h2>
        <span className="section__subtitle">Technical Level</span>
        
        <div className="skills__container container grid">
            {Object.keys(groupedSkills).map((categoryName, index) => (
                <SkillBox 
                    key={index} 
                    title={categoryName} 
                    skills={groupedSkills[categoryName]} 
                />
            ))}
            
            {Object.keys(groupedSkills).length === 0 && (
                <p style={{textAlign: 'center', width: '100%'}}>Loading skills...</p>
            )}
        </div>
    </section>
  );
}

export default Skills;