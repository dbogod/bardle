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
import {
  ABSENT_STATUS,
  CORRECT_STATUS, FILLED_STATUS, GAME_OVER_MESSAGE_LOSE,
  GAME_OVER_MESSAGE_WIN,
  PRESENT_STATUS,
  WINNING_STATUS
} from '../../src/constants/strings';

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

Cypress.Commands.add('tryWord', (rowIndex, word, softKeys = true, pressEnter = true) => {
  if (softKeys) {
    [...word].forEach(letter => {
      cy.get(`[data-testid="${letter}"]`).click();
    });
  } else {
    cy.get('body').type(word);
  }

  if (pressEnter) {
    cy.assertTilesStatus(rowIndex, word, 'eq', FILLED_STATUS).then(() => {
      softKeys ?  cy.softEnter() : cy.hardEnter();
    });
  }
});

Cypress.Commands.add('assertTilesStatus', (rowIndex, word, shouldOperator, shouldValue) => {
  cy.get('[data-game-ready="true"] > div')
    .eq(rowIndex)
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

Cypress.Commands.add('playWinningGame', ({ date, incorrectWord }, snapshot= false, darkMode = false) => {
  const solution = getSolution(date);
  const modeString = darkMode ? 'dark mode' : 'light mode';

  cy.clock(date, ['Date']);
  cy.visit('/');
  cy.gameReady();
  
  darkMode && cy.get('[data-testid="theme-toggle"]').click().blur();

  snapshot && cy.percySnapshot(`Blank game (${incorrectWord.length}-letter grid), ${modeString}`);

  cy.contains(GAME_OVER_MESSAGE_WIN).should('not.exist');

  cy.tryWord(0, incorrectWord, false);
  cy.assertTilesStatus(0, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(1, incorrectWord);
  cy.assertTilesStatus(1, incorrectWord, 'be.oneOf', revealedStatusArray);

  cy.tryWord(2, solution);
  cy.contains(GAME_OVER_MESSAGE_WIN).should('exist');
  cy.assertTilesStatus(2, solution, 'eq', WINNING_STATUS);

  snapshot && cy.percySnapshot(`End game (${incorrectWord.length}-letter grid), ${modeString} - win`);

  cy.get('#stats-modal').should('be.visible');

  snapshot && cy.percySnapshot(`Status modal (${incorrectWord.length}-letter grid), ${modeString} - win`);
});

Cypress.Commands.add('playLosingGame', ({ date, incorrectWord }, snapshot = false, darkMode = false) => {
  const modeString = darkMode ? 'dark mode' : 'light mode';
  
  cy.clock(date, ['Date']);
  cy.visit('/');
  cy.gameReady();

  darkMode && cy.get('[data-testid="theme-toggle"]').click().blur();

  cy.contains(GAME_OVER_MESSAGE_LOSE).should('not.exist');

  cy.tryWord(0, incorrectWord, false);
  cy.assertTilesStatus(0, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(1, incorrectWord);
  cy.assertTilesStatus(1, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(2, incorrectWord, false);
  cy.assertTilesStatus(2, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(3, incorrectWord);
  cy.assertTilesStatus(3, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(4, incorrectWord, false);
  cy.assertTilesStatus(4, incorrectWord, 'be.oneOf', revealedStatusArray);
  cy.tryWord(5, incorrectWord);
  cy.assertTilesStatus(5, incorrectWord, 'be.oneOf', revealedStatusArray);

  cy.contains(GAME_OVER_MESSAGE_LOSE).should('exist');

  snapshot && cy.percySnapshot(`End game (${incorrectWord.length}-letter grid), ${modeString} - lose`);

  cy.get('#stats-modal').should('be.visible');

  snapshot && cy.percySnapshot(`Status modal (${incorrectWord.length}-letter grid), ${modeString} - lose`);
});