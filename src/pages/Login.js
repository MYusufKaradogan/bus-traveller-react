import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Card,
    Typography,
    Row,
    Col,
    Checkbox,
    Divider,
    Space,
    message,
    Alert
} from 'antd';
import {
    UserOutlined,
    LockOutlined,
    LoginOutlined,
    WindowsOutlined,
    GoogleOutlined,
    SafetyOutlined
} from '@ant-design/icons';

const { Title, Text, Link } = Typography;

const Login = ({ onLogin }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {
        setLoading(true);

        // Basit authentication simülasyonu
        setTimeout(() => {
            if (values.username === 'admin' && values.password === 'admin123') {
                message.success('Giriş başarılı!');
                if (onLogin) onLogin();
            } else if (values.username === 'user' && values.password === 'user123') {
                message.success('Giriş başarılı!');
                if (onLogin) onLogin();
            } else {
                message.error('Kullanıcı adı veya şifre hatalı!');
            }
            setLoading(false);
        }, 1500);
    };

    const handleSSOLogin = (provider) => {
        message.info(`${provider} ile giriş yapılıyor...`);
        setLoading(true);
        setTimeout(() => {
            message.success(`${provider} ile giriş başarılı!`);
            if (onLogin) onLogin();
            setLoading(false);
        }, 2000);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <Row justify="center" style={{ width: '100%' }}>
                <Col xs={24} sm={20} md={12} lg={8} xl={6}>
                    <Card
                        style={{
                            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                            borderRadius: '15px',
                            border: 'none'
                        }}
                    >
                        {/* Logo ve Başlık */}
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '20px',
                                margin: '0 auto 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <SafetyOutlined style={{ fontSize: '40px', color: 'white' }} />
                            </div>
                            <Title level={2} style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>
                                Travel & Expense
                            </Title>
                            <Text type="secondary">
                                Kurumsal Seyahat & Masraf Yönetim Sistemi
                            </Text>
                        </div>

                        {/* Demo Bilgileri */}
                        <Alert
                            message="Demo Hesapları"
                            description={
                                <div>
                                    <div><strong>Yönetici:</strong> admin / admin123</div>
                                    <div><strong>Kullanıcı:</strong> user / user123</div>
                                </div>
                            }
                            type="info"
                            showIcon
                            style={{ marginBottom: '24px' }}
                        />

                        {/* Giriş Formu */}
                        <Form
                            form={form}
                            onFinish={handleLogin}
                            layout="vertical"
                            size="large"
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Kullanıcı Adı"
                                    style={{ borderRadius: '8px' }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Şifre"
                                    style={{ borderRadius: '8px' }}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>Beni hatırla</Checkbox>
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <Link href="#" style={{ fontSize: '14px' }}>
                                            Şifremi unuttum
                                        </Link>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item style={{ marginBottom: '16px' }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                    size="large"
                                    icon={<LoginOutlined />}
                                    style={{
                                        borderRadius: '8px',
                                        height: '48px',
                                        fontSize: '16px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none'
                                    }}
                                >
                                    Giriş Yap
                                </Button>
                            </Form.Item>
                        </Form>

                        <Divider style={{ margin: '24px 0' }}>
                            <Text type="secondary">veya</Text>
                        </Divider>

                        {/* SSO Giriş Seçenekleri */}
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                block
                                size="large"
                                icon={<WindowsOutlined />}
                                onClick={() => handleSSOLogin('Active Directory')}
                                style={{
                                    borderRadius: '8px',
                                    height: '48px',
                                    borderColor: '#0078d4',
                                    color: '#0078d4'
                                }}
                            >
                                Active Directory ile Giriş
                            </Button>

                            <Button
                                block
                                size="large"
                                icon={<GoogleOutlined />}
                                onClick={() => handleSSOLogin('Google')}
                                style={{
                                    borderRadius: '8px',
                                    height: '48px',
                                    borderColor: '#db4437',
                                    color: '#db4437'
                                }}
                            >
                                Google ile Giriş
                            </Button>
                        </Space>

                        {/* Footer */}
                        <div style={{ textAlign: 'center', marginTop: '32px' }}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                © 2024 Travel & Expense Management System
                                <br />
                                Güvenli giriş için SSL şifreleme kullanılmaktadır
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Login;