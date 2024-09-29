import { mergeStyles, ITheme, ISearchBoxStyles, ITextFieldStyles, ITextStyles } from '@fluentui/react';

export const getTableStyles = (theme: ITheme) => ({
  tableContainer: mergeStyles({
    overflowX: 'auto',
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.neutralLight,
    boxShadow: theme.effects.elevation4,
    borderRadius: theme.effects.roundedCorner4,
    overflow: 'hidden',
    padding: '2px 20px',
  }),
  table: mergeStyles({
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'auto',
  }),
  th: mergeStyles({
    padding: '4px 8px',
    color: theme.palette.neutralPrimary,
    borderBottom: `4px solid ${theme.palette.neutralDark}`,
  }),
  centerAlignedTh: mergeStyles({
    textAlign: 'center',
    borderBottom: `4px solid ${theme.palette.neutralDark}`,
  }),
  tr: mergeStyles({
    height: '48px',
    cursor: 'pointer',
    borderBottom: `2px solid ${theme.palette.neutralDark}`,
    backgroundColor: theme.palette.neutralLight,
    ':hover': {
      backgroundColor: theme.palette.neutralLighter,
    },
  }),
  td: mergeStyles({
    padding: '8px 12px',
    color: theme.palette.white,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textAlign: 'right',
    // textOverflow: 'ellipsis',
  }),
  leftAlignedTd: mergeStyles({
    textAlign: 'left',
    padding: '4px 16px',
  }),
  centerAlignedTd: mergeStyles({
    textAlign: 'center',
    padding: '4px 8px',
  }),
  headerText: mergeStyles({
    fontWeight: 600,
  }),
});

export const columnStyles = {
  iconButton: (isLiked: boolean) => ({
    root: {
      fontSize: 16,
      color: isLiked ? '#f4737c' : '#ccc',
    },
  }),
  coinImage: mergeStyles({
    borderRadius: '50%',
  }),
  coinName: mergeStyles({
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),
  priceChangeBox: (isPositive: boolean) => (
    {
      root: {
        backgroundColor: isPositive ? '#52DFA2' : '#f4737c',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '12px',
        textAlign: 'center',
        maxWidth: '70px',
        fontWeight: 'bold',
      },
    }),
  priceChangeText: mergeStyles({
    color: '#fff',
    fontWeight: 'bold',
  }),
};

export const getSearchBoxStyles = (theme: ITheme): Partial<ISearchBoxStyles> => {
  return {
    root: {
      backgroundColor: theme.palette.neutralLighter,
      borderColor: theme.palette.themePrimary,  
      width: '200px',
    },
    field: {
      color: theme.palette.neutralPrimary,
      selectors: {
        '::placeholder': {
          color: theme.palette.neutralPrimary,
          opacity: 1,
        },
      },
    },
    icon: {
      color: theme.palette.themePrimary,
    },
  };
};

export const getFormTextFieldStyles = (theme: ITheme): Partial<ITextFieldStyles> => ({
  root: {
    marginTop: '15px',
    selectors: {
      'input': {
        color: theme.palette.neutralLighter,
        backgroundColor: theme.palette.white,
        border: `1px solid ${theme.palette.neutralLighter}`,
      },
      ':hover': {
        borderColor: theme.palette.neutralLighter,
      },
      ':focus': {
        borderColor: theme.palette.themePrimary,
      },
    },
  },
  subComponentStyles: {
    label: {
      root: { color: theme.palette.themePrimary },
    },
  },
});

export const getLogoTextStyle = (theme: ITheme): Partial<ITextStyles> => ({
  root: {
    position: 'relative',
    background: `linear-gradient(45deg, ${theme.palette.themeLight}, ${theme.palette.themePrimary}, ${theme.palette.themeTertiary}, ${theme.palette.themeLighterAlt})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    transition: '0.3s ease',
    selectors: {
      ':hover': {
        transform: 'scale(1.05)', 
      },
    },
  },
});
