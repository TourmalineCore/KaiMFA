/// <reference types="cypress" />

describe('Authenticators snapshot regression', () => {
  context('vertical', () => {
    it('No authenticators', () => {
      cy.visit('/list');

      cy.compareSnapshot('empty-authenticators', 0.01);
    });
  });

  context('horizontal', () => {
    beforeEach(() => {
      cy.viewport(320, 240);
    });

    it('No authenticators', () => {
      cy.visit('/list');

      cy.compareSnapshot('empty-authenticators-h', 0.01);
    });
  });
});
