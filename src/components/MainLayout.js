import React from 'react';
import {Layout} from 'antd';
import Navbar from "./Navbar";
import FooterLayout from "./FooterLayout";
import ContentLayout from "./ContentLayout";
import "styles/content-style.css";

const {Header, Footer, Content} = Layout;



const MainLayout = (props) => (
    <Layout>
        <Header className="header-layout">
            <Navbar/>
        </Header>
        <Content>
            <ContentLayout {...props}/>
        </Content>
        <Footer><FooterLayout/></Footer>
    </Layout>
)

export default MainLayout;