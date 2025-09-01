import React from "react";
import {Link} from 'react-router-dom';
import {Menu} from "antd";
import {
    HomeOutlined,
    ApartmentOutlined,
    CalendarOutlined,
    VerifiedOutlined,
    DollarOutlined,
    BarsOutlined,
    LineChartOutlined,
    SettingOutlined,
} from "@ant-design/icons";

const Navbar = () => {

    const items = [
        {
            icon: <HomeOutlined/>,
            key: "dashboard",
            label: (<Link to="/">Dashboard</Link>)
        },
        {
            icon: <ApartmentOutlined/>,
            key: "tour",
            label: (<Link to="/tours">Turlar</Link>)
        },
        {
            icon: <CalendarOutlined/>,
            key: "travel-planning",
            label: (<Link to="/travel-planning">Seyahat Planla</Link>)
        },
        {
            icon: <VerifiedOutlined/>,
            key: "reservation-management",
            label: (<Link to="/reservation-management">Rezervasyonlar</Link>)
        },
        {
            icon: <DollarOutlined/>,
            key: "expense-management",
            label: (<Link to="/expense-management">Harcamalar</Link>)
        },
        {
            icon: <BarsOutlined/>,
            key: "approvals",
            label: (<Link to="/approvals">Onaylar</Link>)
        },
        {
            icon: <LineChartOutlined/>,
            key: "reports",
            label: (<Link to="/reports">Raporlar</Link>)
        },
        {
            icon: <SettingOutlined/>,
            key: "settings",
            label: (<Link to="/settings">Ayarlar</Link>)
        },
    ];


    return (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
    );
};

export default Navbar;

