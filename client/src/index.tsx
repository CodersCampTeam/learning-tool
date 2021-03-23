import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './views/App/App';
import theme from './themes/theme';
import { ThemeProvider } from '@emotion/react';

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
