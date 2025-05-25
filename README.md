# Plataforma de Correlação Inteligente AIOps (Frontend)

Este é o frontend da Plataforma de Correlação Inteligente AIOps, desenvolvido com React e servido via Nginx em um container Docker.

## Visão Geral

A aplicação permite que os usuários visualizem e gerenciem incidentes de TI, com um dashboard principal, listagem de incidentes e visualização de detalhes. O acesso é controlado por um sistema de login simples.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

*   [Node.js](https://nodejs.org/) (versão 18.x ou superior, conforme `Dockerfile`)
*   npm (geralmente vem com o Node.js) ou Yarn
*   Docker

## Estrutura de Arquivos Principal

```
aiops-react/
├── Dockerfile             # Define o ambiente Docker para build e execução
├── nginx.conf             # Configuração do Nginx para servir a aplicação
├── package.json           # Metadados do projeto e dependências
├── package-lock.json      # Lockfile para dependências (ou yarn.lock)
├── .dockerignore          # Especifica arquivos a serem ignorados pelo Docker
├── public/                # Contém o index.html base e outros assets estáticos
│   └── index.html
│   └── ...
├── src/                   # Código fonte da aplicação React
│   ├── App.jsx            # Componente raiz, gerencia o estado de login e o tema
│   ├── MainLayout.jsx     # Layout principal após o login (com Sider, Header, Content)
│   ├── LoginPage.jsx      # Componente da página de login
│   ├── DashboardPage.jsx  # Componente para o dashboard de incidentes
│   ├── IncidentDetailPage.jsx # Componente para exibir detalhes de um incidente
│   ├── App.css            # Estilos globais ou específicos do App.jsx
│   ├── index.js           # Ponto de entrada da aplicação React (ou main.jsx)
│   └── ...                # Outros componentes, hooks, serviços, dados mockados, etc.
└── ...                    # Outros arquivos de configuração (ex: .eslintrc.js, vite.config.js)
```

## Configuração e Instalação

1.  **Clone o repositório (se aplicável):**
    ```bash
    git clone <url-do-seu-repositorio>
    cd aiops-react
    ```

2.  **Instale as dependências do projeto:**
    Usando npm:
    ```bash
    npm install
    ```
    Ou usando Yarn:
    ```bash
    yarn install
    ```

## Build e Execução com Docker

O `Dockerfile` fornecido utiliza um build multi-stage para criar uma imagem otimizada com Nginx servindo os arquivos estáticos da aplicação React.

1.  **Construa a imagem Docker:**
    Na raiz do projeto (onde o `Dockerfile` está localizado), execute:
    ```bash
    docker build -t aiops-react-frontend .
    ```
    *   `-t aiops-react-frontend`: Define o nome (tag) da imagem como `aiops-react-frontend`. Você pode escolher outro nome.
    *   `.`: Indica que o contexto do build é o diretório atual.

2.  **Execute o container Docker:**
    Após o build da imagem, execute o container:
    ```bash
    docker run -d -p 8080:80 --name meu-aiops-app aiops-react-frontend
    ```
    *   `-d`: Executa o container em modo "detached" (em segundo plano).
    *   `-p 8080:80`: Mapeia a porta `8080` do seu host para a porta `80` do container (onde o Nginx está escutando). Você pode alterar a porta do host (o `8080`) se necessário.
    *   `--name meu-aiops-app`: Atribui um nome ao container para facilitar o gerenciamento (opcional).
    *   `aiops-react-frontend`: O nome da imagem que você construiu.

3.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:8080`.

### Comandos Docker Úteis

*   **Listar containers em execução:**
    ```bash
    docker ps
    ```
*   **Listar todos os containers (incluindo parados):**
    ```bash
    docker ps -a
    ```
*   **Parar um container:**
    ```bash
    docker stop meu-aiops-app
    ```
*   **Remover um container:**
    ```bash
    docker rm meu-aiops-app
    ```
*   **Ver logs de um container:**
    ```bash
    docker logs meu-aiops-app
    ```
*   **Listar imagens Docker:**
    ```bash
    docker images
    ```
*   **Remover uma imagem Docker:**
    ```bash
    docker rmi aiops-react-frontend
    ```

## Desenvolvimento Local (Sem Docker)

Para desenvolvimento e testes rápidos, você pode rodar a aplicação localmente usando o servidor de desenvolvimento do React (geralmente provido pelo Vite ou Create React App).

1.  **Inicie o servidor de desenvolvimento:**
    Usando npm:
    ```bash
    npm run dev
    ```
    (Ou `npm start` dependendo da configuração do seu `package.json`)

    Usando Yarn:
    ```bash
    yarn dev
    ```
    (Ou `yarn start`)

2.  A aplicação geralmente estará disponível em `http://localhost:5173` (Vite) ou `http://localhost:3000` (Create React App). Verifique o output do console para a URL exata.

## Tecnologias Utilizadas

*   **React**: Biblioteca JavaScript para construir interfaces de usuário.
*   **Ant Design (AntD)**: Biblioteca de componentes UI para React.
*   **Node.js**: Ambiente de execução JavaScript para o estágio de build.
*   **Nginx**: Servidor web de alta performance para servir os arquivos estáticos em produção.
*   **Docker**: Plataforma de containerização.

---

*Sinta-se à vontade para adicionar mais seções ou detalhes específicos do seu projeto!*