import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { About } from '../../components/About';
import { Home } from '../../components/Home';
import { TopNavBar } from '../../components/NavBars/TopNavBar';
import { BottomNavBar } from '../../components/NavBars/BottomNavBar';
import NotFound from '../../components/NotFound';
import ProfileComponent from '../ProfileComponent';

export const App: FC = () => {
    return (
        <div>
            <header>
                <BrowserRouter>
                    <TopNavBar />

                    <Switch>
                        <Route exact path="/about" component={About} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/profil" component={ProfileComponent} />
                        <Route component={NotFound} />
                    </Switch>

                    <BottomNavBar />
                </BrowserRouter>
            </header>
        </div>
    );
};

export default App;
