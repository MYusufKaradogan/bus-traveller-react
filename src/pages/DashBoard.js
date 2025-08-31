import React from 'react';
import { Card, Row, Col, Statistic, Button, List, Typography, Badge } from 'antd';
import {
    PlusOutlined,
    CheckCircleOutlined,
    DollarCircleOutlined,
    FileTextOutlined,
    CalendarOutlined,
    UserOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Dashboard = () => {
    // Statik veri - gerçek uygulamada API'den gelecek
    const dashboardStats = {
        totalTrips: 12,
        pendingApprovals: 3,
        thisMonthExpenses: 15750,
        completedTrips: 9
    };

    const pendingApprovals = [
        { id: 1, title: 'İstanbul - Ankara Seyahati', date: '2024-09-15', status: 'pending' },
        { id: 2, title: 'Londra İş Seyahati', date: '2024-09-18', status: 'pending' },
        { id: 3, title: 'Berlin Konferans', date: '2024-09-22', status: 'pending' }
    ];

    const recentExpenses = [
        { id: 1, description: 'Otel Konaklama', amount: 450, currency: 'TL', date: '2024-09-10' },
        { id: 2, description: 'Uçak Bileti', amount: 890, currency: 'TL', date: '2024-09-08' },
        { id: 3, description: 'Yemek Masrafı', amount: 125, currency: 'TL', date: '2024-09-05' }
    ];

    const quickActions = [
        {
            title: 'Yeni Seyahat Planla',
            icon: <PlusOutlined />,
            link: '/travel-planning',
            color: '#1890ff'
        },
        {
            title: 'Harcama Bildirimi',
            icon: <DollarCircleOutlined />,
            link: '/expense-management',
            color: '#52c41a'
        },
        {
            title: 'Bekleyen Onaylarım',
            icon: <CheckCircleOutlined />,
            link: '/approvals',
            color: '#faad14'
        },
        {
            title: 'Raporlarım',
            icon: <FileTextOutlined />,
            link: '/reports',
            color: '#f5222d'
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Ana Dashboard</Title>

            {/* İstatistik Kartları */}
            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Toplam Seyahat"
                            value={dashboardStats.totalTrips}
                            prefix={<CalendarOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Bekleyen Onay"
                            value={dashboardStats.pendingApprovals}
                            prefix={<ClockCircleOutlined />}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Bu Ay Harcama"
                            value={dashboardStats.thisMonthExpenses}
                            prefix={<DollarCircleOutlined />}
                            suffix="TL"
                            precision={2}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Tamamlanan Seyahat"
                            value={dashboardStats.completedTrips}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Hızlı Aksiyonlar */}
            <Card title="Hızlı Aksiyonlar" style={{ marginBottom: '24px' }}>
                <Row gutter={16}>
                    {quickActions.map((action, index) => (
                        <Col span={6} key={index}>
                            <Link to={action.link}>
                                <Card
                                    hoverable
                                    style={{ textAlign: 'center', borderColor: action.color }}
                                >
                                    <div style={{ fontSize: '32px', color: action.color, marginBottom: '12px' }}>
                                        {action.icon}
                                    </div>
                                    <Title level={4} style={{ margin: 0, color: action.color }}>
                                        {action.title}
                                    </Title>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Card>

            <Row gutter={16}>
                {/* Bekleyen Onaylar */}
                <Col span={12}>
                    <Card title="Bekleyen Onaylar" extra={<Link to="/approvals">Tümünü Gör</Link>}>
                        <List
                            dataSource={pendingApprovals}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Badge status="processing" />}
                                        title={item.title}
                                        description={`Tarih: ${item.date}`}
                                    />
                                    <Button type="primary" size="small">Onayla</Button>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                {/* Son Harcamalar */}
                <Col span={12}>
                    <Card title="Son Harcamalar" extra={<Link to="/expense-management">Tümünü Gör</Link>}>
                        <List
                            dataSource={recentExpenses}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.description}
                                        description={`Tarih: ${item.date}`}
                                    />
                                    <Text strong>{item.amount} {item.currency}</Text>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;