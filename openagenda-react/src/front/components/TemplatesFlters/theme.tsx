import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Theme {
    background: {
      type: 'image' | 'color' | 'gradient'
      image: React.CSSProperties['backgroundImage']
      color: React.CSSProperties['backgroundColor']
    }
  }
  interface ThemeOptions {
    background?: {
      type: 'image' | 'color' | 'gradient'
      image?: React.CSSProperties['backgroundImage']
      color?: React.CSSProperties['backgroundColor']
    }
  }
}
const dummyElement = document.createElement('div');
dummyElement.className = 'text-primary';
document.body.appendChild(dummyElement);

const color = getComputedStyle(dummyElement).color;

document.body.removeChild(dummyElement);


const colors = {
    primary: {
      main: color,
      contrastText: '#ffffff',
    },
  
  secondary: {
    main: '#3870b2',
    dark: '#004582',
    light: '#6e9ee4',
    contrastText: '#ffffff',
  },
  background: {
    default: '#FFF',
    paper: '#eceef0',
  },
  text: {
    primary: '#000000',
    secondary: '#FFF', // '#e7ecf0',
  },
  success: {
    main: '#84b71a',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: '#ffffff',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
};

export const defaultTheme = createTheme({
  background: {
    type: 'color',
    color: '#5f6b76',
  },
  palette: colors,
  typography: {
    fontSize: 14,
    h1: {
      fontSize: '36px',
      letterSpacing: '-1px',
      fontWeight: 'normal',
      margin: '2rem 0',
    },
    h2: {
      fontSize: '30px',
      letterSpacing: '-1px',
      fontWeight: 'normal',
      margin: '1.25rem 0',
    },
    h3: {
      fontSize: '24px',
      letterSpacing: '-.5px',
      fontWeight: '400',
      margin: '1.125rem 0',
    },
    h4: {
      fontSize: '18px',
      letterSpacing: '-.5px',
      margin: '1.125rem 0',
    },
    h5: {
      fontSize: '16px',
      letterSpacing: '-.5px',
      fontWeight: 'bold',
      margin: '1rem 0 0.5rem 0',
    },
    body1: {
      fontSize: '14px',
    },
    body2: {
      fontSize: '12px',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        outlined: {
          backgroundColor: colors.background.default,
          '&.glass': {
            backgroundColor: '#FFF2',
            backdropFilter: 'blur(3px)',
            borderRadius: '5px',
            border: '1px solid #FFF',
            color: '#FFF',
            
          }
        },
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ccc',
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(5px)',
        },
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: colors.text.primary,
          fontSize: '13px',
          letterSpacing: '-.5px',
          fontWeight: 'bolder',
        }
      }
    }
  },
});


