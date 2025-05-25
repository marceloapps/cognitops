// ================================================================= //
// ============ DADOS MOCKADOS COMPLETOS =========================== //
// ================================================================= //
const mockIncidentsData = {
    "INC001": {
        id: "INC001",
        title: "Latência Alta na API de Pagamentos",
        severity: "Alta",
        status: "Aberto",
        service: "api-pagamentos",
        time: "Hoje, 10:35",
        ai_rca: {
            confidence: 85,
            cause: "Sobrecarga no serviço 'auth-service' devido a aumento súbito de requisições, causando timeouts em cascata na 'api-pagamentos'.",
            factors: [
                "Pico de logins às 10:33 (Logs Splunk)",
                "Aumento da latência >2000ms no 'auth-service' (Métricas Prometheus)",
                "Erros de 'Connection Timeout' na 'api-pagamentos' (Logs Splunk)."
            ],
            action: "Escalar horizontalmente o 'auth-service' e investigar a origem do pico de requisições."
        },
        metrics: [
            { name: "Latência API Pagamentos (ms)", values: [50, 60, 55, 70, 65, 80, 75, 1500, 2500, 2300] },
            { name: "CPU Auth-Service (%)", values: [30, 35, 33, 40, 38, 45, 95, 98, 99, 97] },
            { name: "Erros 5xx API Pagamentos", values: [0, 0, 1, 0, 2, 5, 8, 15, 22, 20] }
        ],
        logs: `[10:33:01 INFO] svc-login: User 'user123' logged in from 192.168.1.10.
[10:33:05 INFO] svc-login: User 'user456' logged in from 10.0.0.55.
[10:34:50 WARN] auth-service: High CPU load detected: 95%. Throttling may occur.
[10:35:10 ERROR] api-pagamentos: Timeout calling auth-service for transaction_id=xyz1. Upstream timeout: 2000ms.
[10:35:15 ERROR] api-pagamentos: Timeout calling auth-service for transaction_id=xyz2. Upstream timeout: 2000ms.
[10:35:22 WARN] auth-service: Latency spike: 2100ms. Current replicas: 3.
[10:35:30 ERROR] api-pagamentos: Timeout calling auth-service for transaction_id=xyz3. Upstream timeout: 2000ms.
[10:35:31 INFO] api-pagamentos: Retrying transaction_id=xyz1...
[10:35:36 ERROR] api-pagamentos: Retry failed for transaction_id=xyz1. Final error.`
    },
    "INC002": {
        id: "INC002",
        title: "Erros 5xx no Serviço de Carrinho",
        severity: "Média",
        status: "Investigando",
        service: "svc-carrinho",
        time: "Hoje, 09:15",
        ai_rca: {
            confidence: 70,
            cause: "Novo deploy (v2.5.1) do 'svc-carrinho' introduziu um bug ao consultar o 'svc-estoque' com IDs inválidos.",
            factors: [
                "Início dos erros 500 às 09:14 (Logs Splunk)",
                "Deploy v2.5.1 às 09:10 (Jenkins)",
                "Logs do 'svc-estoque' mostrando 'Invalid ID format' (Splunk)."
            ],
            action: "Realizar rollback para a versão v2.5.0 do 'svc-carrinho'."
        },
        metrics: [
            { name: "Erros 5xx - svc-carrinho", values: [1, 0, 2, 1, 50, 150, 180, 175, 160, 155] },
            { name: "Latência svc-estoque (ms)", values: [40, 45, 42, 43, 40, 41, 44, 42, 45, 41] },
            { name: "Requisições svc-carrinho", values: [120, 130, 125, 135, 140, 138, 142, 139, 145, 141] }
        ],
        logs: `[09:10:05 INFO] jenkins: Deploy v2.5.1 for svc-carrinho started by 'devops_user'.
[09:12:30 INFO] jenkins: Deploy v2.5.1 for svc-carrinho successful.
[09:14:15 ERROR] svc-carrinho: Failed to add item to cart for user_id=789. Internal Server Error. TraceID: abc1.
[09:14:18 WARN] svc-estoque: Received query with Invalid ID format: 'ITEM_ABC_'. Expected format: 'ITEM_123'. TraceID: abc1.
[09:14:25 ERROR] svc-carrinho: Failed to add item to cart for user_id=101. Internal Server Error. TraceID: abc2.
[09:14:28 WARN] svc-estoque: Received query with Invalid ID format: 'ITEM_DEF_'. Expected format: 'ITEM_123'. TraceID: abc2.
[09:15:01 ERROR] svc-carrinho: Failed to update cart for user_id=555. Internal Server Error. TraceID: abc3.`
    },
     "INC003": {
        id: "INC003",
        title: "Consumo de CPU anormal no BD",
        severity: "Média",
        status: "Investigando",
        service: "db-pedidos-master",
        time: "Ontem, 22:40",
        ai_rca: {
            confidence: 65,
            cause: "Query ineficiente executada por um job batch noturno ('report-generator') está causando lock contention e alto consumo de CPU.",
            factors: [
                "Pico de CPU no BD às 22:40 (Prometheus)",
                "Início do job 'report-generator' às 22:38 (Logs App)",
                "Aumento de 'Lock Wait Time' no BD (Métricas Prometheus)."
            ],
            action: "Otimizar a query do 'report-generator' ou alterar seu agendamento."
        },
        metrics: [
            { name: "CPU db-pedidos-master (%)", values: [20, 22, 25, 88, 92, 90, 85, 30, 28, 26] },
            { name: "Lock Wait Time (ms)", values: [10, 15, 12, 500, 800, 750, 600, 20, 18, 14] },
            { name: "Active Connections", values: [50, 55, 52, 150, 160, 155, 140, 60, 58, 56] }
        ],
        logs: `[22:38:00 INFO] scheduler: Starting job 'report-generator'.
[22:40:15 WARN] db-pedidos-master: High CPU usage detected: 88%.
[22:40:30 INFO] report-generator: Processing batch 1/100...
[22:41:00 WARN] db-pedidos-master: Query running for 45s: SELECT * FROM huge_table WHERE date_col < NOW() - INTERVAL '1 year' ...
[22:41:15 WARN] db-pedidos-master: High Lock Wait Time: 500ms. Blocker SID: 1234. Waiting SID: 5678.
[22:41:30 INFO] report-generator: Processing batch 2/100...
[22:42:05 WARN] db-pedidos-master: Query running for 90s: SELECT * FROM huge_table ...
[22:45:00 INFO] report-generator: Job 'report-generator' finished with some warnings.`
    }
};

export default mockIncidentsData;
// ================================================================= //