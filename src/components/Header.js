import React from "react";

const Header = () => {
    return (
        <header id="home">
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
                    <img src="img/bus.png" alt="header" />
                </div>
            </div>
        </header>
    );
};

export default Header;
