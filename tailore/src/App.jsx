import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './component/Signin';
import Login from './component/login';
import Dashboard from './component/Dashboard';

const App = () => {
    const [Email, setEmail] = useState('');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setEmail={setEmail} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard Email={Email} />} />
            </Routes>
        </Router>
    );
};

export default App;
