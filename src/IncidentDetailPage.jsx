import React from 'react';
import {
    Card,
    Typography,
    Tag,
    Row,
    Col,
    Tabs,
    Button,
    List,
    Alert,
    Progress
} from 'antd';
import { ArrowLeftOutlined, RobotOutlined, BarChartOutlined, FileTextOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const getTagColor = (text) => {
     switch (text.toLowerCase()) {
        case 'alta': return 'volcano';
        case 'média': return 'orange';
        case 'baixa': return 'geekblue';
        default: return 'default';
    }
};

// Componente Simples para simular logs
const MockLogs = ({ logs }) => (
    <pre style={{
        backgroundColor: '#000',
        color: '#0f0',
        padding: '15px',
        borderRadius: '4px',
        maxHeight: '300px',
        overflowY: 'auto',
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap', // Para quebrar linha
        wordWrap: 'break-word'
    }}>
        {logs.split('\n').map((line, index) => {
            let color = '#0f0'; // Verde padrão
            if (line.includes('ERROR')) color = '#f00'; // Vermelho
            else if (line.includes('WARN')) color = '#ff0'; // Amarelo
            return <span key={index} style={{ color: color, display: 'block' }}>{line}</span>;
        })}
    </pre>
);

// Componente Simples para simular métricas
const MockMetrics = ({ metrics }) => (
    <div>
        {metrics.map((metric, index) => (
            <Card key={index} title={metric.name} size="small" style={{ marginBottom: 16 }}>
                 {/* Apenas mostrando a última métrica como uma barra de progresso */}
                 <Progress
                    percent={Math.min(100, metric.values[metric.values.length - 1] / (metric.name.includes('ms') ? 30 : 1))}
                    status={metric.values[metric.values.length - 1] > 80 ? 'exception' : 'normal'}
                 />
                 <Text type="secondary">Valores (mock): {metric.values.join(', ')}</Text>
            </Card>
        ))}
    </div>
);


const IncidentDetailPage = ({ incident, onBack }) => {
    if (!incident) {
        return <Alert message="Incidente não encontrado." type="error" />;
    }

    return (
        <div>
            <Button
                icon={<ArrowLeftOutlined />}
                onClick={onBack}
                style={{ marginBottom: 16 }}
            >
                Voltar ao Dashboard
            </Button>

            <Card style={{ marginBottom: 24 }}>
                <Row align="middle">
                    <Col flex="auto">
                        <Title level={3} style={{ margin: 0 }}>
                            {incident.title} ({incident.id})
                        </Title>
                        <Text type="secondary">Serviço: {incident.service} | Início: {incident.time}</Text>
                    </Col>
                    <Col>
                         <Tag color={getTagColor(incident.severity)} style={{ fontSize: '14px', padding: '5px 10px' }}>
                             {incident.severity}
                         </Tag>
                          <Tag color={incident.status === 'Aberto' ? 'red' : 'gold'} style={{ fontSize: '14px', padding: '5px 10px' }}>
                             {incident.status}
                         </Tag>
                    </Col>
                </Row>
            </Card>

            <Card
                title={<span><RobotOutlined /> Análise da IA</span>}
                style={{ marginBottom: 24 }}
                extra={<Tag color="blue">Confiança: {incident.ai_rca.confidence}%</Tag>}
            >
                <Paragraph>
                    <strong>Causa Raiz Provável:</strong> {incident.ai_rca.cause}
                </Paragraph>
                 <Paragraph>
                    <strong>Fatores Correlacionados:</strong>
                    <List
                        size="small"
                        dataSource={incident.ai_rca.factors}
                        renderItem={item => <List.Item>- {item}</List.Item>}
                    />
                </Paragraph>
                 <Paragraph>
                    <strong>Ação Sugerida:</strong> <Text strong type="warning">{incident.ai_rca.action}</Text>
                </Paragraph>
            </Card>

            <Card title="Dados Correlacionados">
                 <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={<span><BarChartOutlined /> Métricas</span>}
                        key="1"
                    >
                       <MockMetrics metrics={incident.metrics} />
                    </TabPane>
                    <TabPane
                        tab={<span><FileTextOutlined /> Logs</span>}
                        key="2"
                    >
                        <MockLogs logs={incident.logs} />
                    </TabPane>
                 </Tabs>
            </Card>
        </div>
    );
};

export default IncidentDetailPage;