import { mergeStyles, ITheme, ISearchBoxStyles } from '@fluentui/react';


export const getTableStyles = (theme: ITheme) => ({
  tableContainer: mergeStyles({
    overflowX: 'auto',
    maxWidth: '80%',
    margin: '0 auto',
    backgroundColor: theme.palette.neutralLight,
  }),
  table: mergeStyles({
    width: '100%',
    borderCollapse: 'collapse',
  }),
  th: mergeStyles({
    backgroundColor: theme.palette.neutralLight,
  }),
  tr: mergeStyles({
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.neutralLight}`,
    backgroundColor: theme.palette.neutralDark,
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
    textTransform: 'uppercase',
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
