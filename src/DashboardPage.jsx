import React from 'react';
import { Typography, Row, Col, Card, Statistic, List, Tag, Alert } from 'antd';
import IncidentList from './IncidentListPage';
import mockIncidentsData from './mockIncidentsData';

const { Title, Text } = Typography;

const allIncidents = Object.values(mockIncidentsData);

const serviceStatus = [
    { name: 'API Pagamentos', status: 'Degradado', health: 'warning' },
    { name: 'Serviço Carrinho', status: 'Instável', health: 'error' },
    { name: 'Serviço Estoque', status: 'Operacional', health: 'success' },
    { name: 'Auth Service', status: 'Operacional', health: 'success' },
    { name: 'Database Principal', status: 'Operacional', health: 'success' },
];

const getHealthColor = (status) => {
    if (status === 'error') return 'red';
    if (status === 'warning') return 'orange';
    return 'green';
}

const DashboardPage = ({ onSelectIncident }) => {
    const openIncidents = allIncidents.filter(inc => inc.status === 'Aberto' || inc.status === 'Investigando').length;
    const highSeverity = allIncidents.filter(inc => inc.severity === 'Alta' && inc.status !== 'Fechado').length;
    const criticalIncidents = allIncidents.filter(inc => inc.severity === 'Alta' && inc.status === 'Aberto');

    return (
        <div>
            <Title level={2}>Dashboard - Saúde geral dos serviços</Title>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}> {/* Adicionado gutter vertical */}
                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic title="Saúde Geral" value="97.2%" valueStyle={{ color: '#ff9800' }} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic title="Incidentes Abertos" value={openIncidents} valueStyle={{ color: '#f44336' }} />
                    </Card>
                </Col>
                 <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic title="Severidade Alta Ativos" value={highSeverity} valueStyle={{ color: '#f44336' }} />
                    </Card>
                </Col>
            </Row>

             <Row gutter={[16, 16]}>
                 <Col xs={24} md={12}>
                    <Card title="Status dos Serviços Chave" style={{ minHeight: '300px' }}>
                         <List
                            dataSource={serviceStatus}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta title={item.name} />
                                    <Tag color={getHealthColor(item.health)}>{item.status}</Tag>
                                </List.Item>
                            )}
                        />
                    </Card>
                 </Col>
                  <Col xs={24} md={12}>
                     <Card title="Resumo da IA" style={{ minHeight: '150px', marginBottom: 16 }}>
                         <Alert
                            message="Análise AIOps"
                            description="Detectada correlação entre Erros 5xx no Carrinho e o deploy v2.5.1. Ação de Rollback sugerida."
                            type="warning"
                            showIcon
                        />
                    </Card>
                    <Card title="Incidentes Críticos Abertos" style={{ minHeight: '134px' }}>
                        {criticalIncidents.length > 0 ? (
                           <List
                                size="small"
                                dataSource={criticalIncidents}
                                renderItem={item => (
                                    <List.Item>
                                        <a onClick={() => onSelectIncident(item.id)}>{item.title} ({item.service})</a>
                                    </List.Item>
                                )}
                           />
                        ) : (
                            <Text>Nenhum incidente crítico aberto.</Text>
                        )}
                    </Card>
                 </Col>
             </Row>
        </div>
    );
};

export default DashboardPage;