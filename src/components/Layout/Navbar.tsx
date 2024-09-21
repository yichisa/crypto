// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Text, useTheme } from '@fluentui/react';

const Navbar: React.FC = () => {
  const theme = useTheme();

  const linkStyle = {
    color: theme.palette.white, // Use theme color for link text
    textDecoration: 'none',
    padding: '10px 15px',
  };

  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      styles={{
        root: {
          backgroundColor: theme.palette.themePrimary,
          padding: '10px 20px',
        },
      }}
    >
      <Stack horizontal tokens={{ childrenGap: 20 }}>
        <Link to="/" style={linkStyle}>
          <Text variant="medium">Home</Text>
        </Link>
        <Link to="/watchlist" style={linkStyle}>
          <Text variant="medium">Watchlist</Text>
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
