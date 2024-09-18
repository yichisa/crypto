// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CoinDetail from './components/Coins/CoinDetail';
import Watchlist from './components/Watchlist/Watchlist';
import PrivateRoute from './utils/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      {/* Move the "Live Coin Tracker" header above the NavBar */}
      <div className="bg-gradient-to-b from-gray-800 to-black min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Live Coin Tracker</h1>
      <Navbar />

      {/* Main routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={<PrivateRoute element={<Watchlist />} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
