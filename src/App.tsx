import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/header/Header'; // Adjust the import path as necessary
import FlipCard from './components/card/Card'; // Adjust the import path as necessary
import Dashboard from './pages/Dashboard';
// import Admin from './components/Admin'; // Adjust the import path as necessary
// import Dashboard from './components/Dashboard'; // Adjust the import path as necessary

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FlipCard />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
