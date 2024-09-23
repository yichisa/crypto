import React from 'react';
import { ThemeProvider } from '@fluentui/react';
import { darkTheme } from './styles/theme';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CoinDetail from './components/Coins/CoinDetail';
import Watchlist from './pages/WatchlistPage';
import PrivateRoute from './utils/PrivateRoute';

initializeIcons();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin/:id" element={<CoinDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/watchlist" element={<PrivateRoute element={<Watchlist />} />} />
          </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
