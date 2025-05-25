import React, { useMemo } from 'react'; // <-- IMPORTA useMemo
import { Table, Tag } from 'antd';

const getTagColor = (text) => {
    switch (String(text).toLowerCase()) {
        case 'alta': return 'volcano';
        case 'média': return 'orange';
        case 'baixa': return 'geekblue';
        case 'aberto': return 'red';
        case 'investigando': return 'gold';
        case 'fechado': return 'green';
        default: return 'default';
    }
};

const IncidentList = ({ incidents, onSelectIncident }) => {
    console.log("--- RENDERIZANDO IncidentList ROBUSTO (Table) ---", incidents);

    // Define 'columns' usando useMemo para estabilizar
    const columns = useMemo(() => [
        {
            title: 'Severidade', dataIndex: 'severity', key: 'severity',
            render: (text) => <Tag color={getTagColor(text)}>{String(text).toUpperCase()}</Tag>,
            // SORTER E FILTERS REMOVIDOS TEMPORARIAMENTE
        },
        {
            title: 'Incidente', dataIndex: 'title', key: 'title',
            render: (text, record) => (<a onClick={() => onSelectIncident(record.id)}>{text}</a>),
            // SORTER REMOVIDO
        },
        { title: 'Serviço Afetado', dataIndex: 'service', key: 'service' },
        {
            title: 'Status', dataIndex: 'status', key: 'status',
            render: (text) => <Tag color={getTagColor(text)}>{text}</Tag>,
            // FILTERS REMOVIDO
        },
        { title: 'Início', dataIndex: 'time', key: 'time' },
    ], [onSelectIncident]); // Depende apenas de onSelectIncident (que deve ser estável)

    // Define 'dataSource' usando useMemo
    const dataSource = useMemo(() =>
        incidents.map(inc => ({ ...inc, key: inc.id })),
    [incidents]); // Só recalcula se 'incidents' mudar

    return (
        <div style={{ overflowX: 'auto' }}>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 10, showSizeChanger: true }}
                size="small"
                loading={!incidents} // Mostra 'loading' se não houver dados
            />
        </div>
    );
};

export default IncidentList;