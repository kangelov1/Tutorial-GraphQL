import React, { Component } from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'

import AuthPage from './pages/Auth'
import Events from './pages/Events'
import Bookings from './pages/Bookings'
import MainNavigation from './components/Navigation/MainNavigation'

import './App.css';

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <BrowserRouter>
              <MainNavigation />
              <main className="main-content">
                  <Switch>
                  <Redirect from="/" to='/auth' exact/>
                  <Route path="/auth" component={AuthPage} />
                  <Route path="/events" component={Events} />
                  <Route path="/bookings" component={Bookings} />
              </Switch>
              </main>
            </BrowserRouter>
        </React.Fragment>
    );
  }
}

export default App;
