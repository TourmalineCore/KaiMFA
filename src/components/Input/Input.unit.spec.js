import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { Input } from './Input';

describe('Input component', () => {
  it('Cannot type in more than maxLength in single line input', () => {
    mount(
      <Input
        type="text"
        label="Field"
        placeholder="Required!"
        dataCy="input-field"
        maxLength={5}
      />
    )

    cy.get('[data-cy=input-field')
      .type('123456789')
      .should('have.value', '12345');
  })
  
  it('Cannot type in more than maxLength in multiline input', () => {
    mount(
      <Input
        type="text"
        label="Field"
        placeholder="Required!"
        dataCy="input-field"
        multiline={true}
        maxLength={7}
      />
    )

    cy.get('[data-cy=input-field')
      .type('1234567890')
      .should('have.value', '1234567');
  })
})