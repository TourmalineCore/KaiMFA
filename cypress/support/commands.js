// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const compareSnapshotCommand = require('cypress-visual-regression/dist/command');
compareSnapshotCommand();

Cypress.Commands.add('goToNewAuth', () => {
    cy.visit('/list')

    cy.contains('New')
        .click();
});

Cypress.Commands.add('createAuth', (name, secret) => {
    cy.goToNewAuth();

    cy.get('[data-cy=name]')
      .type(name)

    cy.get('[data-cy=secret]')
      .type(secret)

    cy.contains('Save')
      .click()
});