import React from 'react';
import { ThemeProvider } from '@fluentui/react';
import { darkTheme } from './styles/theme';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CoinDetail from './components/Coins/CoinDetail';
import Watchlist from './components/Watchlist/Watchlist';
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
