import { mergeStyles, ITheme, ISearchBoxStyles, ITextFieldStyles } from '@fluentui/react';


export const getTableStyles = (theme: ITheme) => ({
  tableContainer: mergeStyles({
    overflowX: 'auto',
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.neutralLight,
  }),
  table: mergeStyles({
    width: '100%',
    borderCollapse: 'collapse',
  }),
  th: mergeStyles({
    backgroundColor: theme.palette.neutralLight,
    padding: '10px 24px',
    height: '20px',
    color: theme.palette.neutralPrimary,
    textAlign: 'center',
    borderBottom: `4px solid ${theme.palette.neutralDark}`,
  }),
  tr: mergeStyles({
    cursor: 'pointer',
    borderBottom: `2px solid ${theme.palette.neutralDark}`,
    backgroundColor: theme.palette.neutralLight,
    ':hover': {
      backgroundColor: theme.palette.neutralLighter,
    },
  }),
  td: mergeStyles({
    padding: '12px 24px',
    color: theme.palette.white,
  }),
  headerText: mergeStyles({
    fontWeight: 600,
  }),
});

export const getSearchBoxStyles = (theme: ITheme): Partial<ISearchBoxStyles> => {
  return {
    root: {
      backgroundColor: theme.palette.neutralLighter,
      borderColor: theme.palette.themePrimary,  
      width: '100%',
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