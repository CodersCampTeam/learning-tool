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
import PrivateRoute, { checkPrivateRoute } from '../../PrivateRoute';
import { CollectionView } from '../CollectionView/CollectionView';

const App = (): ReactElement => {
    return (
        <div>
            <header>
                <BrowserRouter>
                    <Route
                        path="/"
                        render={(routeProps) => (
                            <TopNavBar displaySearch={checkPrivateRoute(routeProps.location.pathname)} />
                        )}
                    />
                    <div style={{ paddingBottom: '70px' }}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomeView} />
                            <Route exact path="/start" component={Home} />
                            <PrivateRoute exact path="/stworz-kolekcje" component={CreateCollection} />
                            <PrivateRoute exact path="/profil" component={ProfileView} />
                            <PrivateRoute exact path="/kolekcje" component={HomeView} />
                            <PrivateRoute exact path="/kolekcje/:id" component={CollectionView} />
                            <PrivateRoute path="/szukaj/:search?" component={SearchResultsComponent} />
                            <Route exact path="/rejestracja" component={LoginRegistration} />
                            <Route exact path="/logowanie" component={LoginRegistration} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <Route
                        path="/"
                        render={(routeProps) =>
                            checkPrivateRoute(routeProps.location.pathname) ? <BottomNavBar /> : null
                        }
                    />
                </BrowserRouter>
            </header>
        </div>
    );
};

export default App;
