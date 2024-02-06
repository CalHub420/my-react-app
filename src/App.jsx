// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  

import Home from "./pages/Home";
import PageLayout from './components/PageLayout';
import SubmissionForm from './pages/SubmissionForm';
import Admin from "./pages/Admin";
import './styles/App.css';

function App() {
    return (
        <Router>
            <PageLayout>
                <Routes> 
                    <Route path="/home" element={<Home />} />
                    <Route path="/submission-form" element={<SubmissionForm />} />
                    <Route path="/admin-view" element={<Admin />} />
                </Routes>
            </PageLayout>
        </Router>
    );
}

export default App;
