import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Dashboard from './Components/Dashboard'; // Import your Dashboard component
import Register from './Components/Register';

function App() {
    return (
        <Router>
            <Routes>
                
                <Route path="/" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
