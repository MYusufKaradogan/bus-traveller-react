import React, {useState} from "react";
import {Link} from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="navbar-layout">
            <nav>
                <div className="nav__header">
                    <div className="nav__logo">
                        <li><Link className="logo" to="/">Anasayfa</Link></li>
                    </div>
                    <div className="nav__menu__btn" onClick={() => setMenuOpen(!menuOpen)}>
                        <i className="ri-menu-line"></i>
                    </div>
                </div>
                <ul className={`nav__links ${menuOpen ? "active" : ""}`}>
                    <li><Link to="/tours">Turlar</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/travel-planning">Seyahat Planla</Link></li>
                    <li><Link to="/reservation-management">Rezervasyonlar</Link></li>
                    <li><Link to="/expense-management">Harcamalar</Link></li>
                    <li><Link to="/approvals">Onaylar</Link></li>
                    <li><Link to="/reports">Raporlar</Link></li>
                    <li><Link to="/settings">Ayarlar</Link></li>
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

