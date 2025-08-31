import React, { useState } from 'react';
import {
    Card,
    Row,
    Col,
    Select,
    Button,
    DatePicker,
    Typography,
    Table,
    Tag,
    Space,
    Statistic,
    Progress,
    Alert,
    Tabs,
    Form,
    Input,
    message,
    Divider
} from 'antd';
import {
    BarChartOutlined,
    PieChartOutlined,
    LineChartOutlined,
    DownloadOutlined,
    UserOutlined,
    BankOutlined,
    WarningOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    CalendarOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const Reports = () => {
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const [selectedUser, setSelectedUser] = useState('all');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [activeTab, setActiveTab] = useState('user');

    // Statik veri
    const users = [
        'Ahmet Yılmaz', 'Ayşe Kaya', 'Mehmet Demir', 'Fatma Şahin',
        'Ali Özkan', 'Zeynep Arslan', 'Can Yılmaz', 'Elif Çelik'
    ];

    const departments = [
        'Satış', 'Pazarlama', 'İnsan Kaynakları', 'Ar-Ge',
        'Finans', 'Operasyon', 'BT', 'Yönetim'
    ];

    // Kullanıcı bazlı harcama verileri
    const userExpenseData = [
        {
            id: 1,
            user: 'Ahmet Yılmaz',
            department: 'Satış',
            totalExpenses: 4250,
            tripCount: 8,
            avgPerTrip: 531.25,
            lastTripDate: '2024-09-15',
            status: 'normal',
            limitUsage: 85
        },
        {
            id: 2,
            user: 'Ayşe Kaya',
            department: 'Pazarlama',
            totalExpenses: 3890,
            tripCount: 6,
            avgPerTrip: 648.33,
            lastTripDate: '2024-09-12',
            status: 'warning',
            limitUsage: 97
        },
        {
            id: 3,
            user: 'Mehmet Demir',
            department: 'Ar-Ge',
            totalExpenses: 6780,
            tripCount: 4,
            avgPerTrip: 1695,
            lastTripDate: '2024-09-20',
            status: 'over',
            limitUsage: 113
        },
        {
            id: 4,
            user: 'Fatma Şahin',
            department: 'İnsan Kaynakları',
            totalExpenses: 2340,
            tripCount: 5,
            avgPerTrip: 468,
            lastTripDate: '2024-09-08',
            status: 'normal',
            limitUsage: 47
        }
    ];

    // Departman bazlı veriler
    const departmentData = [
        {
            id: 1,
            department: 'Satış',
            totalBudget: 50000,
            usedBudget: 42500,
            employeeCount: 12,
            tripCount: 45,
            avgExpensePerEmployee: 3541.67,
            status: 'warning'
        },
        {
            id: 2,
            department: 'Ar-Ge',
            totalBudget: 80000,
            usedBudget: 67800,
            employeeCount: 15,
            tripCount: 28,
            avgExpensePerEmployee: 4520,
            status: 'normal'
        },
        {
            id: 3,
            department: 'Pazarlama',
            totalBudget: 35000,
            usedBudget: 31200,
            employeeCount: 8,
            tripCount: 22,
            avgExpensePerEmployee: 3900,
            status: 'warning'
        },
        {
            id: 4,
            department: 'Finans',
            totalBudget: 25000,
            usedBudget: 18500,
            employeeCount: 6,
            tripCount: 15,
            avgExpensePerEmployee: 3083.33,
            status: 'normal'
        }
    ];

    // Politika ihlali verileri
    const policyViolations = [
        {
            id: 1,
            user: 'Mehmet Demir',
            department: 'Ar-Ge',
            violationType: 'limit_exceeded',
            description: 'Günlük yemek limiti aşımı',
            amount: 350,
            limit: 250,
            date: '2024-09-18',
            severity: 'medium',
            status: 'pending'
        },
        {
            id: 2,
            user: 'Ayşe Kaya',
            department: 'Pazarlama',
            violationType: 'late_approval',
            description: 'Geç onay - 15 gün gecikme',
            amount: 1200,
            date: '2024-09-10',
            severity: 'low',
            status: 'resolved'
        },
        {
            id: 3,
            user: 'Ali Özkan',
            department: 'Satış',
            violationType: 'missing_receipt',
            description: 'Eksik fiş/fatura',
            amount: 180,
            date: '2024-09-15',
            severity: 'high',
            status: 'pending'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'normal': return 'green';
            case 'warning': return 'orange';
            case 'over': return 'red';
            default: return 'blue';
        }
    };

    const getViolationSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'blue';
            default: return 'default';
        }
    };

    const getSeverityText = (severity) => {
        switch (severity) {
            case 'high': return 'Yüksek';
            case 'medium': return 'Orta';
            case 'low': return 'Düşük';
            default: return 'Normal';
        }
    };

    const getViolationTypeText = (type) => {
        switch (type) {
            case 'limit_exceeded': return 'Limit Aşımı';
            case 'late_approval': return 'Geç Onay';
            case 'missing_receipt': return 'Eksik Belge';
            default: return 'Diğer';
        }
    };

    const handleExport = (format) => {
        message.success(`Rapor ${format.toUpperCase()} formatında dışa aktarılıyor...`);
    };

    // Kullanıcı raporu kolonları
    const userReportColumns = [
        {
            title: 'Kullanıcı',
            dataIndex: 'user',
            key: 'user',
            render: (name, record) => (
                <div>
                    <div><UserOutlined /> {name}</div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        {record.department}
                    </Text>
                </div>
            )
        },
        {
            title: 'Toplam Harcama',
            dataIndex: 'totalExpenses',
            key: 'totalExpenses',
            render: (amount) => <Text strong>{amount} ₺</Text>,
            sorter: (a, b) => a.totalExpenses - b.totalExpenses
        },
        {
            title: 'Seyahat Sayısı',
            dataIndex: 'tripCount',
            key: 'tripCount',
            sorter: (a, b) => a.tripCount - b.tripCount
        },
        {
            title: 'Ortalama/Seyahat',
            dataIndex: 'avgPerTrip',
            key: 'avgPerTrip',
            render: (avg) => `${avg.toFixed(2)} ₺`
        },
        {
            title: 'Son Seyahat',
            dataIndex: 'lastTripDate',
            key: 'lastTripDate'
        },
        {
            title: 'Limit Kullanımı',
            dataIndex: 'limitUsage',
            key: 'limitUsage',
            render: (usage, record) => (
                <div>
                    <Progress
                        percent={usage}
                        size="small"
                        status={record.status === 'over' ? 'exception' :
                            record.status === 'warning' ? 'active' : 'success'}
                    />
                    <Text style={{ fontSize: '12px' }}>{usage}%</Text>
                </div>
            )
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {status === 'normal' ? 'Normal' :
                        status === 'warning' ? 'Dikkat' : 'Limit Aşımı'}
                </Tag>
            )
        }
    ];

    // Departman raporu kolonları
    const departmentReportColumns = [
        {
            title: 'Departman',
            dataIndex: 'department',
            key: 'department',
            render: (name) => (
                <div>
                    <BankOutlined /> {name}
                </div>
            )
        },
        {
            title: 'Bütçe Kullanımı',
            key: 'budgetUsage',
            render: (_, record) => (
                <div>
                    <div>{record.usedBudget} ₺ / {record.totalBudget} ₺</div>
                    <Progress
                        percent={Math.round((record.usedBudget / record.totalBudget) * 100)}
                        size="small"
                        status={record.status === 'warning' ? 'active' : 'success'}
                    />
                </div>
            )
        },
        {
            title: 'Çalışan Sayısı',
            dataIndex: 'employeeCount',
            key: 'employeeCount'
        },
        {
            title: 'Seyahat Sayısı',
            dataIndex: 'tripCount',
            key: 'tripCount'
        },
        {
            title: 'Kişi Başı Ortalama',
            dataIndex: 'avgExpensePerEmployee',
            key: 'avgExpensePerEmployee',
            render: (avg) => `${avg.toFixed(2)} ₺`
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {status === 'normal' ? 'Normal' : 'Dikkat'}
                </Tag>
            )
        }
    ];

    // Politika ihlali kolonları
    const violationColumns = [
        {
            title: 'Kullanıcı',
            dataIndex: 'user',
            key: 'user',
            render: (name, record) => (
                <div>
                    <div><UserOutlined /> {name}</div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        {record.department}
                    </Text>
                </div>
            )
        },
        {
            title: 'İhlal Tipi',
            dataIndex: 'violationType',
            key: 'violationType',
            render: (type) => (
                <Tag>{getViolationTypeText(type)}</Tag>
            )
        },
        {
            title: 'Açıklama',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true
        },
        {
            title: 'Tutar',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount, record) => (
                <div>
                    <Text strong>{amount} ₺</Text>
                    {record.limit && (
                        <div style={{ fontSize: '12px', color: 'red' }}>
                            Limit: {record.limit} ₺
                        </div>
                    )}
                </div>
            )
        },
        {
            title: 'Tarih',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Önem Derecesi',
            dataIndex: 'severity',
            key: 'severity',
            render: (severity) => (
                <Tag color={getViolationSeverityColor(severity)}>
                    {getSeverityText(severity)}
                </Tag>
            )
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'resolved' ? 'green' : 'orange'}>
                    {status === 'resolved' ? 'Çözüldü' : 'Beklemede'}
                </Tag>
            )
        }
    ];

    const totalBudget = departmentData.reduce((sum, dept) => sum + dept.totalBudget, 0);
    const totalUsed = departmentData.reduce((sum, dept) => sum + dept.usedBudget, 0);
    const totalViolations = policyViolations.length;
    const pendingViolations = policyViolations.filter(v => v.status === 'pending').length;

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>
                <BarChartOutlined /> Raporlama & Denetim
            </Title>

            {/* Filtre Seçenekleri */}
            <Card style={{ marginBottom: '24px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Text strong>Tarih Aralığı:</Text>
                        <RangePicker
                            style={{ width: '100%', marginTop: '8px' }}
                            onChange={setSelectedDateRange}
                        />
                    </Col>
                    <Col span={8}>
                        <Text strong>Kullanıcı:</Text>
                        <Select
                            style={{ width: '100%', marginTop: '8px' }}
                            value={selectedUser}
                            onChange={setSelectedUser}
                        >
                            <Select.Option value="all">Tüm Kullanıcılar</Select.Option>
                            {users.map(user => (
                                <Select.Option key={user} value={user}>{user}</Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Text strong>Departman:</Text>
                        <Select
                            style={{ width: '100%', marginTop: '8px' }}
                            value={selectedDepartment}
                            onChange={setSelectedDepartment}
                        >
                            <Select.Option value="all">Tüm Departmanlar</Select.Option>
                            {departments.map(dept => (
                                <Select.Option key={dept} value={dept}>{dept}</Select.Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
            </Card>

            {/* Genel İstatistikler */}
            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Toplam Bütçe"
                            value={totalBudget}
                            suffix="₺"
                            prefix={<BankOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Kullanılan Bütçe"
                            value={totalUsed}
                            suffix="₺"
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Toplam İhlal"
                            value={totalViolations}
                            prefix={<WarningOutlined />}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Bekleyen İhlal"
                            value={pendingViolations}
                            valueStyle={{ color: '#f5222d' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Ana Rapor Tabları */}
            <Card>
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                    <Title level={3}>Detaylı Raporlar</Title>
                    <Space>
                        <Button
                            icon={<FileExcelOutlined />}
                            onClick={() => handleExport('excel')}
                        >
                            Excel
                        </Button>
                        <Button
                            icon={<FilePdfOutlined />}
                            onClick={() => handleExport('pdf')}
                        >
                            PDF
                        </Button>
                    </Space>
                </div>

                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    <TabPane tab="Kullanıcı Bazlı Rapor" key="user">
                        <Alert
                            message="Kullanıcı Harcama Raporu"
                            description="Tüm kullanıcıların harcama detayları ve limit kullanım durumları"
                            type="info"
                            showIcon
                            style={{ marginBottom: '16px' }}
                        />
                        <Table
                            columns={userReportColumns}
                            dataSource={userExpenseData}
                            rowKey="id"
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showTotal: (total) => `Toplam ${total} kullanıcı`
                            }}
                        />
                    </TabPane>

                    <TabPane tab="Departman Bazlı Rapor" key="department">
                        <Alert
                            message="Departman Bütçe Raporu"
                            description="Departmanların bütçe kullanımı ve harcama analizi"
                            type="info"
                            showIcon
                            style={{ marginBottom: '16px' }}
                        />
                        <Table
                            columns={departmentReportColumns}
                            dataSource={departmentData}
                            rowKey="id"
                            pagination={{
                                pageSize: 10,
                                showTotal: (total) => `Toplam ${total} departman`
                            }}
                        />
                    </TabPane>

                    <TabPane tab="Politika İhlali Raporu" key="violations">
                        <Alert
                            message="Politika İhlalleri"
                            description="Limit aşımları, geç onaylar ve diğer politika ihlalleri"
                            type="warning"
                            showIcon
                            style={{ marginBottom: '16px' }}
                        />
                        <Table
                            columns={violationColumns}
                            dataSource={policyViolations}
                            rowKey="id"
                            pagination={{
                                pageSize: 10,
                                showTotal: (total) => `Toplam ${total} ihlal`
                            }}
                        />
                    </TabPane>
                </Tabs>
            </Card>

            {/* Trend Analizi */}
            <Row gutter={16} style={{ marginTop: '24px' }}>
                <Col span={12}>
                    <Card title="Aylık Harcama Trendi" extra={<LineChartOutlined />}>
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <Text type="secondary">
                                Grafik burada görüntülenecek
                                <br />
                                (Chart.js entegrasyonu ile)
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Departman Harcama Dağılımı" extra={<PieChartOutlined />}>
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <Text type="secondary">
                                Pasta grafik burada görüntülenecek
                                <br />
                                (Chart.js entegrasyonu ile)
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Özel Rapor Oluşturma */}
            <Card title="Özel Rapor Oluştur" style={{ marginTop: '24px' }}>
                <Form layout="inline">
                    <Form.Item label="Rapor Adı">
                        <Input placeholder="Rapor adı girin" />
                    </Form.Item>
                    <Form.Item label="Rapor Tipi">
                        <Select style={{ width: 150 }}>
                            <Select.Option value="summary">Özet Rapor</Select.Option>
                            <Select.Option value="detailed">Detay Rapor</Select.Option>
                            <Select.Option value="custom">Özel Rapor</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" icon={<DownloadOutlined />}>
                            Rapor Oluştur
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Reports;