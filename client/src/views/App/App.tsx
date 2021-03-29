import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { About } from '../../components/About';
import { Home } from '../../components/Home';
import { TopNavBar } from '../../components/NavBars/TopNavBar';
import { BottomNavBar } from '../../components/NavBars/BottomNavBar';
import NotFound from '../../components/NotFound';
import ProfileView from '../ProfileView';
import LoginRegistration from '../LoginRegistration';

const App = (): ReactElement => {
    return (
        <div>
            <header>
                <BrowserRouter>
                    <TopNavBar />
                    <Switch>
                        <Route exact path="/about" component={About} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/profil" component={ProfileView} />
                        <Route exact path="/register" component={LoginRegistration} />
                        <Route exact path="/login" component={LoginRegistration} />
                        <Route component={NotFound} />
                    </Switch>
                    <BottomNavBar />
                </BrowserRouter>
            </header>
        </div>
    );
};

export default App;
