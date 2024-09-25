import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stack, Text, useTheme } from '@fluentui/react';
import { getLogoTextStyle } from '../../styles/styles';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();

  const getLinkStyle = (path: string) => ({
    textDecoration: 'none',
    padding: '10px 15px',
    borderBottom: location.pathname === path ? `2px solid ${theme.palette.themePrimary}` : 'none',
    transition: 'border-bottom 0.3s ease',
    display: 'flex',
    alignItems: 'center',
  });

  const getTextStyle = (path: string) => ({
    root: {
      color: location.pathname === path ? theme.palette.themePrimary : theme.palette.white,
      transition: 'color 0.3s ease',
      selectors: {
        ':hover': {
          color: theme.palette.themePrimary,
        },
      },
    },
  });

  const navItems = [
    { path: '/', label: 'Coins' },
    { path: '/exchanges', label: 'Exchanges' },
    { path: '/trending', label: 'Trending' },
    { path: '/watchlist', label: 'Watchlist' },
    { path: '/portfolio', label: 'Portfolio' },
  ];

  const registerStyle = {
    root: {
      backgroundColor: theme.palette.themePrimary,
      padding: '5px 15px',
      borderRadius: '10px',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '40px',
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralLighter,
          color: theme.palette.themePrimary,
        },
      },
    },
  };

  const loginStyle = {
    root: {
      color: theme.palette.themePrimary,
      transition: 'color 0.3s ease',
      selectors: {
        ':hover': {
          color: theme.palette.themePrimary,
        },
      },
    },
  };

  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      styles={{
        root: {
          backgroundColor: theme.palette.neutralLight,
          padding: '10px 20px',
        },
      }}
    >
      <Link to="/">
        <Text variant="xxLarge" styles={getLogoTextStyle(theme)}>
          Live Coin Tracker
        </Text>
      </Link>

      <Stack horizontal tokens={{ childrenGap: 20 }}>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} style={getLinkStyle(item.path)}>
            <Text variant="xLarge" styles={getTextStyle(item.path)}>{item.label}</Text>
          </Link>
        ))}
      </Stack>

      <Stack horizontal tokens={{ childrenGap: 20 }}>
        <Link to="/login" style={getLinkStyle('/login')}>
          <Text variant="medium" styles={loginStyle}>Login</Text>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Text variant="medium" styles={registerStyle}>Register</Text>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;
