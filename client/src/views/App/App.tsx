import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { About } from '../../components/About';
import { Home } from '../../components/Home';
import { NavBar } from '../../components/NavBar';
import NotFound from '../../components/NotFound';
import FancyComponent from '../../components/FancyComponent/FancyComponent';
import  ProfileComponent  from '../../components/ProfileComponent/ProfileComponent';

export const App: FC = () => {
    return (
        <div>
            <header>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/about" component={About} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/profil" component={ProfileComponent} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </header>
        </div>
    );
};

export default App;
