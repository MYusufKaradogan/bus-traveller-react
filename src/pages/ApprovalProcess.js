import React, { useState } from 'react';
import {
    Card,
    Table,
    Button,
    Space,
    Tag,
    Typography,
    Row,
    Col,
    Steps,
    Modal,
    Form,
    Input,
    Select,
    Descriptions,
    Timeline,
    Badge,
    message,
    Divider
} from 'antd';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    EyeOutlined,
    CheckOutlined,
    StopOutlined,
    UserOutlined,
    CalendarOutlined,
    FileTextOutlined,
    MailOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ApprovalProcess = () => {
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);
    const [approvalAction, setApprovalAction] = useState('approve');
    const [form] = Form.useForm();

    // Statik veri - bekleyen onaylar
    const approvalData = [
        {
            id: 1,
            type: 'travel',
            title: 'İstanbul - Ankara İş Seyahati',
            requester: 'Ahmet Yılmaz',
            department: 'Satış',
            submitDate: '2024-09-15',
            amount: 1250,
            currency: 'TRY',
            status: 'pending',
            priority: 'normal',
            currentStep: 1,
            totalSteps: 3,
            description: 'Müşteri ziyareti ve proje sunumu için Ankara seyahati',
            details: {
                startDate: '2024-09-20',
                endDate: '2024-09-22',
                destination: 'Ankara',
                purpose: 'Müşteri Toplantısı',
                estimatedCost: 1250
            },
            approvalHistory: [
                {
                    step: 'Başvuru',
                    approver: 'Fatma Şahin',
                    date: '2024-09-18 14:15',
                    status: 'completed',
                    note: 'Harcama raporu gönderildi'
                },
                {
                    step: 'Departman Yöneticisi',
                    approver: 'Ali Özkan',
                    date: '2024-09-19 09:20',
                    status: 'completed',
                    note: 'Onaylandı - Uygun görülmüştür'
                },
                {
                    step: 'Finans Onayı',
                    approver: 'Ayşe Demir',
                    date: null,
                    status: 'pending',
                    note: null
                }
            ]
        },
        {
            id: 3,
            type: 'travel',
            title: 'Londra Konferans Seyahati',
            requester: 'Zeynep Arslan',
            department: 'Ar-Ge',
            submitDate: '2024-09-20',
            amount: 3500,
            currency: 'EUR',
            status: 'approved',
            priority: 'high',
            currentStep: 3,
            totalSteps: 3,
            description: 'Teknoloji konferansına katılım',
            details: {
                startDate: '2024-10-05',
                endDate: '2024-10-08',
                destination: 'London, UK',
                purpose: 'Konferans',
                estimatedCost: 3500
            },
            approvalHistory: [
                {
                    step: 'Başvuru',
                    approver: 'Zeynep Arslan',
                    date: '2024-09-20 11:00',
                    status: 'completed',
                    note: 'Konferans seyahati planı oluşturuldu'
                },
                {
                    step: 'Departman Yöneticisi',
                    approver: 'Can Yılmaz',
                    date: '2024-09-20 15:30',
                    status: 'completed',
                    note: 'Onaylandı - Stratejik önem'
                },
                {
                    step: 'Finans Onayı',
                    approver: 'Ayşe Demir',
                    date: '2024-09-21 10:45',
                    status: 'completed',
                    note: 'Onaylandı - Bütçe uygun'
                }
            ]
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'green';
            case 'pending': return 'orange';
            case 'rejected': return 'red';
            default: return 'default';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'approved': return 'Onaylandı';
            case 'pending': return 'Beklemede';
            case 'rejected': return 'Reddedildi';
            default: return 'Bilinmiyor';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'red';
            case 'normal': return 'blue';
            case 'low': return 'green';
            default: return 'default';
        }
    };

    const getPriorityText = (priority) => {
        switch (priority) {
            case 'high': return 'Yüksek';
            case 'normal': return 'Normal';
            case 'low': return 'Düşük';
            default: return 'Normal';
        }
    };

    const getTypeText = (type) => {
        return type === 'travel' ? 'Seyahat' : 'Harcama';
    };

    const handleViewDetail = (record) => {
        setSelectedRecord(record);
        setIsDetailModalVisible(true);
    };

    const handleApprovalAction = (record, action) => {
        setSelectedRecord(record);
        setApprovalAction(action);
        setIsApprovalModalVisible(true);
    };

    const submitApproval = (values) => {
        const actionText = approvalAction === 'approve' ? 'onaylandı' : 'reddedildi';
        message.success(`${selectedRecord.title} başarıyla ${actionText}!`);

        // E-posta bildirimi simülasyonu
        setTimeout(() => {
            message.info('Başvuru sahibine e-posta bildirimi gönderildi.');
        }, 1000);

        setIsApprovalModalVisible(false);
        form.resetFields();
    };

    const columns = [
        {
            title: 'Tip',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={type === 'travel' ? 'blue' : 'green'}>
                    {getTypeText(type)}
                </Tag>
            ),
            filters: [
                { text: 'Seyahat', value: 'travel' },
                { text: 'Harcama', value: 'expense' }
            ],
            onFilter: (value, record) => record.type === value
        },
        {
            title: 'Başlık',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true
        },
        {
            title: 'Başvuran',
            dataIndex: 'requester',
            key: 'requester',
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
            title: 'Tarih',
            dataIndex: 'submitDate',
            key: 'submitDate',
            render: (date) => (
                <div>
                    <CalendarOutlined /> {date}
                </div>
            ),
            sorter: (a, b) => new Date(a.submitDate) - new Date(b.submitDate)
        },
        {
            title: 'Tutar',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount, record) => (
                <Text strong>
                    {amount} {record.currency}
                </Text>
            ),
            sorter: (a, b) => a.amount - b.amount
        },
        {
            title: 'Öncelik',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority) => (
                <Tag color={getPriorityColor(priority)}>
                    {getPriorityText(priority)}
                </Tag>
            ),
            filters: [
                { text: 'Yüksek', value: 'high' },
                { text: 'Normal', value: 'normal' },
                { text: 'Düşük', value: 'low' }
            ],
            onFilter: (value, record) => record.priority === value
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {getStatusText(status)}
                </Tag>
            ),
            filters: [
                { text: 'Onaylandı', value: 'approved' },
                { text: 'Beklemede', value: 'pending' },
                { text: 'Reddedildi', value: 'rejected' }
            ],
            onFilter: (value, record) => record.status === value
        },
        {
            title: 'İlerleme',
            key: 'progress',
            render: (_, record) => (
                <div style={{ width: 100 }}>
                    <div style={{ marginBottom: 4 }}>
                        <Text style={{ fontSize: '12px' }}>
                            {record.currentStep}/{record.totalSteps}
                        </Text>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '3px'
                    }}>
                        <div style={{
                            width: `${(record.currentStep / record.totalSteps) * 100}%`,
                            height: '100%',
                            backgroundColor: record.status === 'approved' ? '#52c41a' : '#1890ff',
                            borderRadius: '3px'
                        }} />
                    </div>
                </div>
            )
        },
        {
            title: 'İşlemler',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetail(record)}
                    />
                    {record.status === 'pending' && (
                        <>
                            <Button
                                type="link"
                                icon={<CheckOutlined />}
                                style={{ color: 'green' }}
                                onClick={() => handleApprovalAction(record, 'approve')}
                            />
                            <Button
                                type="link"
                                icon={<StopOutlined />}
                                danger
                                onClick={() => handleApprovalAction(record, 'reject')}
                            />
                        </>
                    )}
                </Space>
            )
        }
    ];

    const pendingCount = approvalData.filter(item => item.status === 'pending').length;
    const approvedCount = approvalData.filter(item => item.status === 'approved').length;
    const totalAmount = approvalData.reduce((sum, item) => {
        if (item.currency === 'TRY') return sum + item.amount;
        if (item.currency === 'EUR') return sum + (item.amount * 35.2); // Kur hesabı
        return sum;
    }, 0);

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>
                <CheckCircleOutlined /> Onay Süreçleri
            </Title>

            {/* Özet Kartları */}
            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <ClockCircleOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#faad14' }}>
                                {pendingCount}
                            </div>
                            <Text type="secondary">Bekleyen Onay</Text>
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                                {approvedCount}
                            </div>
                            <Text type="secondary">Onaylanmış</Text>
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                                {approvalData.length}
                            </div>
                            <Text type="secondary">Toplam Başvuru</Text>
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#722ed1' }}>
                                {totalAmount.toFixed(0)} ₺
                            </div>
                            <Text type="secondary">Toplam Tutar</Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Ana Tablo */}
            <Card title="Onay Bekleyen İşlemler">
                <Table
                    columns={columns}
                    dataSource={approvalData}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Toplam ${total} kayıt`
                    }}
                />
            </Card>

            {/* Detay Modal */}
            <Modal
                title="Onay Detayları"
                open={isDetailModalVisible}
                onCancel={() => setIsDetailModalVisible(false)}
                footer={null}
                width={800}
            >
                {selectedRecord && (
                    <>
                        <Descriptions title="Genel Bilgiler" bordered>
                            <Descriptions.Item label="Başlık" span={2}>
                                {selectedRecord.title}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tip">
                                <Tag color={selectedRecord.type === 'travel' ? 'blue' : 'green'}>
                                    {getTypeText(selectedRecord.type)}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Başvuran">
                                {selectedRecord.requester}
                            </Descriptions.Item>
                            <Descriptions.Item label="Departman">
                                {selectedRecord.department}
                            </Descriptions.Item>
                            <Descriptions.Item label="Başvuru Tarihi">
                                {selectedRecord.submitDate}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tutar" span={2}>
                                <Text strong>
                                    {selectedRecord.amount} {selectedRecord.currency}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Öncelik">
                                <Tag color={getPriorityColor(selectedRecord.priority)}>
                                    {getPriorityText(selectedRecord.priority)}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Açıklama" span={3}>
                                {selectedRecord.description}
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider />

                        {/* Onay Süreci */}
                        <Title level={4}>Onay Süreci</Title>
                        <Timeline>
                            {selectedRecord.approvalHistory.map((step, index) => (
                                <Timeline.Item
                                    key={index}
                                    dot={
                                        step.status === 'completed' ? (
                                            <CheckCircleOutlined style={{ color: 'green' }} />
                                        ) : step.status === 'pending' ? (
                                            <ClockCircleOutlined style={{ color: 'orange' }} />
                                        ) : (
                                            <Badge />
                                        )
                                    }
                                    color={
                                        step.status === 'completed' ? 'green' :
                                            step.status === 'pending' ? 'orange' : 'gray'
                                    }
                                >
                                    <div>
                                        <Text strong>{step.step}</Text>
                                        <br />
                                        <Text type="secondary">
                                            Onaylayan: {step.approver}
                                        </Text>
                                        {step.date && (
                                            <>
                                                <br />
                                                <Text type="secondary">
                                                    Tarih: {step.date}
                                                </Text>
                                            </>
                                        )}
                                        {step.note && (
                                            <>
                                                <br />
                                                <Text italic>{step.note}</Text>
                                            </>
                                        )}
                                    </div>
                                </Timeline.Item>
                            ))}
                        </Timeline>

                        {selectedRecord.status === 'pending' && (
                            <div style={{ marginTop: '16px', textAlign: 'right' }}>
                                <Space>
                                    <Button
                                        type="primary"
                                        icon={<CheckOutlined />}
                                        onClick={() => {
                                            setIsDetailModalVisible(false);
                                            handleApprovalAction(selectedRecord, 'approve');
                                        }}
                                    >
                                        Onayla
                                    </Button>
                                    <Button
                                        danger
                                        icon={<StopOutlined />}
                                        onClick={() => {
                                            setIsDetailModalVisible(false);
                                            handleApprovalAction(selectedRecord, 'reject');
                                        }}
                                    >
                                        Reddet
                                    </Button>
                                </Space>
                            </div>
                        )}
                    </>
                )}
            </Modal>

            {/* Onay/Red Modal */}
            <Modal
                title={`${approvalAction === 'approve' ? 'Onayla' : 'Reddet'}: ${selectedRecord?.title}`}
                open={isApprovalModalVisible}
                onCancel={() => setIsApprovalModalVisible(false)}
                footer={null}
                width={500}
            >
                <Form form={form} layout="vertical" onFinish={submitApproval}>
                    <Form.Item
                        label="Not"
                        name="note"
                        rules={[
                            { required: approvalAction === 'reject', message: 'Red nedeni zorunludur!' }
                        ]}
                    >
                        <TextArea
                            rows={4}
                            placeholder={
                                approvalAction === 'approve'
                                    ? 'Onay notu (opsiyonel)'
                                    : 'Lütfen red sebebini belirtin'
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Bildirim Gönder"
                        name="sendNotification"
                        initialValue={true}
                    >
                        <Select>
                            <Select.Option value={true}>
                                <MailOutlined /> E-posta gönder
                            </Select.Option>
                            <Select.Option value={false}>
                                Bildirim gönderme
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    backgroundColor: approvalAction === 'approve' ? '#52c41a' : '#ff4d4f',
                                    borderColor: approvalAction === 'approve' ? '#52c41a' : '#ff4d4f'
                                }}
                            >
                                {approvalAction === 'approve' ? 'Onayla' : 'Reddet'}
                            </Button>
                            <Button onClick={() => setIsApprovalModalVisible(false)}>
                                İptal
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ApprovalProcess;