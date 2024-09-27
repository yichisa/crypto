import React, { ReactNode } from 'react';
import { Stack, IStackTokens, IStackStyles, ITextStyles, useTheme, Text, Theme } from '@fluentui/react';

interface CardProps {
  children: ReactNode;
  headerText?: string;
}

export const Card: React.FC<CardProps> = ({ children, headerText }) => {
  const theme: Theme = useTheme(); // Access Fluent UI theme

  const cardStyles: IStackStyles = {
    root: {
      boxShadow: theme.effects.elevation4,
      borderRadius: theme.effects.roundedCorner4,
      padding: '0px',
      backgroundColor: theme.palette.neutralLight,
      margin: '0px',
      maxWidth: '400px',
      height: '150px',
      width: '100%',
      overflow: 'hidden',
    },
  };

  const headerStyles: ITextStyles = {
    root: {
      backgroundColor: theme.palette.neutralLighter,
      fontSize: theme.fonts.mediumPlus.fontSize,
      fontWeight: theme.fonts.mediumPlus.fontWeight,
      textAlign: 'center',
      color: theme.palette.white,
      padding: '4px',
      selectors: {
        ':hover': {
          color: theme.palette.themePrimary,
        },
      },
    },
  };
  

  const childrenContainerStyles: IStackStyles = {
    root: {
      padding: '10px', // Add padding around the children
      backgroundColor: theme.palette.neutralLight, // Background color for the children container
      borderRadius: theme.effects.roundedCorner2, // Rounded corners for the children container
      color: theme.palette.neutralLight, // Change the text color for children
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };

  const cardTokens: IStackTokens = {
    childrenGap: 5,
  };
  const textStyles: ITextStyles = {
    root: {
      color: theme.palette.themePrimary, // Apply the desired text color here
    },
  };

  return (
    <Stack styles={cardStyles} tokens={cardTokens}>
      {/* Optional Header */}
      {headerText && (
        <Text styles={headerStyles}>
          {headerText}
        </Text>
      )}

      {/* Apply custom styles to the children with text color change */}
      <Stack.Item styles={childrenContainerStyles}>
        {/* If children contains text directly, wrap in Text */}
        <Text styles={textStyles}>
          {children}
        </Text>
      </Stack.Item>
    </Stack>
  );
};
