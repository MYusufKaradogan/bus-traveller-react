import React, {useState} from 'react';
import {
    Card,
    Tabs,
    Form,
    Input,
    Select,
    Button,
    Table,
    Space,
    Modal,
    Switch,
    InputNumber,
    Typography,
    Row,
    Col,
    Tag,
    Alert,
    Divider,
    message,
    Popconfirm
} from 'antd';
import {
    SettingOutlined,
    UserOutlined,
    DollarOutlined,
    GlobalOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SaveOutlined,
    TeamOutlined
} from '@ant-design/icons';

const {Title, Text} = Typography;
const {TabPane} = Tabs;

const Settings = () => {
    const [activeTab, setActiveTab] = useState('roles');
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [userForm] = Form.useForm();
    const [policyForm] = Form.useForm();
    const [generalForm] = Form.useForm();

    // Statik veri - Kullanıcılar ve Roller
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Ahmet Yılmaz',
            email: 'ahmet.yilmaz@company.com',
            department: 'Satış',
            role: 'employee',
            isActive: true,
            permissions: ['travel_create', 'expense_create', 'expense_view']
        },
        {
            id: 2,
            name: 'Ayşe Kaya',
            email: 'ayse.kaya@company.com',
            department: 'Pazarlama',
            role: 'manager',
            isActive: true,
            permissions: ['travel_create', 'expense_create', 'expense_view', 'travel_approve', 'expense_approve']
        },
        {
            id: 3,
            name: 'Mehmet Demir',
            email: 'mehmet.demir@company.com',
            department: 'Finans',
            role: 'finance',
            isActive: true,
            permissions: ['all']
        },
        {
            id: 4,
            name: 'Admin User',
            email: 'admin@company.com',
            department: 'BT',
            role: 'admin',
            isActive: true,
            permissions: ['all']
        }
    ]);

    // Politika ve Limitler
    const [policies, setPolicies] = useState([
        {
            id: 1,
            category: 'accommodation',
            categoryName: 'Konaklama',
            region: 'domestic',
            regionName: 'Yurt İçi',
            dailyLimit: 500,
            currency: 'TRY',
            isActive: true
        },
        {
            id: 2,
            category: 'meal',
            categoryName: 'Yemek',
            region: 'domestic',
            regionName: 'Yurt İçi',
            dailyLimit: 200,
            currency: 'TRY',
            isActive: true
        },
        {
            id: 3,
            category: 'accommodation',
            categoryName: 'Konaklama',
            region: 'europe',
            regionName: 'Avrupa',
            dailyLimit: 150,
            currency: 'EUR',
            isActive: true
        },
        {
            id: 4,
            category: 'transportation',
            categoryName: 'Ulaşım',
            region: 'all',
            regionName: 'Tüm Bölgeler',
            dailyLimit: 1000,
            currency: 'TRY',
            isActive: true
        }
    ]);

    const roles = [
        {value: 'employee', label: 'Çalışan', color: 'blue'},
        {value: 'manager', label: 'Yönetici', color: 'green'},
        {value: 'finance', label: 'Finans', color: 'orange'},
        {value: 'admin', label: 'Sistem Yöneticisi', color: 'red'}
    ];

    const permissions = [
        {value: 'travel_create', label: 'Seyahat Planı Oluştur'},
        {value: 'travel_view', label: 'Seyahat Görüntüle'},
        {value: 'travel_approve', label: 'Seyahat Onayla'},
        {value: 'expense_create', label: 'Harcama Ekle'},
        {value: 'expense_view', label: 'Harcama Görüntüle'},
        {value: 'expense_approve', label: 'Harcama Onayla'},
        {value: 'report_view', label: 'Rapor Görüntüle'},
        {value: 'report_export', label: 'Rapor Dışa Aktar'},
        {value: 'settings_manage', label: 'Ayarları Yönet'},
        {value: 'all', label: 'Tüm Yetkiler'}
    ];

    const categories = [
        {value: 'accommodation', label: 'Konaklama'},
        {value: 'meal', label: 'Yemek'},
        {value: 'transportation', label: 'Ulaşım'},
        {value: 'fuel', label: 'Yakıt'},
        {value: 'visa', label: 'Vize'},
        {value: 'other', label: 'Diğer'}
    ];

    const regions = [
        {value: 'domestic', label: 'Yurt İçi'},
        {value: 'europe', label: 'Avrupa'},
        {value: 'america', label: 'Amerika'},
        {value: 'asia', label: 'Asya'},
        {value: 'middle_east', label: 'Orta Doğu'},
        {value: 'all', label: 'Tüm Bölgeler'}
    ];

    const currencies = [
        {value: 'TRY', label: '₺ TRY'},
        {value: 'USD', label: '$ USD'},
        {value: 'EUR', label: '€ EUR'},
        {value: 'GBP', label: '£ GBP'}
    ];

    const departments = [
        'Satış', 'Pazarlama', 'İnsan Kaynakları', 'Ar-Ge',
        'Finans', 'Operasyon', 'BT', 'Yönetim'
    ];

    const getRoleInfo = (roleValue) => {
        return roles.find(role => role.value === roleValue) || {label: roleValue, color: 'default'};
    };

    const handleUserSubmit = (values) => {
        if (editingUser) {
            setUsers(users.map(user =>
                user.id === editingUser.id ? {...user, ...values} : user
            ));
            message.success('Kullanıcı başarıyla güncellendi!');
        } else {
            const newUser = {
                id: users.length + 1,
                ...values,
                isActive: true
            };
            setUsers([...users, newUser]);
            message.success('Kullanıcı başarıyla eklendi!');
        }

        setIsUserModalVisible(false);
        setEditingUser(null);
        userForm.resetFields();
    };

    const handlePolicySubmit = (values) => {
        const categoryInfo = categories.find(cat => cat.value === values.category);
        const regionInfo = regions.find(reg => reg.value === values.region);

        if (editingPolicy) {
            setPolicies(policies.map(policy =>
                policy.id === editingPolicy.id
                    ? {
                        ...policy,
                        ...values,
                        categoryName: categoryInfo?.label,
                        regionName: regionInfo?.label
                    }
                    : policy
            ));
            message.success('Politika başarıyla güncellendi!');
        } else {
            const newPolicy = {
                id: policies.length + 1,
                ...values,
                categoryName: categoryInfo?.label,
                regionName: regionInfo?.label,
                isActive: true
            };
            setPolicies([...policies, newPolicy]);
            message.success('Politika başarıyla eklendi!');
        }

        setIsPolicyModalVisible(false);
        setEditingPolicy(null);
        policyForm.resetFields();
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        userForm.setFieldsValue(user);
        setIsUserModalVisible(true);
    };

    const handleDeleteUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
        message.success('Kullanıcı silindi!');
    };

    const handleEditPolicy = (policy) => {
        setEditingPolicy(policy);
        policyForm.setFieldsValue(policy);
        setIsPolicyModalVisible(true);
    };

    const handleDeletePolicy = (policyId) => {
        setPolicies(policies.filter(policy => policy.id !== policyId));
        message.success('Politika silindi!');
    };

    const togglePolicyStatus = (policyId) => {
        setPolicies(policies.map(policy =>
            policy.id === policyId
                ? {...policy, isActive: !policy.isActive}
                : policy
        ));
        message.success('Politika durumu güncellendi!');
    };

    // Kullanıcı tablosu kolonları
    const userColumns = [
        {
            title: 'Kullanıcı',
            key: 'user',
            render: (_, record) => (
                <div>
                    <div><UserOutlined/> {record.name}</div>
                    <Text type="secondary" style={{fontSize: '12px'}}>
                        {record.email}
                    </Text>
                </div>
            )
        },
        {
            title: 'Departman',
            dataIndex: 'department',
            key: 'department'
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                const roleInfo = getRoleInfo(role);
                return <Tag color={roleInfo.color}>{roleInfo.label}</Tag>;
            }
        },
        {
            title: 'Durum',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) => (
                <Tag color={isActive ? 'green' : 'red'}>
                    {isActive ? 'Aktif' : 'Pasif'}
                </Tag>
            )
        },
        {
            title: 'Yetkiler',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (perms) => (
                <div>
                    {perms.includes('all') ? (
                        <Tag color="purple">Tüm Yetkiler</Tag>
                    ) : (
                        perms.slice(0, 2).map(perm => (
                            <Tag key={perm} size="small">
                                {permissions.find(p => p.value === perm)?.label}
                            </Tag>
                        ))
                    )}
                    {perms.length > 2 && !perms.includes('all') && (
                        <Tag size="small">+{perms.length - 2}</Tag>
                    )}
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
                        icon={<EditOutlined/>}
                        onClick={() => handleEditUser(record)}
                    />
                    <Popconfirm
                        title="Kullanıcıyı silmek istediğinizden emin misiniz?"
                        onConfirm={() => handleDeleteUser(record.id)}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <Button
                            type="link"
                            icon={<DeleteOutlined/>}
                            danger
                        />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    // Politika tablosu kolonları
    const policyColumns = [
        {
            title: 'Kategori',
            dataIndex: 'categoryName',
            key: 'categoryName'
        },
        {
            title: 'Bölge',
            dataIndex: 'regionName',
            key: 'regionName'
        },
        {
            title: 'Günlük Limit',
            key: 'limit',
            render: (_, record) => (
                <Text strong>{record.dailyLimit} {record.currency}</Text>
            )
        },
        {
            title: 'Durum',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive, record) => (
                <Switch
                    checked={isActive}
                    onChange={() => togglePolicyStatus(record.id)}
                />
            )
        },
        {
            title: 'İşlemler',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined/>}
                        onClick={() => handleEditPolicy(record)}
                    />
                    <Popconfirm
                        title="Politikayı silmek istediğinizden emin misiniz?"
                        onConfirm={() => handleDeletePolicy(record.id)}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <Button
                            type="link"
                            icon={<DeleteOutlined/>}
                            danger
                        />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <header>
            <section className="section__container destination__container">
                <Title level={2}>
                    <SettingOutlined/> Ayarlar & Yetkilendirme
                </Title>

                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    {/* Rol ve Yetki Yönetimi */}
                    <TabPane tab={<><TeamOutlined/> Kullanıcı Yönetimi</>} key="roles">
                        <Card
                            title="Kullanıcı ve Rol Yönetimi"
                            extra={
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                    onClick={() => {
                                        setEditingUser(null);
                                        userForm.resetFields();
                                        setIsUserModalVisible(true);
                                    }}
                                >
                                    Yeni Kullanıcı
                                </Button>
                            }
                        >
                            <Alert
                                message="Kullanıcı Yetkileri"
                                description="Sistem kullanıcılarının rollerini ve yetkilerini bu bölümden yönetebilirsiniz."
                                type="info"
                                showIcon
                                style={{marginBottom: '16px'}}
                            />

                            <Table
                                columns={userColumns}
                                dataSource={users}
                                rowKey="id"
                                pagination={{pageSize: 10}}
                            />
                        </Card>
                    </TabPane>

                    {/* Politika ve Limitler */}
                    <TabPane tab={<><DollarOutlined/> Politikalar</>} key="policies">
                        <Card
                            title="Harcama Politikaları ve Limitler"
                            extra={
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                    onClick={() => {
                                        setEditingPolicy(null);
                                        policyForm.resetFields();
                                        setIsPolicyModalVisible(true);
                                    }}
                                >
                                    Yeni Politika
                                </Button>
                            }
                        >
                            <Alert
                                message="Harcama Limitleri"
                                description="Kategoriler ve bölgeler bazında günlük harcama limitlerini belirleyebilirsiniz."
                                type="info"
                                showIcon
                                style={{marginBottom: '16px'}}
                            />

                            <Table
                                columns={policyColumns}
                                dataSource={policies}
                                rowKey="id"
                                pagination={{pageSize: 10}}
                            />
                        </Card>
                    </TabPane>

                    {/* Genel Ayarlar */}
                    <TabPane tab={<><GlobalOutlined/> Genel Ayarlar</>} key="general">
                        <Card title="Sistem Genel Ayarları">
                            <Form
                                form={generalForm}
                                layout="vertical"
                                initialValues={{
                                    defaultLanguage: 'tr',
                                    defaultCurrency: 'TRY',
                                    autoApprovalLimit: 100,
                                    emailNotifications: true,
                                    smsNotifications: false
                                }}
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Varsayılan Dil"
                                            name="defaultLanguage"
                                        >
                                            <Select>
                                                <Select.Option value="tr">Türkçe</Select.Option>
                                                <Select.Option value="en">English</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Varsayılan Para Birimi"
                                            name="defaultCurrency"
                                        >
                                            <Select>
                                                {currencies.map(currency => (
                                                    <Select.Option key={currency.value} value={currency.value}>
                                                        {currency.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Otomatik Onay Limiti"
                                            name="autoApprovalLimit"
                                            help="Bu tutarın altındaki harcamalar otomatik onaylanır"
                                        >
                                            <InputNumber
                                                style={{width: '100%'}}
                                                suffix="₺"
                                                min={0}
                                                max={1000}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Onay Süresi (Gün)"
                                            name="approvalTimeout"
                                            help="Bu süre sonunda otomatik onaylanır"
                                            initialValue={7}
                                        >
                                            <InputNumber
                                                style={{width: '100%'}}
                                                min={1}
                                                max={30}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Divider/>

                                <Title level={4}>Bildirim Ayarları</Title>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="E-posta Bildirimleri"
                                            name="emailNotifications"
                                            valuePropName="checked"
                                        >
                                            <Switch/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="SMS Bildirimleri"
                                            name="smsNotifications"
                                            valuePropName="checked"
                                        >
                                            <Switch/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Push Bildirimleri"
                                            name="pushNotifications"
                                            valuePropName="checked"
                                            initialValue={true}
                                        >
                                            <Switch/>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Divider/>

                                <Title level={4}>Güvenlik Ayarları</Title>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Şifre Geçerlilik Süresi (Gün)"
                                            name="passwordExpiry"
                                            initialValue={90}
                                        >
                                            <InputNumber
                                                style={{width: '100%'}}
                                                min={30}
                                                max={365}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Oturum Zaman Aşımı (Dakika)"
                                            name="sessionTimeout"
                                            initialValue={30}
                                        >
                                            <InputNumber
                                                style={{width: '100%'}}
                                                min={15}
                                                max={480}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined/>}
                                        onClick={() => message.success('Ayarlar kaydedildi!')}
                                    >
                                        Ayarları Kaydet
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </TabPane>
                </Tabs>

                {/* Kullanıcı Ekleme/Düzenleme Modal */}
                <Modal
                    title={editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
                    open={isUserModalVisible}
                    onCancel={() => {
                        setIsUserModalVisible(false);
                        setEditingUser(null);
                        userForm.resetFields();
                    }}
                    footer={null}
                    width={600}
                >
                    <Form
                        form={userForm}
                        layout="vertical"
                        onFinish={handleUserSubmit}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Ad Soyad"
                                    name="name"
                                    rules={[{required: true, message: 'Ad soyad zorunludur!'}]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="E-posta"
                                    name="email"
                                    rules={[
                                        {required: true, message: 'E-posta zorunludur!'},
                                        {type: 'email', message: 'Geçerli e-posta adresi girin!'}
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Departman"
                                    name="department"
                                    rules={[{required: true, message: 'Departman seçin!'}]}
                                >
                                    <Select>
                                        {departments.map(dept => (
                                            <Select.Option key={dept} value={dept}>
                                                {dept}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Rol"
                                    name="role"
                                    rules={[{required: true, message: 'Rol seçin!'}]}
                                >
                                    <Select>
                                        {roles.map(role => (
                                            <Select.Option key={role.value} value={role.value}>
                                                {role.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Yetkiler"
                            name="permissions"
                            rules={[{required: true, message: 'En az bir yetki seçin!'}]}
                        >
                            <Select mode="multiple" placeholder="Yetkiler seçin">
                                {permissions.map(perm => (
                                    <Select.Option key={perm.value} value={perm.value}>
                                        {perm.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    {editingUser ? 'Güncelle' : 'Ekle'}
                                </Button>
                                <Button onClick={() => setIsUserModalVisible(false)}>
                                    İptal
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Politika Ekleme/Düzenleme Modal */}
                <Modal
                    title={editingPolicy ? 'Politika Düzenle' : 'Yeni Politika Ekle'}
                    open={isPolicyModalVisible}
                    onCancel={() => {
                        setIsPolicyModalVisible(false);
                        setEditingPolicy(null);
                        policyForm.resetFields();
                    }}
                    footer={null}
                    width={500}
                >
                    <Form
                        form={policyForm}
                        layout="vertical"
                        onFinish={handlePolicySubmit}
                    >
                        <Form.Item
                            label="Kategori"
                            name="category"
                            rules={[{required: true, message: 'Kategori seçin!'}]}
                        >
                            <Select>
                                {categories.map(category => (
                                    <Select.Option key={category.value} value={category.value}>
                                        {category.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Bölge"
                            name="region"
                            rules={[{required: true, message: 'Bölge seçin!'}]}
                        >
                            <Select>
                                {regions.map(region => (
                                    <Select.Option key={region.value} value={region.value}>
                                        {region.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Günlük Limit"
                                    name="dailyLimit"
                                    rules={[{required: true, message: 'Limit girin!'}]}
                                >
                                    <InputNumber
                                        style={{width: '100%'}}
                                        min={0}
                                        precision={2}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Para Birimi"
                                    name="currency"
                                    rules={[{required: true, message: 'Para birimi seçin!'}]}
                                >
                                    <Select>
                                        {currencies.map(currency => (
                                            <Select.Option key={currency.value} value={currency.value}>
                                                {currency.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    {editingPolicy ? 'Güncelle' : 'Ekle'}
                                </Button>
                                <Button onClick={() => setIsPolicyModalVisible(false)}>
                                    İptal
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </section>
        </header>);
};

export default Settings;