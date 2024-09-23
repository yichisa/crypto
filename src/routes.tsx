import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CoinDetail from './components/Coins/CoinDetail';
import Watchlist from './pages/WatchlistPage';
import PrivateRoute from './utils/PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/watchlist" element={<PrivateRoute element={<Watchlist />} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
