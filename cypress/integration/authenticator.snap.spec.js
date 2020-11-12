/// <reference types="cypress" />

describe('Authenticator snapshot regression', () => {
  beforeEach(() => {
    cy.clock(new Date(1565103854545), ['Date']);
  });

  context('vertical', () => {
    it('Authenticator', () => {
      cy.createAuth('Test', 'NBCC6NZLM5DU4L2HMF3HS4DPNYYHK32R');

      cy.get('[nav-selectable="true"]')
        .should('have.attr', 'nav-selected', 'true');

      cy.contains('Open')
        .click({ force: true }); // to overcome fullscreen adv and click through it

      cy.contains('decrypting').should('not.exist');

      cy.compareSnapshot('authenticator', 0.01);
    });
  });

  context('horizontal', () => {
    beforeEach(() => {
      cy.viewport(320, 240);
    });

    it('Authenticator', () => {
      cy.createAuth('Test', 'NBCC6NZLM5DU4L2HMF3HS4DPNYYHK32R');

      cy.get('[nav-selectable="true"]')
        .should('have.attr', 'nav-selected', 'true');

      cy.contains('Open')
        .click({ force: true }); // to overcome fullscreen adv and click through it

      cy.contains('decrypting').should('not.exist');

      cy.compareSnapshot('authenticator-h', 0.01);
    });
  });
});
