/// <reference types="cypress" />

describe('New Authenticator snapshot regression', () => {
  beforeEach(() => {
    cy.goToNewAuth();
  });

  context('horizontal', () => {
    it('New Auth Initial Screen', () => {
      cy.compareSnapshot('new-authenticator-initial', 0.12); // to handle cursor blinking difference
    });
  });

  context('horizontal', () => {
    beforeEach(() => {
      cy.viewport(320, 240);
    });

    it('New Auth Initial Screen', () => {
      cy.compareSnapshot('new-authenticator-initial-h', 0.131); // to handle cursor blinking difference
    });
  });
});
