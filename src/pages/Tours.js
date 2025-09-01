import React from 'react';
import TourList from "components/TourList";

function Tours() {
    return (
        <>
            <header>
                <section className="section__container destination__container" id="about">
                    <h1>Our Tours</h1>
                    <br/>
                    <p>Explore our available bus tours.</p>
                    <br/>
                    <TourList/>
                </section>
            </header>
        </>
    );
}

export default Tours;
