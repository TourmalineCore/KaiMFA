/// <reference types="cypress" />

describe('Authenticators', () => {
  it('Empty Authenticator by Default', () => {
    cy.visit('/list')

    cy.get('.message')
      .contains(/^No authenticators are created yet./);
  })

  it('Creating a New Authenticator', () => {
    cy.createAuth('My Test Auth', '123');

    cy.get('[nav-selected=true]').contains('My Test Auth')
  })

  it('Cannot create a new authenticator with not filled name and/or secret', () => {
    cy.goToNewAuth();

    cy.contains('Save')
      .click()

    cy.get('[data-cy=header]')
      .contains('New Authenticator')
  })
})