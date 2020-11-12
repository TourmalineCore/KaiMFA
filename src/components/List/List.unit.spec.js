import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { List } from './List';

describe('List component', () => {
  it('Can be navigated', () => {
    mount(<List
      authenticators={[
        {
          name: 'Test 1'
        },
        {
          name: 'Test 2'
        }
      ]}
    />)

    cy.contains('Test 1').should('be.visible')
    cy.contains('Test 2').should('be.visible')

    cy.get('[nav-selected=true]').contains('Test 1')

    cy.get('body').trigger('keydown', { key: 'ArrowDown' })
    cy.get('[nav-selected=true]').contains('Test 2')

    cy.get('body').trigger('keydown', { key: 'ArrowDown' })
    cy.get('[nav-selected=true]').contains('Test 1')
  })
})