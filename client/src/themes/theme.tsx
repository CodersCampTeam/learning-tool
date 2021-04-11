import { createMuiTheme } from '@material-ui/core';
import { grey, deepPurple } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: grey,
        secondary: deepPurple
    },
    typography: {
        body1: {
            fontWeight: 400,
            height: '100%'
        },
        subtitle1: {
            fontWeight: 600
        }
    },
    props: {
        MuiTypography: {
            variantMapping: {
                h1: 'h2',
                h2: 'h2',
                h3: 'h3'
            }
        }
    },
    overrides: {
        MuiIconButton: {
            root: {
                padding: '10px'
            }
        },
        MuiCssBaseline: {
            '@global': {
                html: {
                    height: '100%'
                },
                body: {
                    height: '100%'
                },
                'body > div': {
                    height: '100%'
                }
            }
        }
    }
});

theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem'
    }
};

export default theme;
