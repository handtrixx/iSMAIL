'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-theme',
  },
  // Typography configuration
  typography: {
    fontFamily: 'var(--font-roboto), Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 300,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none', // Disable uppercase transformation
    },
  },
  // Shape configuration (border radius)
  shape: {
    borderRadius: 8, // Default border radius for components
  },
  // Spacing configuration
  spacing: 8, // Base spacing unit (8px)
  // Shadow configuration
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 2px 6px rgba(0, 0, 0, 0.16)',
    '0px 3px 12px rgba(0, 0, 0, 0.16)',
    // ... you can customize all 25 shadow levels
  ] as any,
  // Breakpoints for responsive design
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  // Z-index values
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: 'rgb(240, 240, 240)', // #f0f0f0
          paper: 'rgb(255, 255, 255)', // Fixed: was '#ffff'
        },
        text: {
          primary: 'rgb(35, 33, 33)',
          secondary: 'rgba(35, 33, 33, 0.6)',
        },
        primary: {
          main: 'rgb(0, 137, 123)', // #00897b - Mint/teal color for light theme
          light: 'rgb(77, 182, 172)', // #4db6ac
          dark: 'rgb(0, 105, 92)', // #00695c
          contrastText: 'rgb(255, 255, 255)', // Fixed: was '#ffff'
        },
        secondary: {
          main: 'rgb(220, 0, 78)', // #dc004e
          light: 'rgb(255, 89, 131)', // #ff5983
          dark: 'rgb(160, 0, 55)', // #a00037
          contrastText: 'rgb(255, 255, 255)', // Fixed: was '#ffff'
        },
        error: {
          main: 'rgb(211, 47, 47)', // #d32f2f
          light: 'rgb(239, 83, 80)', // #ef5350
          dark: 'rgb(198, 40, 40)', // #c62828
        },
        success: {
          main: 'rgb(46, 125, 50)', // #2e7d32
          light: 'rgb(76, 175, 80)', // #4caf50
          dark: 'rgb(27, 94, 32)', // #1b5e20
        },
        warning: {
          main: 'rgb(237, 108, 2)', // #ed6c02
          light: 'rgb(255, 152, 0)', // #ff9800
          dark: 'rgb(230, 81, 0)', // #e65100
        },
        info: {
          main: 'rgb(2, 136, 209)', // #0288d1
          light: 'rgb(3, 169, 244)', // #03a9f4
          dark: 'rgb(1, 87, 155)', // #01579b
        },
        divider: 'rgba(0, 0, 0, 0.12)',
      },
    },
    dark: {
      palette: {
        background: {
          default: 'rgb(18, 18, 18)', // #121212
          paper: 'rgb(30, 30, 30)', // #1e1e1e
        },
        text: {
          primary: 'rgb(255, 255, 255)', // Fixed: was '#ffff'
          secondary: 'rgba(255, 255, 255, 0.7)',
        },
        primary: {
          main: 'rgb(77, 182, 172)', // #4db6ac - Lighter mint/teal for dark theme
          light: 'rgb(128, 203, 196)', // #80cbc4
          dark: 'rgb(38, 166, 154)', // #26a69a
          contrastText: 'rgb(0, 0, 0)', // Fixed: was '#0000'
        },
        secondary: {
          main: 'rgb(244, 143, 177)', // #f48fb1
          light: 'rgb(248, 187, 217)', // #f8bbd9
          dark: 'rgb(240, 98, 146)', // #f06292
          contrastText: 'rgb(0, 0, 0)', // Fixed: was '#0000'
        },
        error: {
          main: 'rgb(244, 67, 54)', // #f44336
          light: 'rgb(229, 115, 115)', // #e57373
          dark: 'rgb(211, 47, 47)', // #d32f2f
        },
        success: {
          main: 'rgb(76, 175, 80)', // #4caf50
          light: 'rgb(129, 199, 132)', // #81c784
          dark: 'rgb(56, 142, 60)', // #388e3c
        },
        warning: {
          main: 'rgb(255, 152, 0)', // #ff9800
          light: 'rgb(255, 183, 77)', // #ffb74d
          dark: 'rgb(245, 124, 0)', // #f57c00
        },
        info: {
          main: 'rgb(41, 182, 246)', // #29b6f6
          light: 'rgb(79, 195, 247)', // #4fc3f7
          dark: 'rgb(2, 136, 209)', // #0288d1
        },
        divider: 'rgba(255, 255, 255, 0.12)',
      },
    },
  },
  // Component-specific overrides
  components: {
    // Button customization
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Custom border radius for buttons
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    // TextField customization
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    // Paper customization
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    // Card customization
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;