import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './routes/Landing-Page';
import AdoptionPage from './routes/Adoption';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <main role='main' className='App-main'>
          <Switch>
            <Route exact path='/' component={LandingPage} />

            <Route path='/adopt' component={AdoptionPage} />
          </Switch>
        </main>
      </div>
    );
  }
}
