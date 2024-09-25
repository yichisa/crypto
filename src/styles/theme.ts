import { createTheme } from '@fluentui/react';

export const darkTheme = createTheme({
    palette: {
        themePrimary: '#47c2be', // teal color
        neutralPrimary: '#a6b8d4',
        neutralLighter: '#343e56',
        neutralLight: '#293143',
        neutralDark: '#1d2330',
        neutralQuaternaryAlt: 'linear-gradient(45deg, #ff69b4, #ff1493, #ff00ff, #ff6ec7, #ff1493, #db7093, #ff69b4)',
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
