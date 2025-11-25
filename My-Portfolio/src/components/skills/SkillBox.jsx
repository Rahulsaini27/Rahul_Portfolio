import React from "react";
import { HiCheckBadge } from "react-icons/hi2";

const SkillBox = ({ title, skills }) => {
    // Split logic for 2 columns
    const middleIndex = Math.ceil(skills.length / 2);
    const firstHalf = skills.slice(0, middleIndex);
    const secondHalf = skills.slice(middleIndex);

    return (
        <div className="skills__content">
            <h3 className="skills__title">{title}</h3>

            <div className="skills__box">
                {/* Column 1 */}
                <div className="skills__group">
                    {firstHalf.map((skill) => (
                        <div className="skills__data" key={skill._id}>
                            <HiCheckBadge className="skills__icon-badge" />
                            <div>
                                <h3 className="skills__name">{skill.name}</h3>
                                <span className="skills__level">{skill.level}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Column 2 */}
                <div className="skills__group">
                    {secondHalf.map((skill) => (
                        <div className="skills__data" key={skill._id}>
                            <HiCheckBadge className="skills__icon-badge" />
                            <div>
                                <h3 className="skills__name">{skill.name}</h3>
                                <span className="skills__level">{skill.level}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillBox;