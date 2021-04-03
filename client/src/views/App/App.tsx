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
import SearchResultsComponent from '../../components/SearchResults/SearchResultsComponent';
import { css } from '@emotion/react';
import { CreateCollection } from '../../components/CreateCollection/CreateCollection';
import PrivateRoute from '../../PrivateRoute';

const App = (): ReactElement => {
    return (
        <BrowserRouter>
            <TopNavBar />

            <div
                css={css`
                    height: 100%;
                `}
            >
                <Switch>
                    <PrivateRoute exact path="/about" component={About} />
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path="/create" component={CreateCollection} />
                    <PrivateRoute exact path="/profile" component={ProfileComponent} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/flashcardCollections" component={HomeView} />
                    <PrivateRoute path="/search/:search?" component={SearchResultsComponent} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            <BottomNavBar />
        </BrowserRouter>
    );
};

export default App;
