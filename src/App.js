import React, { useEffect } from 'react';

import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Authenticator from './components/Authenticator/Authenticator';
import NewAuthenticator from './components/NewAuthenticator/NewAuthenticator';
import AuthenticatorsList from './components/AuthenticatorsList/AuthenticatorsList';
import { PUBLISHER_ID, APP_NAME } from './config';

export default function App() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    // eslint-disable-next-line no-undef
    getKaiAd({
      publisher: PUBLISHER_ID,
      app: APP_NAME,
      test: 0,
      onerror: err => console.error('Custom catch:', err),
      onready: ad => {
        const isStillHomePage = document.querySelector('header').textContent === 'Authenticators';
        if (isStillHomePage) {
          // Ad is ready to be displayed
          // calling 'display' will display the ad
          ad.call('display')
        }
      }
    });
  }, []);

  return (
    <Switch>
      <Route path="/new">
        <NewAuthenticator />
      </Route>
      <Route path="/list">
        <AuthenticatorsList />
      </Route>
      <Route path="/:authenticatorId">
        <Authenticator />
      </Route>
      <Redirect from="/" to="/list" />
    </Switch>
  );
}
