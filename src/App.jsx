// App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import PageLayout from './components/PageLayout';
import Pages from './components/Pages';  // Import the Pages component
import './styles/App.css';

function App() {

    return (
            <PageLayout>
                <Pages />
            </PageLayout>
    );
};

export default App;
