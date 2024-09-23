import { createTheme } from '@fluentui/react';

export const darkTheme = createTheme({
    palette: {
        themePrimary: '#47c2be', // teal color
        neutralPrimary: '#ffffff',
        neutralLighter: '#343e56',
        neutralLight: '#293143',
        neutralDark: '#1d2330',
        neutralQuaternaryAlt: '#444444',
        white: '#ffffff',
      },
    semanticColors: {
        bodyBackground: '#293143',
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
