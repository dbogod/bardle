import { GAME_TITLE } from '../../src/constants/strings';

context('Game initialisation', () => {
  it('It loads successfully', function () {
    cy.visit('/');
    cy.gameReady();
    
    cy.get('[data-game-ready="true"]')
      .invoke('attr', 'data-tile-count')
      .as('tileCount');

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
                const ariaLabel = btn.getAttribute('aria-label');
                return ariaLabel?.length > 0;
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
          .should('have.length', 6)
          .first()
          .within(() => {
            cy.get('> div')
              .should('have.length', this.tileCount);
          });

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