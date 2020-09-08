import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


//vistas
import moduleStudent from './views/Students';
import Login from './views/login';

//hooks - provaiders
import { GoogleAuthProvider } from './hooks/GoogleAuthContext';
import { Provider } from 'react-redux';
import {store} from './redux/store';
function App() {


  return (
    <Provider store={store}>
      <GoogleAuthProvider>
        <Router>
          <Switch>
            <Route exact path="/community-espe" component={moduleStudent} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />
          </Switch>
        </Router>
      </GoogleAuthProvider>
    </Provider>
  );
}

export default App;
