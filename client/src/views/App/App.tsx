import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { About } from '../../components/About';
import { Home } from '../../components/Home';
import { TopNavBar } from '../../components/NavBars/TopNavBar';
import { BottomNavBar } from '../../components/NavBars/BottomNavBar';
import { HomeView } from '../HomeView/FlashcardCollectionView';
import NotFound from '../../components/NotFound';
import ProfileComponent from '../ProfileComponent';
import Login from '../Login/Login';
import Register from '../Register/Register';

const App = (): ReactElement => {
    return (
        <div>
            <header>
                <BrowserRouter>
                    <TopNavBar />

                    <Switch>
                        <Route exact path="/about" component={About} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/profil" component={ProfileComponent} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/flashcardCollections" component={HomeView} />
                        <Route component={NotFound} />
                    </Switch>

                    <BottomNavBar />
                </BrowserRouter>
            </header>
        </div>
    );
};

export default App;
