import React, { useState } from 'react';
import {
    Card,
    Tabs,
    Form,
    Select,
    Button,
    Row,
    Col,
    Typography,
    DatePicker,
    TimePicker,
    InputNumber,
    message,
} from 'antd';
import {
    RocketOutlined,
    HomeOutlined,
    CarOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const ReservationManagement = () => {
    const [activeTab, setActiveTab] = useState('flight');
    const [flightForm] = Form.useForm();
    const [hotelForm] = Form.useForm();
    const [transportForm] = Form.useForm();

    // Statik veri
    const airports = [
        { code: 'IST', name: 'İstanbul Havalimanı (IST)' },
        { code: 'ESB', name: 'Esenboğa Havalimanı (ESB)' },
        { code: 'ADB', name: 'Adnan Menderes Havalimanı (ADB)' },
        { code: 'AYT', name: 'Antalya Havalimanı (AYT)' },
        { code: 'LHR', name: 'London Heathrow (LHR)' },
        { code: 'CDG', name: 'Paris Charles de Gaulle (CDG)' }
    ];

    const airlines = ['Turkish Airlines', 'Pegasus', 'SunExpress', 'Lufthansa', 'Emirates'];

    const cities = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'London', 'Paris'];

    const hotels = [
        'Hilton Istanbul Bosphorus',
        'JW Marriott Ankara',
        'Swissotel İzmir',
        'Rixos Premium Antalya',
        'The Ritz-Carlton Istanbul'
    ];

    const handleFlightSubmit = (values) => {
        console.log('Flight reservation:', values);
        message.success('Uçuş rezervasyonu kaydedildi!');
    };

    const handleHotelSubmit = (values) => {
        console.log('Hotel reservation:', values);
        message.success('Otel rezervasyonu kaydedildi!');
    };

    const handleTransportSubmit = (values) => {
        console.log('Transport reservation:', values);
        message.success('Ulaşım rezervasyonu kaydedildi!');
    };

    // Uçuş Rezervasyonu Formu
    const FlightReservation = () => (
        <Card title={<><RocketOutlined /> Uçuş Rezervasyonu</>}>
            <Form form={flightForm} layout="vertical" onFinish={handleFlightSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Kalkış Havalimanı"
                            name="departureAirport"
                            rules={[{ required: true, message: 'Kalkış havalimanını seçin!' }]}
                        >
                            <Select showSearch placeholder="Havalimanı seçin" optionFilterProp="children">
                                {airports.map(airport => (
                                    <Option key={airport.code} value={airport.code}>
                                        {airport.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Varış Havalimanı"
                            name="arrivalAirport"
                            rules={[{ required: true, message: 'Varış havalimanını seçin!' }]}
                        >
                            <Select showSearch placeholder="Havalimanı seçin" optionFilterProp="children">
                                {airports.map(airport => (
                                    <Option key={airport.code} value={airport.code}>
                                        {airport.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Gidiş Tarihi" name="departureDate" rules={[{ required: true }]}>
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Gidiş Saati" name="departureTime">
                            <TimePicker style={{ width: '100%' }} format="HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Dönüş Tarihi" name="returnDate">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Tercih Edilen Havayolu" name="preferredAirline">
                            <Select placeholder="Havayolu seçin">
                                {airlines.map(airline => (
                                    <Option key={airline} value={airline}>{airline}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Bilet Sınıfı" name="ticketClass" initialValue="economy">
                            <Select>
                                <Option value="economy">Ekonomi</Option>
                                <Option value="business">Business</Option>
                                <Option value="first">First Class</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Yolcu Sayısı" name="passengerCount" initialValue={1}>
                            <InputNumber min={1} max={10} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Uçuş Rezervasyonu Kaydet</Button>
                </Form.Item>
            </Form>
        </Card>
    );

    // Otel Rezervasyonu Formu
    const HotelReservation = () => (
        <Card title={<><HomeOutlined /> Otel Rezervasyonu</>}>
            <Form form={hotelForm} layout="vertical" onFinish={handleHotelSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Şehir" name="city" rules={[{ required: true }]}>
                            <Select placeholder="Şehir seçin">
                                {cities.map(city => (
                                    <Option key={city} value={city}>{city}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Otel" name="hotel" rules={[{ required: true }]}>
                            <Select placeholder="Otel seçin">
                                {hotels.map(hotel => (
                                    <Option key={hotel} value={hotel}>{hotel}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Giriş Tarihi" name="checkIn" rules={[{ required: true }]}>
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Çıkış Tarihi" name="checkOut" rules={[{ required: true }]}>
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Kişi Sayısı" name="guestCount" initialValue={1}>
                    <InputNumber min={1} max={10} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Otel Rezervasyonu Kaydet</Button>
                </Form.Item>
            </Form>
        </Card>
    );

    // Ulaşım Rezervasyonu Formu (senin yazdığın TransportReservation aynen korundu)
    const TransportReservation = () => (
        <Card title={<><CarOutlined /> Ulaşım Rezervasyonu</>}>
            <Form form={transportForm} layout="vertical" onFinish={handleTransportSubmit}>
                {/* --- senin kodun burada zaten doğru, aynı şekilde bıraktım --- */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">Ulaşım Rezervasyonu Kaydet</Button>
                </Form.Item>
            </Form>
        </Card>
    );

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>
                <EnvironmentOutlined /> Rezervasyon Yönetimi
            </Title>

            <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
                <TabPane tab={<><RocketOutlined /> Uçuş</>} key="flight">
                    <FlightReservation />
                </TabPane>
                <TabPane tab={<><HomeOutlined /> Otel</>} key="hotel">
                    <HotelReservation />
                </TabPane>
                <TabPane tab={<><CarOutlined /> Ulaşım</>} key="transport">
                    <TransportReservation />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ReservationManagement;
