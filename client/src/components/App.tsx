import React from 'react';
import { Button } from '@material-ui/core';
import StyledButton from './CustomButton/styles';
 

const App = () => {
 return (
   <React.Fragment>
 
      <StyledButton test color="primary">
        Click me!
      </StyledButton>
            <StyledButton color="secondary">
        Click me!
      </StyledButton>
 
      </React.Fragment>
  );
}

export default App;