import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Row, Col, Card, Input, Select, DatePicker, Space, Tooltip } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import IncidentList from './IncidentList'; // Importa a lista ROBUSTA
import mockIncidentsData from './mockIncidentsData'; // Importa os dados

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const IncidentListPage = ({ onSelectIncident }) => {
    // Estados para os filtros
    const [searchText, setSearchText] = useState('');
    const [severities, setSeverities] = useState([]);
    const [statuses, setStatuses] = useState([]);
    // const [dateRange, setDateRange] = useState(null); // Para o futuro

    // Estado para a lista final filtrada
    const [filteredIncidents, setFilteredIncidents] = useState([]);

    // Garante que a lista base 'allIncidents' seja estável (só calcula uma vez)
    const allIncidents = useMemo(() => Object.values(mockIncidentsData || {}), []);

    // ================================================================= //
    // ============ O EFEITO QUE APLICA OS FILTROS ===================== //
    // ================================================================= //
    useEffect(() => {
        console.log("useEffect [Filtros] rodando..."); // Log para depurar se precisar

        let data = allIncidents;

        // Aplica filtro de texto (em title e service)
        if (searchText) {
            const lowerSearchText = searchText.toLowerCase();
            data = data.filter(inc =>
                inc.title.toLowerCase().includes(lowerSearchText) ||
                inc.service.toLowerCase().includes(lowerSearchText)
            );
        }

        // Aplica filtro de severidade
        if (severities && severities.length > 0) {
            data = data.filter(inc => severities.includes(inc.severity));
        }

        // Aplica filtro de status
         if (statuses && statuses.length > 0) {
            data = data.filter(inc => statuses.includes(inc.status));
        }

        // TODO: Adicionar filtro de data aqui se necessário

        setFilteredIncidents(data); // Atualiza a lista final que será exibida

    }, [searchText, severities, statuses, allIncidents]); // <-- RODA SÓ QUANDO ESTES MUDAM
    // ================================================================= //

    // Handlers que SÓ atualizam o estado do filtro, disparando o useEffect
    const handleSearchChange = (e) => {
        setSearchText(e.target.value || '');
    };

    const handleSeverityChange = (values) => {
        setSeverities(values || []);
    };

     const handleStatusChange = (values) => {
        setStatuses(values || []);
    };

    return (
        <div>
            <Title level={2}>Gerenciamento de Incidentes</Title>
            {/* Card de Filtros */}
            <Card style={{ marginBottom: 24 }} bodyStyle={{ paddingBottom: '8px' }}>
                <Title level={4} style={{ marginTop: 0 }}><FilterOutlined /> Filtros</Title>
                <Space wrap size="middle" style={{ width: '100%'}}>
                    <Input.Search
                        placeholder="Buscar por Título ou Serviço..."
                        value={searchText}
                        onChange={handleSearchChange}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Tooltip title="Selecione uma ou mais severidades">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: 200 }}
                            placeholder="Severidade"
                            onChange={handleSeverityChange}
                            value={severities}
                        >
                            <Option value="Alta">Alta</Option>
                            <Option value="Média">Média</Option>
                            <Option value="Baixa">Baixa</Option>
                        </Select>
                    </Tooltip>
                    <Tooltip title="Selecione um ou mais status">
                         <Select
                            mode="multiple"
                            allowClear
                            style={{ width: 200 }}
                            placeholder="Status"
                            onChange={handleStatusChange}
                            value={statuses}
                        >
                            <Option value="Aberto">Aberto</Option>
                            <Option value="Investigando">Investigando</Option>
                            <Option value="Fechado">Fechado</Option>
                        </Select>
                    </Tooltip>
                    <RangePicker placeholder={['Data Início', 'Data Fim']} />
                </Space>
            </Card>

            {/* Card da Tabela */}
            <Card title={`Incidentes Encontrados (${filteredIncidents.length})`}>
                <IncidentList incidents={filteredIncidents} onSelectIncident={onSelectIncident} />
            </Card>
        </div>
    );
};

export default IncidentListPage;