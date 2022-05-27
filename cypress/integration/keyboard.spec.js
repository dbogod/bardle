import {
  ABSENT_STATUS,
  CORRECT_STATUS,
  FILLED_STATUS,
  PRESENT_STATUS,
  WINNING_STATUS,
  TEST_SOLUTION_1,
  TEST_SOLUTION_EIGHT_LETTERS,
  TEST_SOLUTION_SEVEN_LETTERS,
  TEST_SOLUTION_SIX_LETTERS
} from '../../src/constants/strings';

const getRandomLetterIndex = word => Math.floor(Math.random() * (word.length + 1));
const revealedStatusArray = [WINNING_STATUS, CORRECT_STATUS, ABSENT_STATUS, PRESENT_STATUS];

context('Keyboard', () => {
  const sixLetterDate = new Date(2022, 4, 26, 12);

  beforeEach(() => {
    cy.wrap(TEST_SOLUTION_1).as('word5');
    cy.wrap(TEST_SOLUTION_SIX_LETTERS).as('word6');
    cy.wrap(TEST_SOLUTION_SEVEN_LETTERS).as('word7');
    cy.wrap(TEST_SOLUTION_EIGHT_LETTERS).as('word8');
  });

  it('Tapping the keyboard (hardware) works', function () {
    cy.clock(sixLetterDate);
    cy.visit('/');

    cy.get('[data-game-ready="true"]')
      .should('exist');

    const randomNumber = getRandomLetterIndex(this.word6);

    [...this.word6].forEach((letter, i) => {
      cy.get('body')
        .type(i === 0 ? `{backspace}{${letter}}` : letter);

      if (i === randomNumber) {
        cy.get('body')
          .type(`{backspace}{${letter}}`);
      }

      if (i === this.word6.length - 1) {
        cy.get('body')
          .type('xyz');
      }
    });

    cy.get('[data-game-ready="true"] > div')
      .eq(0)
      .within(() => {
        cy.get('> div')
          .each((el, i,) => {
            cy.wrap(el)
              .should('have.text', this.word6[i])
              .invoke('attr', 'data-status')
              .should('eq', FILLED_STATUS);
          });
      });

    cy.get('body')
      .type('{enter}');

    cy.get('[data-game-ready="true"] > div')
      .eq(0)
      .within(() => {
        cy.get('> div')
          .each((el, i,) => {
            cy.wrap(el)
              .should('have.text', this.word6[i])
              .invoke('attr', 'data-status')
              .should('be.oneOf', revealedStatusArray);
          });
      });
  });

  it('Tapping the keyboard (software) works', function () {
    cy.clock(sixLetterDate);
    cy.visit('/');

    cy.get('[data-game-ready="true"]')
      .should('exist');

    const randomNumber = getRandomLetterIndex(this.word6);

    [...this.word6].forEach((letter, i) => {
      cy.get('[data-testid=keyboard]').as('keyboard')
        .within(() => {
          if (i === 0) {
            cy.get('[data-testid=Del]').click();
          }

          cy.get(`[data-testid=${letter}]`).click();

          if (i === randomNumber) {
            cy.get('[data-testid=Del]').click();
            cy.get(`[data-testid=${letter}]`).click();
          }

          if (i === this.word6.length - 1) {
            cy.get('[data-testid=x]').click();
            cy.get('[data-testid=y]').click();
            cy.get('[data-testid=z]').click();
          }
        });
    });

    cy.get('[data-game-ready="true"] > div')
      .eq(0)
      .within(() => {
        cy.get('> div')
          .each((el, i,) => {
            cy.wrap(el)
              .should('have.text', this.word6[i])
              .invoke('attr', 'data-status')
              .should('eq', FILLED_STATUS);
          });
      });

    cy.get('[data-testid=Enter]').click();

    cy.get('[data-game-ready="true"] > div')
      .eq(0)
      .within(() => {
        cy.get('> div')
          .each((el, i,) => {
            cy.wrap(el)
              .should('have.text', this.word6[i])
              .invoke('attr', 'data-status')
              .should('be.oneOf', revealedStatusArray);
          });
      });
  });
});