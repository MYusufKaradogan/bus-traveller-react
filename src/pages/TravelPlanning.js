import React, {useState} from 'react';
import {
    Card,
    Form,
    DatePicker,
    Input,
    Select,
    Button,
    Row,
    Col,
    Typography,
    AutoComplete,
    Divider,
    message
} from 'antd';
import {CalendarOutlined, UserOutlined, SaveOutlined, SendOutlined} from '@ant-design/icons';

const {Title} = Typography;
const {RangePicker} = DatePicker;
const {Option} = Select;
const {TextArea} = Input;

const TravelPlanning = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Statik veri - gerçek uygulamada API'den gelecek
    const cities = [
        'İstanbul',
        'Ankara',
        'İzmir',
        'Antalya',
        'Bursa',
        'Adana',
        'Londra',
        'Paris',
        'Berlin',
        'New York',
        'Dubai'
    ];

    const travelPurposes = [
        'Müşteri Toplantısı',
        'İş Toplantısı',
        'Eğitim/Seminer',
        'Konferans',
        'Proje Ziyareti',
        'İş Geliştirme',
        'Denetim',
        'Diğer'
    ];

    const employees = [
        'Ahmet Yılmaz',
        'Ayşe Kaya',
        'Mehmet Demir',
        'Fatma Şahin',
        'Ali Özkan',
        'Zeynep Arslan'
    ];

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Burada API çağrısı yapılacak
            console.log('Form Values:', values);
            message.success('Seyahat planı başarıyla kaydedildi!');
            form.resetFields();
        } catch (error) {
            message.error('Bir hata oluştu!');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAndApproval = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            // Onay akışına gönder
            console.log('Onay için gönderilen değerler:', values);
            message.success('Seyahat planı onay akışına gönderildi!');
            form.resetFields();
        } catch (error) {
            message.error('Lütfen tüm zorunlu alanları doldurun!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <header>
            <section className="section__container destination__container">
                <Title level={2}>
                    <CalendarOutlined/> Yeni Seyahat Planla
                </Title>

                <Card>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        initialValues={{
                            travelType: 'domestic'
                        }}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Seyahat Tarihleri"
                                    name="travelDates"
                                    rules={[{required: true, message: 'Lütfen seyahat tarihlerini seçin!'}]}
                                >
                                    <RangePicker
                                        style={{width: '100%'}}
                                        placeholder={['Başlangıç Tarihi', 'Bitiş Tarihi']}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Seyahat Tipi"
                                    name="travelType"
                                    rules={[{required: true, message: 'Lütfen seyahat tipini seçin!'}]}
                                >
                                    <Select placeholder="Seyahat tipi seçin">
                                        <Option value="domestic">Yurt İçi</Option>
                                        <Option value="international">Yurt Dışı</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Kalkış Şehri"
                                    name="departureCity"
                                    rules={[{required: true, message: 'Lütfen kalkış şehrini girin!'}]}
                                >
                                    <AutoComplete
                                        options={cities.map(city => ({value: city}))}
                                        placeholder="Kalkış şehri"
                                        filterOption={(inputValue, option) =>
                                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Varış Şehri"
                                    name="arrivalCity"
                                    rules={[{required: true, message: 'Lütfen varış şehrini girin!'}]}
                                >
                                    <AutoComplete
                                        options={cities.map(city => ({value: city}))}
                                        placeholder="Varış şehri"
                                        filterOption={(inputValue, option) =>
                                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Ara Durak/Uğrak Noktaları"
                            name="transitPoints"
                        >
                            <Select
                                mode="tags"
                                placeholder="Ara durakları girin (opsiyonel)"
                                style={{width: '100%'}}
                            >
                                {cities.map(city => (
                                    <Option key={city} value={city}>{city}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Seyahat Amacı"
                                    name="travelPurpose"
                                    rules={[{required: true, message: 'Lütfen seyahat amacını seçin!'}]}
                                >
                                    <Select placeholder="Seyahat amacını seçin">
                                        {travelPurposes.map(purpose => (
                                            <Option key={purpose} value={purpose}>{purpose}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Katılımcılar"
                                    name="participants"
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Katılımcıları seçin"
                                        style={{width: '100%'}}
                                    >
                                        {employees.map(employee => (
                                            <Option key={employee} value={employee}>
                                                <UserOutlined/> {employee}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Seyahat Detayları"
                            name="travelDetails"
                        >
                            <TextArea
                                rows={4}
                                placeholder="Seyahat ile ilgili ek bilgiler (opsiyonel)"
                            />
                        </Form.Item>

                        <Divider/>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Tahmini Bütçe"
                                    name="estimatedBudget"
                                >
                                    <Input
                                        prefix="₺"
                                        placeholder="0.00"
                                        type="number"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Öncelik Seviyesi"
                                    name="priority"
                                    initialValue="normal"
                                >
                                    <Select>
                                        <Option value="low">Düşük</Option>
                                        <Option value="normal">Normal</Option>
                                        <Option value="high">Yüksek</Option>
                                        <Option value="urgent">Acil</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Row gutter={16}>
                                <Col>
                                    <Button
                                        type="default"
                                        icon={<SaveOutlined/>}
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Taslak Kaydet
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        type="primary"
                                        icon={<SendOutlined/>}
                                        onClick={handleSaveAndApproval}
                                        loading={loading}
                                    >
                                        Kaydet ve Onaya Gönder
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Card>
            </section>
        </header>
    );
};

export default TravelPlanning;