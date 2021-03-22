import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import theme from './themes/theme';
 

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> 
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

 
 