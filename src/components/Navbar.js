import React, {useState} from "react";
import {Link} from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="navbar-layout">
            <nav>
                <div className="nav__header">
                    <div className="nav__logo">
                        <a href="#" className="logo">BusTraveller</a>
                    </div>
                    <div className="nav__menu__btn" onClick={() => setMenuOpen(!menuOpen)}>
                        <i className="ri-menu-line"></i>
                    </div>
                </div>
                <ul className={`nav__links ${menuOpen ? "active" : ""}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/tours">Tours</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><a href="#">BOOK TRIP</a></li>
                </ul>
                <div className="nav__btns">
                    <button className="btn">BOOK TRIP</button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

