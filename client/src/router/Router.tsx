import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { App } from '../App';
import { About } from '../components/About';
import { Home } from '../components/Home';

export const Router: FC = () => {
  console.log('routing...')
  // this aint working man :(
  return (
    <BrowserRouter>
       
          <App>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            </Switch>
          </App>
        
    </BrowserRouter>
  );
}
