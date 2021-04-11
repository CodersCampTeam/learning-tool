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
import { CollectionView } from '../CollectionView/CollectionView';
import AddFlashcard from '../../components/flashcard/AddFlashcard';

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
                    <PrivateRoute exact path="/" component={HomeView} />
                    <Route exact path="/start" component={Home} />
                    <PrivateRoute exact path="/stworz-kolekcje" component={CreateCollection} />
                    <PrivateRoute exact path="/stworz-fiszke/:collectionId" component={AddFlashcard} />
                    <PrivateRoute exact path="/profil" component={ProfileView} />
                    <PrivateRoute exact path="/kolekcje" component={HomeView} />
                    <Route exact path="/kolekcje/:id" component={CollectionView} />
                    <PrivateRoute path="/szukaj/:search?" component={SearchResultsComponent} />
                    <Route exact path="/rejestracja" component={LoginRegistration} />
                    <Route exact path="/logowanie" component={LoginRegistration} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            <BottomNavBar />
        </BrowserRouter>
    );
};

export default App;
