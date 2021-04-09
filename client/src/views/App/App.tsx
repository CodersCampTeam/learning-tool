import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { About } from '../../components/About';
import { Home } from '../../components/Home';
import { TopNavBar } from '../../components/NavBars/TopNavBar';
import { BottomNavBar } from '../../components/NavBars/BottomNavBar';
import { HomeView } from '../HomeView/FlashcardCollectionView';
import NotFound from '../../components/NotFound';
import ProfileView from '../ProfileView';
import LoginRegistration from '../LoginRegistration';
import SearchResultsComponent from '../../components/SearchResults/SearchResultsComponent';
import { css } from '@emotion/react';
import { CreateCollection } from '../../components/CreateCollection/CreateCollection';
import PrivateRoute from '../../PrivateRoute';

const App = (): ReactElement => {
    return (
        <div>
            <header>
                <BrowserRouter>
                    <TopNavBar />
                    <div
                        css={css`
                            height: 100%;
                        `}
                    ></div>
                    <Switch>
                        <PrivateRoute exact path="/about" component={About} />
                        <PrivateRoute exact path="/" component={HomeView} />
                        <Route exact path="/start" component={Home} />
                        <PrivateRoute exact path="/create" component={CreateCollection} />
                        <Route exact path="/profil" component={ProfileView} />
                        <PrivateRoute exact path="/flashcardCollections" component={HomeView} />
                        <PrivateRoute path="/search/:search?" component={SearchResultsComponent} />
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
