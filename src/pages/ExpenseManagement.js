import React, {useState} from 'react';
import {
    Card,
    Form,
    Input,
    Select,
    Button,
    Row,
    Col,
    Typography,
    DatePicker,
    InputNumber,
    Upload,
    Table,
    Space,
    Tag,
    message,
    Modal,
    Divider,
    Alert
} from 'antd';
import {
    DollarOutlined,
    UploadOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    FileTextOutlined,
    WarningOutlined
} from '@ant-design/icons';
import {moment} from "moment";

const {Title, Text} = Typography;
const {Option} = Select;

const ExpenseManagement = () => {
    const [form] = Form.useForm();
    const [expenses, setExpenses] = useState([
        {
            id: 1,
            category: 'accommodation',
            description: 'Otel Konaklama - Hilton Istanbul',
            amount: 450,
            currency: 'TRY',
            date: '2024-09-10',
            receipt: 'hotel_receipt.pdf',
            status: 'approved',
            limitWarning: false
        },
        {
            id: 2,
            category: 'transportation',
            description: 'Uçak Bileti - İstanbul-Ankara',
            amount: 890,
            currency: 'TRY',
            date: '2024-09-08',
            receipt: 'flight_ticket.pdf',
            status: 'pending',
            limitWarning: false
        },
        {
            id: 3,
            category: 'meal',
            description: 'İş Yemeği - Müşteri Toplantısı',
            amount: 125,
            currency: 'TRY',
            date: '2024-09-05',
            receipt: 'restaurant_receipt.jpg',
            status: 'approved',
            limitWarning: false
        },
        {
            id: 4,
            category: 'transportation',
            description: 'Taksi - Havalimanı Transfer',
            amount: 85,
            currency: 'TRY',
            date: '2024-09-03',
            receipt: null,
            status: 'rejected',
            limitWarning: true
        }
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

    // Statik veri
    const expenseCategories = [
        {value: 'accommodation', label: 'Konaklama', limit: 500},
        {value: 'transportation', label: 'Ulaşım', limit: 1000},
        {value: 'meal', label: 'Yemek', limit: 200},
        {value: 'fuel', label: 'Yakıt', limit: 300},
        {value: 'visa', label: 'Vize', limit: 150},
        {value: 'conference', label: 'Konferans/Eğitim', limit: 800},
        {value: 'communication', label: 'İletişim', limit: 100},
        {value: 'other', label: 'Diğer', limit: 250}
    ];

    const currencies = [
        {value: 'TRY', label: '₺ TRY', rate: 1},
        {value: 'USD', label: '$ USD', rate: 32.50},
        {value: 'EUR', label: '€ EUR', rate: 35.20},
        {value: 'GBP', label: '£ GBP', rate: 41.30}
    ];

    const regions = {
        'domestic': {name: 'Yurt İçi', dailyLimit: 300},
        'europe': {name: 'Avrupa', dailyLimit: 150},
        'america': {name: 'Amerika', dailyLimit: 200},
        'asia': {name: 'Asya', dailyLimit: 120},
        'middle_east': {name: 'Orta Doğu', dailyLimit: 130}
    };

    const checkLimitWarning = (category, amount, currency) => {
        const categoryData = expenseCategories.find(cat => cat.value === category);
        const currencyData = currencies.find(cur => cur.value === currency);

        if (categoryData && currencyData) {
            const amountInTRY = amount * currencyData.rate;
            return amountInTRY > categoryData.limit;
        }
        return false;
    };

    const handleSubmit = (values) => {
        const limitWarning = checkLimitWarning(values.category, values.amount, values.currency);

        const newExpense = {
            id: expenses.length + 1,
            ...values,
            date: values.date.format('YYYY-MM-DD'),
            status: 'pending',
            limitWarning,
            receipt: values.receipt ? values.receipt.file.name : null
        };

        if (editingExpense) {
            setExpenses(expenses.map(exp =>
                exp.id === editingExpense.id ? {...newExpense, id: editingExpense.id} : exp
            ));
            message.success('Harcama başarıyla güncellendi!');
        } else {
            setExpenses([...expenses, newExpense]);
            message.success('Harcama başarıyla eklendi!');
        }

        if (limitWarning) {
            message.warning('Bu harcama kategori limitini aşıyor!');
        }

        form.resetFields();
        setIsModalVisible(false);
        setEditingExpense(null);
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        form.setFieldsValue({
            ...expense,
            date: expense.date ? moment(expense.date) : null
        });
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Harcamayı Sil',
            content: 'Bu harcamayı silmek istediğinizden emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            onOk: () => {
                setExpenses(expenses.filter(exp => exp.id !== id));
                message.success('Harcama silindi!');
            }
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'green';
            case 'pending':
                return 'orange';
            case 'rejected':
                return 'red';
            default:
                return 'default';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'approved':
                return 'Onaylandı';
            case 'pending':
                return 'Beklemede';
            case 'rejected':
                return 'Reddedildi';
            default:
                return 'Bilinmiyor';
        }
    };

    const getCategoryLabel = (category) => {
        const cat = expenseCategories.find(c => c.value === category);
        return cat ? cat.label : category;
    };

    const columns = [
        {
            title: 'Tarih',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => new Date(a.date) - new Date(b.date)
        },
        {
            title: 'Kategori',
            dataIndex: 'category',
            key: 'category',
            render: (category) => getCategoryLabel(category),
            filters: expenseCategories.map(cat => ({text: cat.label, value: cat.value})),
            onFilter: (value, record) => record.category === value
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
                <span>
                    {amount} {record.currency}
                    {record.limitWarning && (
                        <WarningOutlined style={{color: 'red', marginLeft: 8}}/>
                    )}
                </span>
            ),
            sorter: (a, b) => a.amount - b.amount
        },
        {
            title: 'Fiş/Fatura',
            dataIndex: 'receipt',
            key: 'receipt',
            render: (receipt) => (
                receipt ? (
                    <Tag color="green">
                        <FileTextOutlined/> Mevcut
                    </Tag>
                ) : (
                    <Tag color="red">Yok</Tag>
                )
            )
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
                {text: 'Onaylandı', value: 'approved'},
                {text: 'Beklemede', value: 'pending'},
                {text: 'Reddedildi', value: 'rejected'}
            ],
            onFilter: (value, record) => record.status === value
        },
        {
            title: 'İşlemler',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EyeOutlined/>}
                        onClick={() => message.info('Harcama detayları görüntülendi')}
                    />
                    <Button
                        type="link"
                        icon={<EditOutlined/>}
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        type="link"
                        icon={<DeleteOutlined/>}
                        danger
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            )
        }
    ];

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const pendingExpenses = expenses.filter(exp => exp.status === 'pending').length;
    const approvedExpenses = expenses.filter(exp => exp.status === 'approved').length;

    return (
        <header>
            <section className="section__container destination__container">
                <Title level={2}>
                    <DollarOutlined/> Harcama Yönetimi
                </Title>

                {/* Özet Bilgiler */}
                <Row gutter={16} style={{marginBottom: '24px'}}>
                    <Col span={6}>
                        <Card>
                            <div style={{textAlign: 'center'}}>
                                <Text type="secondary">Toplam Harcama</Text>
                                <div style={{fontSize: '24px', fontWeight: 'bold', color: '#1890ff'}}>
                                    {totalExpenses.toFixed(2)} ₺
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <div style={{textAlign: 'center'}}>
                                <Text type="secondary">Bekleyen Onay</Text>
                                <div style={{fontSize: '24px', fontWeight: 'bold', color: '#faad14'}}>
                                    {pendingExpenses}
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <div style={{textAlign: 'center'}}>
                                <Text type="secondary">Onaylanmış</Text>
                                <div style={{fontSize: '24px', fontWeight: 'bold', color: '#52c41a'}}>
                                    {approvedExpenses}
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <div style={{textAlign: 'center'}}>
                                <Text type="secondary">Bu Ay Limit</Text>
                                <div style={{fontSize: '24px', fontWeight: 'bold', color: '#722ed1'}}>
                                    5000 ₺
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Limit Uyarısı */}
                {totalExpenses > 4000 && (
                    <Alert
                        message="Limit Uyarısı"
                        description="Aylık harcama limitinize yaklaşıyorsunuz. Kalan limit: 1000 ₺"
                        type="warning"
                        showIcon
                        style={{marginBottom: '24px'}}
                    />
                )}

                {/* Harcama Listesi */}
                <Card
                    title="Harcama Listesi"
                    extra={
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={() => {
                                setEditingExpense(null);
                                form.resetFields();
                                setIsModalVisible(true);
                            }}
                        >
                            Yeni Harcama Ekle
                        </Button>
                    }
                >
                    <Table
                        columns={columns}
                        dataSource={expenses}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total) => `Toplam ${total} harcama`
                        }}
                    />
                </Card>

                {/* Harcama Ekleme/Düzenleme Modal */}
                <Modal
                    title={editingExpense ? 'Harcama Düzenle' : 'Yeni Harcama Ekle'}
                    open={isModalVisible}
                    onCancel={() => {
                        setIsModalVisible(false);
                        setEditingExpense(null);
                        form.resetFields();
                    }}
                    footer={null}
                    width={800}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Harcama Kategorisi"
                                    name="category"
                                    rules={[{required: true, message: 'Kategori seçin!'}]}
                                >
                                    <Select placeholder="Kategori seçin">
                                        {expenseCategories.map(category => (
                                            <Option key={category.value} value={category.value}>
                                                {category.label} (Limit: {category.limit} ₺)
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Tarih"
                                    name="date"
                                    rules={[{required: true, message: 'Tarih seçin!'}]}
                                >
                                    <DatePicker style={{width: '100%'}}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Harcama Açıklaması"
                            name="description"
                            rules={[{required: true, message: 'Açıklama girin!'}]}
                        >
                            <Input placeholder="Harcama açıklaması girin"/>
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Tutar"
                                    name="amount"
                                    rules={[{required: true, message: 'Tutar girin!'}]}
                                >
                                    <InputNumber
                                        style={{width: '100%'}}
                                        placeholder="0.00"
                                        min={0}
                                        precision={2}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Para Birimi"
                                    name="currency"
                                    initialValue="TRY"
                                    rules={[{required: true, message: 'Para birimi seçin!'}]}
                                >
                                    <Select>
                                        {currencies.map(currency => (
                                            <Option key={currency.value} value={currency.value}>
                                                {currency.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Fiş/Fatura"
                            name="receipt"
                        >
                            <Upload
                                beforeUpload={() => false}
                                accept=".pdf,.jpg,.jpeg,.png"
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined/>}>
                                    Dosya Yükle (PDF, JPG, PNG)
                                </Button>
                            </Upload>
                            <Text type="secondary" style={{display: 'block', marginTop: '8px'}}>
                                Maksimum dosya boyutu: 5MB
                            </Text>
                        </Form.Item>

                        <Form.Item
                            label="Bölge/Ülke"
                            name="region"
                        >
                            <Select placeholder="Bölge seçin (limit kontrolü için)">
                                {Object.entries(regions).map(([key, region]) => (
                                    <Option key={key} value={key}>
                                        {region.name} (Günlük Limit: {region.dailyLimit} €)
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Divider/>

                        <Form.Item>
                            <Space>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    {editingExpense ? 'Güncelle' : 'Kaydet'}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsModalVisible(false);
                                        setEditingExpense(null);
                                        form.resetFields();
                                    }}
                                >
                                    İptal
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </section>
        </header>);
};

export default ExpenseManagement;