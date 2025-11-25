import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import Social from "./Social";
import Data from "./Data";
import Scroll from "./Scroll";
import { API_URL } from "../../config";

const Home = () => {
    const [heroData, setHeroData] = useState({
        title: '',
        subtitle: '',
        description: '',
        socials: {},
        image: ''
    });

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await axios.get(`${API_URL}/content/hero`);
                setHeroData(res.data);
            } catch (error) {
                console.error("Error fetching home data:", error);
            }
        };
        fetchHero();
    }, []);

    // Dynamic Background Image from Firebase or fallback
    const profileImgStyle = heroData.image 
        ? { backgroundImage: `url(${heroData.image})` } 
        : {}; // Falls back to CSS default if empty

    return (
        <section className="home section" id="home">
            <div className="home__container container grid">
                <div className="home__content grid">
                    <Social socials={heroData.socials} />
                    
                    <div 
                        className="home__img" 
                        style={profileImgStyle}
                    ></div>
                    
                    <Data 
                        title={heroData.title} 
                        subtitle={heroData.subtitle} 
                        description={heroData.description} 
                    />
                </div>
                <Scroll />
            </div> 
        </section>
    )
}

export default Home;