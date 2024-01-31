// Pages.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ToDoList from '../pages/ToDoList';
import { useMsalEffect } from '../utils/msalUtils';

const Pages = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todolist" element={<ToDoList />} /> 
        </Routes>
        </BrowserRouter>
    );
};

export default Pages;
