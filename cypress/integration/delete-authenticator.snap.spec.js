/// <reference types="cypress" />

describe('Delete Authenticator snapshot regression', () => {
  context('vertical', () => {
    it('popup', () => {
      cy.createAuth('Test My Tralala', '123a');
    
      cy.contains('Delete')
        .click()
  
      cy.compareSnapshot('delete-authenticator-dialog', 0.01);
    });
  });

  context('horizontal', () => {
    beforeEach(() => {
      cy.viewport(320, 240);
    });

    it('popup', () => {
      cy.createAuth('Test My Tralala', '123a');
    
      cy.contains('Delete')
        .click()
  
      cy.compareSnapshot('delete-authenticator-dialog-h', 0.01);
    });
  });
});
