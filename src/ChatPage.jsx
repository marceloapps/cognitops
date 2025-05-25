import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar, Space, Card, Typography, theme } from 'antd'; // <-- IMPORTA 'theme' do antd
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography; // Adicionado Text e Paragraph para melhor controle de cor

// Dados mockados de saúde (pode vir de mockData.js se preferir)
const mockServiceHealth = {
    'api-pagamentos': { status: 'Degradado', details: 'Latência Alta detectada (INC001).' },
    'svc-carrinho': { status: 'Instável', details: 'Erros 5xx detectados (INC002).' },
    'db-pedidos-master': { status: 'Degradado', details: 'CPU Alta detectada (INC003).' },
    'auth-service': { status: 'Operacional', details: 'Nenhum incidente ativo.' },
    'svc-estoque': { status: 'Operacional', details: 'Nenhum incidente ativo.' },
};

const ChatPage = () => {
    const { token } = theme.useToken();

    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Olá! Como posso ajudar a verificar a saúde dos serviços hoje?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const listEndRef = useRef(null);

    useEffect(() => {
        listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        const userMessage = inputValue.trim();
        if (!userMessage) return;

        const newMessages = [...messages, { sender: 'user', text: userMessage }];
        setMessages(newMessages);
        setInputValue('');

        setTimeout(() => {
            const botResponse = getBotResponse(userMessage.toLowerCase());
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
        }, 800);
    };

    const getBotResponse = (query) => {
        const services = Object.keys(mockServiceHealth);
        const foundServiceKey = services.find(key => {
            const keyLower = key.toLowerCase(); // ex: "api-pagamentos"
            const keySpacedLower = key.replace(/-/g, ' ').toLowerCase(); // ex: "api pagamentos"
    
            // Verifica se a query do usuário contém alguma das formas do nome do serviço
            return query.includes(keyLower) || query.includes(keySpacedLower);
        });
        
        if (foundServiceKey) {
            const health = mockServiceHealth[foundServiceKey]; // Usa a chave original para pegar os dados
            return `O serviço '${foundServiceKey}' está atualmente ${health.status}.\nDetalhes: ${health.details}`;
        }        

        if (query.includes('listar') || query.includes('todos os serviços')) {
            return `Serviços monitorados: ${services.join(', ')}. Qual você gostaria de checar?`;
        }

        if (query.includes('olá') || query.includes('oi')) {
             return 'Olá! Em que posso ajudar? Você pode perguntar sobre a saúde de um serviço específico (ex: "saúde api pagamentos") ou "listar serviços".';
        }
        return "Desculpe, não entendi. Tente perguntar 'listar serviços' ou 'qual a saúde de [nome_serviço]?'.";
    };

    return (
        <Card
            title={
                <Title level={3} style={{ margin: 0, color: token.colorTextHeading }}> {/* Usa cor do token */}
                    <RobotOutlined /> CognitOps Chat Assist
                </Title>
            }
            style={{ background: token.colorBgElevated, border: `1px solid ${token.colorBorderSecondary}` }} // <-- FUNDO DO CARD COM TOKEN
        >
            <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 300px)' /* Ajuste conforme necessário */ }}>
                <List
                    itemLayout="horizontal"
                    dataSource={messages}
                    style={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        padding: '16px',
                        background: token.colorFillQuaternary, // <-- FUNDO DA LISTA COM TOKEN
                        borderRadius: token.borderRadiusLG,
                    }}
                    renderItem={(item) => (
                        <List.Item style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}> {/* BORDA COM TOKEN */}
                            <List.Item.Meta
                                avatar={
                                    item.sender === 'bot' ?
                                    <Avatar icon={<RobotOutlined />} style={{ backgroundColor: token.colorPrimary }} /> : // Usa cor primária do tema
                                    <Avatar icon={<UserOutlined />} style={{ backgroundColor: token.colorTextQuaternary}}/> // Cor sutil para avatar do usuário
                                }
                                title={
                                    <Text strong style={{ color: token.colorText }}> {/* COR DO TEXTO COM TOKEN */}
                                        {item.sender === 'bot' ? 'Cognito Bot' : 'Você'}
                                    </Text>
                                }
                                description={
                                    <Paragraph style={{ whiteSpace: 'pre-wrap', color: token.colorTextSecondary, marginBottom: 0 }}> {/* COR DO TEXTO COM TOKEN */}
                                        {item.text}
                                    </Paragraph>
                                }
                            />
                        </List.Item>
                    )}
                >
                  <div ref={listEndRef} />
                </List>
                <div style={{ paddingTop: '16px', borderTop: `1px solid ${token.colorBorderSecondary}` }}> {/* BORDA COM TOKEN */}
                    <Space.Compact style={{ width: '100%' }}>
                         <Input
                            placeholder="Pergunte sobre um serviço..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onPressEnter={handleSendMessage}
                            size="large"
                        />
                        <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} size="large" />
                    </Space.Compact>
                </div>
            </div>
        </Card>
    );
};

export default ChatPage;