import React from "react";
import busPng from "img/bus.png";
import Destination from "components/Destination";

const Home = () => {
    return (
        <>
            <header>
                <div className="header__container">
                    <div className="header__content">
                        <p>BUS YOUR TRAVEL JOURNEY</p>
                        <h1>Where Every Bus Ride Feels Magical!</h1>
                        <div className="header__btns">
                            <button className="btn">Book A Trip Now</button>
                            <a href="#"><span><i className="ri-play-circle-fill"></i></span></a>
                        </div>
                    </div>
                    <div className="header__image">
                        <img src={busPng} alt="header"/>
                    </div>
                </div>
            </header>
            <section className="section__container destination__container" id="about">
                <Destination/>
            </section>
        </>
    );
};

export default Home;
