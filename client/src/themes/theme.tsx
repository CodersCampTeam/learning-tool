import { createMuiTheme } from '@material-ui/core';
import { deepPurple, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: deepPurple,
        secondary: grey
    },
    typography: {
        body1: {
            fontFamily: 'Open Sans',
            fontWeight: 600,
            height: '100%'
        },
        subtitle1: {
            fontWeight: 600
        },
        subtitle2: {
            fontWeight: 400,
            fontSize: 15
        },
        h2: {
            fontWeight: 600,
            fontSize: '26px'
        },
        body2: {
            height: '100%',
            fontFamily: 'Open Sans',
            fontSize: 19
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
