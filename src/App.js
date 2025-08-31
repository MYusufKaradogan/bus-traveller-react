import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Tours from './pages/Tours';
import MainLayout from "components/MainLayout";

function App() {
    return (
        <div>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/tours" element={<Tours/>}/>
                </Routes>
            </MainLayout>
        </div>
    );
}

export default App;
