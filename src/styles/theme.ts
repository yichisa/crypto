import { createTheme } from '@fluentui/react';

export const darkTheme = createTheme({
palette: {
        themePrimary: '#00CED1', // teal color
        neutralPrimary: '#ffffff',
        neutralLighter: '#333333',
        neutralLight: '#222222',
        neutralDark: '#f3f2f1',
        neutralQuaternaryAlt: '#444444',
        white: '#ffffff',
      },
  fonts: {
    medium: {
      fontSize: '16px',
      color: '#ffffff',
    },
    small: {
      fontSize: '14px',
      color: '#dddddd',
    },
  },
});
