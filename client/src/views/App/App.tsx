import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { About } from '../../components/About';
import { Home } from '../../components/Home';
import { HomeView } from '../HomeView/FlashcardCollectionView';
import NotFound from '../../components/NotFound';

export const App: FC = () => {
    return (
        <div>
            <header>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/about" component={About} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/flashcardCollections" component={HomeView} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </header>
        </div>
    );
};

export default App;
