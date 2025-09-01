import React, {useState} from 'react';
import {Button, Image, Layout,} from 'antd';
import Navbar from "./Navbar";
import FooterLayout from "./FooterLayout";
import ContentLayout from "./ContentLayout";
import logo from "img/logo4.jpeg"
import "styles/content-style.css";
import {useNavigate} from "react-router-dom";

const {Footer, Content, Sider} = Layout;


const MainLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider className="page-sider" collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <Button style={{marginTop: "32px"}} block type="text" onClick={() => {
                    navigate("/")
                }}>
                    <Image style={{borderRadius: "16px"}} height={80} width={200} preview={false} src={logo}/>
                </Button>
                <Navbar/>
            </Sider>
            <Layout>
                <Content lassName="page-content"  style={{margin: '0 16px'}}>
                    <ContentLayout {...props}/>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    <FooterLayout/>
                </Footer>
            </Layout>
        </Layout>

    )
}

export default MainLayout;