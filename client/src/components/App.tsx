import React from 'react';
import { Global } from '@emotion/react';
import GlobalStyles from '../GlobalStyles';
import {ThemeProvider, Button} from '@material-ui/core';
import theme from '../themes/theme';
import CustomButton from './CustomButton/CustomButton';

const App = () => {
 return (
   <React.Fragment>
     {/* global styles should on top of our components hierarchy */}
      {/* <Global styles={GlobalStyles} /> */}
      <CustomButton color="primary">
        Click me!
      </CustomButton>
            <CustomButton color="secondary">
        Click me!
      </CustomButton>
      </React.Fragment>
  );
}

export default App;