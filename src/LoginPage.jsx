import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Row, Col, Alert } from 'antd';
import { UserOutlined, LockOutlined, RadarChartOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoginPage = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (values) => {
        setLoading(true);
        setError('');

        // Simula uma chamada de API
        setTimeout(() => {
            // Em um login real, você validaria values.username e values.password
            // Aqui, qualquer coisa (ou nada) funciona, mas vamos simular um check.
            if (values.username == "admin" && values.password == "1234") {
                 console.log('Login simulado com sucesso:', values);
                 onLogin(); // Chama a função passada pelo App.jsx
            } else {
                 setError('Usuário ou senha incorretos. Favor validar e tentar novamente.');
                 setLoading(false);
            }
            // Não precisa setar loading para false no sucesso, pois a tela vai mudar
        }, 1000); // 1 segundo de delay para simular a rede
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#001529' }}>
            <Col xs={22} sm={16} md={12} lg={8} xl={6}>
                <Card>
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                         <RadarChartOutlined style={{ fontSize: '48px', color: '#1677ff' }} />
                         <Title level={2}>CognitOps</Title>
                    </div>

                    <Form
                        name="aiops_login"
                        initialValues={{ remember: true }}
                        onFinish={handleLogin}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: false, message: 'Por favor, insira seu usuário!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Usuário (ex: admin)" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: false, message: 'Por favor, insira sua senha!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Senha (ex: 123)" />
                        </Form.Item>

                         {error && <Alert message={error} type="error" showIcon style={{marginBottom: '16px'}}/>}

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Entrar
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default LoginPage;