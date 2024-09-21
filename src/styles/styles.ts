import { mergeStyles } from '@fluentui/react';

export const tableContainerClass = mergeStyles({
  overflowX: 'auto',
  maxWidth: '80%',
  margin: '0 auto',
});

export const tableClass = mergeStyles({
  width: '100%',
  borderCollapse: 'collapse',
});

export const thClass = mergeStyles({
  backgroundColor: '#333',
});

export const trClass = mergeStyles({
  cursor: 'pointer',
  borderBottom: '1px solid #444',
  backgroundColor: '#1d1d1d',
  ':hover': {
    backgroundColor: '#333',
  },
});

export const tdClass = mergeStyles({
  padding: '12px 24px',
  color: '#CCCCCC',
});

export const textHeaderClass = mergeStyles({
  fontWeight: 600,
  textTransform: 'uppercase',
});
