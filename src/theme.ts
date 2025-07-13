'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  // Typography configuration
  typography: {
    h1: {
    },
    h2: {
    },
    h3: {
    },
    body1: {
    },
    body2: {
    },
    button: {
    },
  },
  // Shape configuration (border radius)
  shape: {
  },
  // Spacing configuration
  spacing: 8, // Base spacing unit (8px)
  // Shadow configuration
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.12)',
    '0px 2px 6px rgba(0, 0, 0, 0.16)',
    '0px 3px 12px rgba(0, 0, 0, 0.16)',
    '0px 4px 16px rgba(0, 0, 0, 0.16)',
    '0px 5px 20px rgba(0, 0, 0, 0.16)',
    '0px 6px 24px rgba(0, 0, 0, 0.16)',
    '0px 7px 28px rgba(0, 0, 0, 0.16)',
    '0px 8px 32px rgba(0, 0, 0, 0.16)',
    '0px 9px 36px rgba(0, 0, 0, 0.16)',
    '0px 10px 40px rgba(0, 0, 0, 0.16)',
    '0px 11px 44px rgba(0, 0, 0, 0.16)',
    '0px 12px 48px rgba(0, 0, 0, 0.16)',
    '0px 13px 52px rgba(0, 0, 0, 0.16)',
    '0px 14px 56px rgba(0, 0, 0, 0.16)',
    '0px 15px 60px rgba(0, 0, 0, 0.16)',
    '0px 16px 64px rgba(0, 0, 0, 0.16)',
    '0px 17px 68px rgba(0, 0, 0, 0.16)',
    '0px 18px 72px rgba(0, 0, 0, 0.16)',
    '0px 19px 76px rgba(0, 0, 0, 0.16)',
    '0px 20px 80px rgba(0, 0, 0, 0.16)',
    '0px 21px 84px rgba(0, 0, 0, 0.16)',
    '0px 22px 88px rgba(0, 0, 0, 0.16)',
    '0px 23px 92px rgba(0, 0, 0, 0.16)',
    '0px 24px 96px rgba(0, 0, 0, 0.16)',
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
          default: 'rgb(248, 248, 248)', // #f0f0f0
          paper: 'rgb(250, 250, 250)', // Fixed: was '#ffff'
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
        MuiAppBar: {
          styleOverrides: {
            root: {
             
            },
          },
        },
    // Button customization
    MuiButton: {
      styleOverrides: {
        root: {
        },
        contained: {
        },
      },
    },
    // TextField customization
    MuiTextField: {
      styleOverrides: {
        root: {
        },
      },
    },
    // Paper customization
    MuiPaper: {
      styleOverrides: {
      },
    },
    // Card customization
    MuiCard: {
      styleOverrides: {
      },
    },
  },
});

export default theme;