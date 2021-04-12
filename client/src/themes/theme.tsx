import { createMuiTheme } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: deepPurple,
        secondary: deepPurple
    },
    typography: {
        body1: {
            fontWeight: 600,
            height: '100%',
            fontFamily: 'righteous'
        },
        subtitle1: {
            fontWeight: 600
        },
        body2: {
            height: '100%',
            fontFamily: 'righteous',
            fontSize: 17
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
                padding: '0px'
            }
        },
        MuiCssBaseline: {
            '@global': {
                html: {
                    height: '100%'
                },
                body: {
                    height: '100%',
                    overflowX: 'hidden'
                },
                'body > div': {
                    height: '100%'
                },
                a: {
                    textDecoration: 'none'
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
