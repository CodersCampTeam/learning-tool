import {Switch, Route} from 'react-router-dom'
import NotFound from './components/NotFound';

function Hello() {
  return (
      <div>
        <h1>Hello world! (This is to be removed)</h1>
      </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/home" component={Hello} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
