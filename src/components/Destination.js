import React from "react";
import cardImg from "img/card.jpg";
import cardImg2 from "img/card2.jpg";
import cardImg3 from "img/card3.webp";

const destinations = [
    { img: cardImg, title: "Sacred Calm at Badrinath Temple.", location: "Badrinath, Uttarakhand, India", rating: 4.7 },
    { img: cardImg2, title: "Divine Majesty at Jagannath Temple.", location: "Puri, Odisha, India", rating: 4.8 },
    { img: cardImg3, title: "Spiritual Serenity at Neem Karoli Temple.", location: "Dehradun, India", rating: 4.5 },
];

const Destination = () => {
    return (
        <section className="section__container destination__container" id="about">
            <h2 className="section__header">Popular Destination</h2>
            <p className="section__description">
                Discover the Most Loved Destination Around the Globe
            </p>
            <div className="destination__grid">
                {destinations.map((dest, idx) => (
                    <div className="destination__card" key={idx}>
                        <img src={dest.img} alt="destination" />
                        <div className="destination__card__details">
                            <div>
                                <h4>{dest.title}</h4>
                                <p>{dest.location}</p>
                            </div>
                            <div className="destination__ratings">
                                <span><i className="ri-star-fill"></i></span>
                                {dest.rating}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Destination;
