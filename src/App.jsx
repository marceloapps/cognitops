import React, { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import MainLayout from './MainLayout';
import LoginPage from './LoginPage';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    // Função para fazer logoff
    const handleLogoff = () => {
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLoginSuccess} />;
    }

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            {/* Passa a função onLogoff e um userName mockado */}
            <MainLayout userName="admin" onLogoff={handleLogoff} />
        </ConfigProvider>
    );
};

export default App;