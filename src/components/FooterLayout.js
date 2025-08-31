import React from 'react';

function FooterLayout() {
    return (
        <footer id="contact">
            <div className="section__container footer__container">
                <div className="footer__col">
                    <div className="footer__logo">
                        <a href="#" className="logo">BusTraveller</a>
                    </div>
                    <p>
                        Explore the world with ease and excitement through our all-in-one
                        bus travel platform. Your journey begins here — where smooth
                        planning meets unforgettable road experiences.
                    </p>
                    <ul className="footer__socials">
                        <li>
                            <a href="#!"><i className="ri-facebook-fill"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="ri-instagram-line"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="ri-youtube-line"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="footer__col">
                    <h4>Quick Links</h4>
                    <ul className="footer__links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Bus</a></li>
                        <li><a href="#">Hotels</a></li>
                        <li><a href="#">Cruise</a></li>
                    </ul>
                </div>
                <div className="footer__col">
                    <h4>Contact Us</h4>
                    <ul className="footer__links">
                        <li>
                            <a href="#">
                                <span><i className="ri-phone-fill"></i></span>+91 12345 67890
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span><i className="ri-record-mail-line"></i></span>
                                info@BusTraveller
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span><i className="ri-map-pin-2-fill"></i></span> Agra, India
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer__col">
                    <h4>Subscribe</h4>
                    <form action="#!">
                        <input type="text" placeholder="Enter your email"/>
                        <button className="btn">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="footer__bar">
                Copyright © 2025 Code Prashtt. All rights reserved.
                <p>
                    Distributed by
                    <a
                        className="text-white"
                        href="https://www.heentech.com"
                        target="_blank"
                    > Heentech</a
                    >
                </p>
            </div>
        </footer>
    );
}

export default FooterLayout;
