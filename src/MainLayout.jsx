import React, { useState } from 'react';
import { Layout, Menu, Typography, theme, Avatar, Space, Button } from 'antd'; // <-- Adicionado Avatar, Space, Button
import {
    DashboardOutlined,
    WarningOutlined,
    SettingOutlined,
    RadarChartOutlined,
    MessageOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import DashboardPage from './DashboardPage';
import IncidentListPage from './IncidentListPage';
import IncidentDetailPage from './IncidentDetailPage';
import ChatPage from './ChatPage';
import mockIncidentsData from './mockIncidentsData';


const { Sider, Content, Header } = Layout;
const { Title, Text } = Typography;

const MainLayout = ({ userName, onLogoff }) => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [selectedIncidentId, setSelectedIncidentId] = useState(null);
    const [collapsed, setCollapsed] = useState(false);

    const { token: { colorBgContainer, borderRadiusLG, colorText } } = theme.useToken(); 

    const handleMenuClick = (e) => { setSelectedIncidentId(null); setCurrentPage(e.key); };
    const handleSelectIncident = (id) => { setSelectedIncidentId(id); setCurrentPage('incidentDetail'); };
    const handleBack = () => { setSelectedIncidentId(null); setCurrentPage('dashboard'); };
    const getPageTitle = () => { 
        if (selectedIncidentId) return `Detalhes: ${selectedIncidentId}`;
        if (currentPage === 'dashboard') return 'CognitOps - Dashboard';
        if (currentPage === 'incidents') return 'CognitOps - Incidentes';
        if (currentPage === 'chat') return 'CognitOps - Chat Assistant';
        if (currentPage === 'settings') return 'CognitOps - Configurações';
        return 'CognitOps';
    };
    const renderContent = () => { 
        console.log("[RenderContent] Início. currentPage:", currentPage, "selectedIncidentId:", selectedIncidentId);
        console.log("[RenderContent] Verificando mockIncidentsData...");
        console.log("[RenderContent] typeof mockIncidentsData:", typeof mockIncidentsData);
        console.log("[RenderContent] mockIncidentsData:", JSON.stringify(mockIncidentsData, null, 2)); // Mostra o objeto formatado
        
        if (selectedIncidentId) { // Só tenta acessar se selectedIncidentId existir
            console.log(`[RenderContent] Tentando acessar mockIncidentsData['${selectedIncidentId}']`);
            console.log("[RenderContent] Valor de mockIncidentsData[selectedIncidentId]:", mockIncidentsData[selectedIncidentId]);
            console.log("[RenderContent] Chaves disponíveis em mockIncidentsData:", Object.keys(mockIncidentsData));
        }                
        if (selectedIncidentId && mockIncidentsData && typeof mockIncidentsData === 'object' && mockIncidentsData[selectedIncidentId]) {
            console.log("[RenderContent] CONDIÇÃO VERDADEIRA! Mostrando IncidentDetailPage para ID:", selectedIncidentId);
            return <IncidentDetailPage incident={mockIncidentsData[selectedIncidentId]} onBack={handleBack} />;
        }
        console.log("[RenderContent] CONDIÇÃO FALHOU. Indo para o switch. currentPage:", currentPage);
        switch (currentPage) {
            case 'incidents': return <IncidentListPage onSelectIncident={handleSelectIncident} />;
            case 'chat': return <ChatPage />;
            case 'settings': return <Title level={2}>Configurações (Não Implementado)</Title>;
            case 'dashboard': default: return <DashboardPage onSelectIncident={handleSelectIncident} />;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: '4px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <RadarChartOutlined style={{ marginRight: collapsed ? 0 : 8 }}/>
                    {!collapsed && " CognitOps"}
                </div>
                <Menu
                    theme="dark"
                    // selectedKeys={[currentPage === 'incidentDetail' ? '' : currentPage]}
                    selectedKeys={[currentPage]}
                    mode="inline"
                    onClick={handleMenuClick}
                    items={[
                        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
                        { key: 'incidents', icon: <WarningOutlined />, label: 'Incidentes' },
                        { key: 'chat', icon: <MessageOutlined />, label: 'Chat AIOps' },
                        { key: 'settings', icon: <SettingOutlined />, label: 'Configurações' },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{
                    background: colorBgContainer,
                    padding: '0 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between' // Para alinhar o título à esquerda e o usuário/logoff à direita
                }}>
                    <Title level={4} style={{ margin: 0, color: colorText /* Usando token para cor do texto */ }}>
                        {getPageTitle()}
                    </Title>
                    <Space> {/* Agrupa os itens do usuário */}
                        <Avatar style={{ backgroundColor: '#1677ff' /* Cor primária do AntD */ }} icon={<UserOutlined />} />
                        <Text style={{ color: colorText /* Usando token */ }}>Olá, {userName}!</Text>
                        <Button type="primary" danger icon={<LogoutOutlined />} onClick={onLogoff}>
                            Sair
                        </Button>
                    </Space>
                </Header>
                <Content style={{ margin: '16px' }}>
                    <div
                        className="site-layout-background"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            padding: 24,
                            minHeight: 'calc(100vh - 160px)',
                        }}
                    >
                        {renderContent()}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;