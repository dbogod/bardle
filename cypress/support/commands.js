// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

import {
  ABSENT_STATUS,
  CORRECT_STATUS, GAME_OVER_MESSAGE_LOSE,
  GAME_OVER_MESSAGE_WIN,
  PRESENT_STATUS,
  WINNING_STATUS
} from '../../src/constants/strings';

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';
import { getGameNumber, getWordOfTheDay } from '../../src/lib/dictionary';

const revealedStatusArray = [CORRECT_STATUS, ABSENT_STATUS, PRESENT_STATUS];
const getSolution = date => {
  const gameNumber = getGameNumber(date);
  return getWordOfTheDay(gameNumber);
};

Cypress.Commands.add('gameReady', () => cy.get('[data-game-ready="true"]').should('exist'));

Cypress.Commands.add('softEnter', () => cy.get('[data-testid="Enter"]').click());
Cypress.Commands.add('hardEnter', () => cy.get('body').type('{enter}'));
Cypress.Commands.add('softDelete', () => cy.get('[data-testid="Del"]').click());
Cypress.Commands.add('hardDelete', () => cy.get('body').type('{backspace}'));

Cypress.Commands.add('tryWord', (word, softKeys = true, pressEnter = true) => {
  if (softKeys) {
    cy.get('[data-testid="keyboard"]')
      .within(() => {
        [...word].forEach(letter => {
          cy.get(`[data-testid="${letter}"]`).click();
        });
        pressEnter && cy.softEnter();
      });
  } else {
    cy.get('body').type(word);
    pressEnter && cy.hardEnter();
  }
});

Cypress.Commands.add('assertTilesStatus', (rowIndex, word, shouldOperator, shouldValue) => {
  cy.get('[data-game-ready="true"] > div')
    .eq(0)
    .within(() => {
      cy.get('> div')
        .each((el, i,) => {
          cy.wrap(el)
            .should('have.text', word[i])
            .invoke('attr', 'data-status')
            .should(shouldOperator, shouldValue);
        });
    });
});

Cypress.Commands.add('playWinningGame', ({ date, incorrectWord }) => {
  const solution = getSolution(date);

  cy.clock(date, ['Date']);
  cy.visit('/');
  cy.gameReady();

  cy.contains(GAME_OVER_MESSAGE_WIN).should('not.exist');

  cy.tryWord(incorrectWord, false);
  cy.assertTilesStatus(0, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(incorrectWord);
  cy.assertTilesStatus(1, incorrectWord, 'be.oneOf', revealedStatusArray);

  cy.tryWord(solution);
  cy.contains(GAME_OVER_MESSAGE_WIN).should('exist');
  cy.get('[data-game-ready="true"] > div', { timeout: 8000 })
    .eq(2)
    .within(() => {
      cy.get('> div')
        .each((el, i,) => {
          cy.wrap(el)
            .should('have.text', solution[i])
            .invoke('attr', 'data-status')
            .should('eq', WINNING_STATUS);
        });
    });

  cy.get('#stats-modal').should('be.visible');
});

Cypress.Commands.add('playLosingGame', ({ date, incorrectWord }) => {
  cy.clock(date, ['Date']);
  cy.visit('/');
  cy.gameReady();

  cy.contains(GAME_OVER_MESSAGE_LOSE).should('not.exist');

  cy.tryWord(incorrectWord, false);
  cy.assertTilesStatus(0, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(incorrectWord);
  cy.assertTilesStatus(1, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(incorrectWord, false);
  cy.assertTilesStatus(2, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(incorrectWord);
  cy.assertTilesStatus(3, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(incorrectWord, false);
  cy.assertTilesStatus(4, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(incorrectWord);
  cy.assertTilesStatus(5, incorrectWord, 'be.oneOf', revealedStatusArray);

  cy.contains(GAME_OVER_MESSAGE_LOSE).should('exist');

  cy.get('#stats-modal').should('be.visible');
});