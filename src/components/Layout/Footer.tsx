import React from 'react';
import { Stack, Text, useTheme } from '@fluentui/react';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack
      horizontalAlign="center"
      styles={{
        root: {
          backgroundColor: theme.palette.neutralLight,
          padding: '20px',
          borderTop: `1px solid ${theme.palette.neutralLight}`,
        },
      }}
    >
      <Text variant="small" styles={{ root: { color: theme.palette.neutralPrimary } }}>
        &copy; {new Date().getFullYear()} My Crypto App
      </Text>
    </Stack>
  );
};

export default Footer;
