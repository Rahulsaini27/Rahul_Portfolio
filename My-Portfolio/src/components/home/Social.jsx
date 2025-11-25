import React from "react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

const Social = ({ socials }) => {
    if (!socials) return <div className="home__social"></div>;

    return (
        <div className="home__social">
            {socials.email && (
                <a href={`mailto:${socials.email}`} className="home__social-icon" target="_blank" rel="noreferrer">
                    <MdOutlineMail />
                </a>
            )}
            {socials.github && (
                <a href={socials.github} className="home__social-icon" target="_blank" rel="noreferrer">
                    <FiGithub />
                </a>
            )}
            {socials.linkedin && (
                <a href={socials.linkedin} className="home__social-icon" target="_blank" rel="noreferrer">
                    <FiLinkedin />
                </a>
            )}
            {socials.instagram && (
                <a href={socials.instagram} className="home__social-icon" target="_blank" rel="noreferrer">
                    <FiInstagram />
                </a>
            )}
        </div>
    );
}

export default Social;