import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Text, useTheme } from '@fluentui/react';

const Navbar: React.FC = () => {
  const theme = useTheme();

  const linkStyle = {
    color: theme.palette.white,
    textDecoration: 'none',
    padding: '10px 15px',
  }

  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign='center'
      styles={{
        root: {
          backgroundColor: theme.palette.themePrimary,
          padding: '10px 20px',
        },
      }}
    >
      <Link to="/" style={linkStyle}>
        <Text variant="xLarge" styles={{ root: { color: theme.palette.white } }}>
          Live Coin Tracker
        </Text>
        </Link>

      <Stack horizontal tokens={{ childrenGap: 20 }}>
        <Link to="/overview" style={linkStyle}>
          <Text variant="medium">Overview</Text>
        </Link>
        <Link to="/Trending" style={linkStyle}>
          <Text variant="medium">Trending</Text>
        </Link>
        <Link to="/watchlist" style={linkStyle}>
          <Text variant="medium">Watchlist</Text>
        </Link>
        <Link to="/portfolio" style={linkStyle}>
          <Text variant="medium">Portfolio</Text>
        </Link>
      </Stack>

      <Stack horizontal tokens={{ childrenGap: 20 }}>
        <Link to="/login" style={linkStyle}>
          <Text variant="medium">Login</Text>
        </Link>
        <Link to="/register" style={linkStyle}>
          <Text variant="medium">Register</Text>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;
