import {
  GAME_TITLE,
  TEST_SOLUTION_1,
  TEST_SOLUTION_SIX_LETTERS,
  TEST_SOLUTION_SEVEN_LETTERS,
  TEST_SOLUTION_EIGHT_LETTERS,
  FILLED_STATUS,
  ABSENT_STATUS,
  PRESENT_STATUS, 
  WINNING_STATUS, 
  CORRECT_STATUS,
} from '../../src/constants/strings';

beforeEach(() => {
  cy.visit('/');
  cy.get('[data-game-ready="true"]')
    .should('be.visible')
    .invoke('attr', 'data-tile-count')
    .as('tileCount');

  cy.wrap(TEST_SOLUTION_1).as('word5');
  cy.wrap(TEST_SOLUTION_SIX_LETTERS).as('word6');
  cy.wrap(TEST_SOLUTION_SEVEN_LETTERS).as('word7');
  cy.wrap(TEST_SOLUTION_EIGHT_LETTERS).as('word8');
});

describe('Bardle', () => {
  it('It loads successfully', function () {
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

  it('The game can be won', function () {
    const completeWord = this[`word${this.tileCount}`];

    cy.get('[data-game-ready="true"] > div')
      .eq(0)
      .within(() => {
        cy.get('> div')
          .each((el) => {
            cy.wrap(el).should('not.have.attr', 'data-status');
          });
      });

    cy.get('body')
      .type(completeWord);

    cy.get('[data-game-ready="true"] > div')
      .eq(0)
      .within(() => {
        cy.get('> div')
          .each((el, i,) => {
            cy.wrap(el)
              .should('have.text', completeWord[i])
              .invoke('attr', 'data-status')
              .should('eq', FILLED_STATUS);
          });
      });

    cy.get('body')
      .type('{enter}')
      .type(completeWord);

    cy.get('[data-game-ready="true"] > div')
      .eq(0)
      .within(() => {
        cy.get('> div')
          .each((el, i,) => {
            cy.wrap(el)
              .should('have.text', completeWord[i])
              .invoke('attr', 'data-status')
              .should('be.oneOf', [ABSENT_STATUS, PRESENT_STATUS, WINNING_STATUS, CORRECT_STATUS]);
          });
      });

    cy.get('[data-game-ready="true"] > div')
      .eq(1)
      .within(() => {
        cy.get('> div')
          .each((el, i,) => {
            cy.wrap(el).should('have.text', completeWord[i]);
          });
      });
  });
});