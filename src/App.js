import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Tours from './pages/Tours';
import MainLayout from "components/MainLayout";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import ApprovalProcess from "./pages/ApprovalProcess";
import ExpenseManagement from "./pages/ExpenseManagement";
import ReservationManagement from "./pages/ReservationManagement";
import TravelPlanning from "./pages/TravelPlanning";
import Dashboard from "./pages/DashBoard";

function App() {
    return (
        <div>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/tours" element={<Tours/>}/>

                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/travel-planning" element={<TravelPlanning/>}/>
                    <Route path="/reservation-management" element={<ReservationManagement/>}/>
                    <Route path="/expense-management" element={<ExpenseManagement/>}/>
                    <Route path="/approvals" element={<ApprovalProcess/>}/>
                    <Route path="/reports" element={<Reports/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
            </MainLayout>
        </div>
    );
}

export default App;
