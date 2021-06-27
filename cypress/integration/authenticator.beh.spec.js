/// <reference types="cypress" />

const CODE = '566 155';

describe('Authenticator code test', () => {
  beforeEach(() => {
    cy.clock(new Date(1565103854545), ['Date']);
  });

  it('code is correct and different for different secrets', () => {
    createAuthAndCheckCode('NBCC6NZLM5DU4L2HMF3HS4DPNYYHK32R', CODE);
    createAuthAndCheckCode('MNWGYTSQMR4UG3ZRJ5VUQUTCGFTVMT3W', '628 526');
  });

  it('different registy and spaces does not affect the code', () => {
    createAuthAndCheckCode('   nbcc6n zlm5du 4l2hmf  3hs4dp nYYHK32R  ', CODE);
  });
});

function createAuthAndCheckCode(secret, code) {
  cy.createAuth('Test My Tralala', secret);

  cy.get('[nav-selectable="true"]')
    .should('have.attr', 'nav-selected', 'true');

  cy.contains('Open')
    .click({ force: true }); // to overcome fullscreen adv and click through it

  cy.contains(code);
}
