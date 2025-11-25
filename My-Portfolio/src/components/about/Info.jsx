import React from 'react';
import { HiOutlineDesktopComputer, HiOutlineTerminal, HiOutlineSparkles } from "react-icons/hi";

const Info = ({ info }) => {
    const icons = [HiOutlineDesktopComputer, HiOutlineTerminal, HiOutlineSparkles];

    if (!info || info.length === 0) return null;

    return (
        <div className="about__info grid">
            {info.map((item, index) => {
                const IconComponent = icons[index] || HiOutlineDesktopComputer;
                return (
                    <div className="about__box" key={index}>
                        <IconComponent className="about__icon" />
                        <h3 className="about__title">{item.title}</h3>
                        <span className="about__subtitle">{item.subtitle}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default Info;