# Jornadas de usuario

### Acesso Inicial e Visão Geral da Saúde do Sistema
  
```mermaid
graph TD
    A[Usuário acessa URL da aplicação] --> B{Tela de Login exibida}
    B --> C[Usuário insere credenciais mockadas]
    C --> D[Clica no botão Entrar]
    D -- Validação (simulada) OK --> E[Sistema exibe o MainLayout]
    E --> F[Página Dashboard é carregada por padrão]
    F --> G[Usuario visualiza KPIs principais<br>Saúde Geral, Incidentes Abertos, Severidade Alta]
    G --> H[Usuário observa a lista de<br>Incidentes Críticos Abertos]
    H --> I[Usuário verifica a lista de<br>Status dos Serviços Chave]
    I --> J[Usuário lê o Resumo da IA]
    J --> K(Usuário tem uma visão geral da saúde do sistema)
```
  
### Investigação Detalhada de Incidentes

```mermaid
graph TD
    A[Usuário logado no MainLayout] --> B[Clica no item Incidentes no Menu Lateral];
    B --> C[Sistema exibe a IncidentListPage];
    C --> D[Usuário visualiza a tabela de incidentes e os filtros];
    D --> E{Aplica filtros?};
    E -- Sim --> F[Tabela de incidentes é atualizada com os filtros];
    E -- Não --> F;
    F --> G[Usuário identifica e clica no título de um incidente];
    G --> H[Sistema exibe a IncidentDetailPage<br>para o incidente selecionado];
    H --> I[Usuário analisa:<br>- Resumo do Incidente<br>- Análise da IA<br>- Métricas Correlacionadas<br>- Logs Correlacionados];
    I --> J{Usuário clica no botão Voltar};
    J --> K[Sistema retorna para a página Dashboard<br>Comportamento atual do handleBack];
    K --> L(Investigação do incidente específico concluída ou pausada);
    I -- Continua análise --> L;
```
  
### Consulta Rápida de Saúde de Serviço via Chat AIOps
  
```mermaid
graph TD
    A[Usuário logado no MainLayout] --> B[Clica no item Chat AIOps no Menu Lateral];
    B --> C[Sistema exibe a ChatPage];
    C --> D[Usuário vê a saudação inicial do Bot];
    D --> E[Usuário digita uma pergunta<br>ex: saúde api-pagamentos ou listar serviços];
    E --> F[Clica no botão Enviar ou pressiona Enter];
    F --> G[Mensagem do usuário é adicionada à conversa];
    G --> H[Sistema Bot mockado processa a pergunta];
    H --> I[Mensagem do Bot com a resposta é adicionada à conversa];
    I --> J(Usuário obtém a informação sobre a saúde do serviço);
    I --> K{Usuário faz outra pergunta?};
    K -- Sim --> E;
    K -- Não --> L(Usuário navega para outra página ou encerra a consulta);
```

### Encerramento da Sessão (Logoff)
  
```mermaid
graph TD
    A[Usuário logado no MainLayout] --> B[Localiza seu nome/avatar e o botão Sair no Header];
    B --> C[Clica no botão Sair];
    C --> D[Sistema processa o logoff<br>estado isLoggedIn é definido como false];
    D --> E[Sistema exibe a LoginPage];
    E --> F(Usuário é desconectado da plataforma);
```