// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

require('cypress-react-unit-test/support');

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on("window:before:load", win => {
  win.indexedDB.deleteDatabase("TC_KaiMFA_DB");
  win.localStorage.setItem('kaimfa_password-hash', '806e7f016853ac36427e7e31ee46e5ec7a32c3e5eaa5231dca9b6dc07824606340bcfdffc39bbc8e0c49a0161f210f7aab368692481fbcb9f6321189786526ad');
  win.localStorage.setItem('kaimfa_password-salt', '8tjadne32toxyjd0zgdbvnclj5hvc8h');
  win.sessionStorage.setItem('kaimfa_password', 'baby');
});
