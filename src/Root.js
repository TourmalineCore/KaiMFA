import React from 'react';

import {
  MemoryRouter,
  Switch,
  Route,
} from "react-router-dom";

import SetPassword from './components/SetPassword/SetPassword';
import Login from './components/Login/Login';

import RequirePassword from './components/RequirePassword/RequirePassword';

import App from './App';

export default function Root() {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/set-password">
          <SetPassword />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" component={RequirePassword(App)} />
      </Switch>
    </MemoryRouter>
  );
}
