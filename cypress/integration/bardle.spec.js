import { GAME_TITLE } from '../../src/constants/strings';
import { mount } from '@cypress/react';
import App from '../../src/App';

describe('Bardle', () => {
  it('It loads successfully', () => {
    mount(<App />);

    cy.get('header')
      .should('be.visible')
      .within(() => {
        cy.get('h1')
          .should('be.visible')
          .should('contain.text', GAME_TITLE);

        cy.get('button')
          .should('have.length', 5)
          .then(($buttons) => {
            return (
              Cypress.$.makeArray($buttons).filter(btn => {
                return btn.ariaLabel && btn.ariaLabel.length > 0;
              })
            );
          })
          .should('have.length', 5);
      });

    cy.get('[role="dialog"]')
      .should('have.length', 4)
      .not(':visible')
      .should('have.length', 4);

    cy.get('[data-testid="board"]')
      .should('be.visible')
      .within(() => {
        cy.get('> div')
          .should('have.length', 6);

        cy.get('> div > div')
          .each(tile => {
            cy.wrap(tile)
              .invoke('width')
              .should('be.gt', 10);
            cy.wrap(tile)
              .invoke('height')
              .should('be.gt', 10);
          });
      })
      .invoke('height')
      .should('be.gt', 100);

    cy.get('[data-testid="keyboard"]')
      .should('be.visible')
      .within(() => {
        cy.get('div')
          .should('have.length', 3);

        cy.get('button')
          .should('have.length', 29)
          .each(btn => {
            cy.wrap(btn)
              .invoke('width')
              .should('be.gt', 10);
          });
      })
      .invoke('height')
      .should('be.gt', 100);
  });
});