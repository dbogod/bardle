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
  CORRECT_STATUS,
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

Cypress.Commands.add('enterWord', (word, softKeys = true) => {
  if (softKeys) {
    cy.get('[data-testid=keyboard]')
      .within(() => {
        [...word].forEach(letter => {
          cy.get(`[data-testid="${letter}"]`).click();
        });
        cy.get('[data-testid=Enter]').click();
      });
  } else {
    cy.get('body').type(`${word}{enter}`);
  }
});

Cypress.Commands.add('playWinningGame', ({ date, incorrectWord }) => {
  const solution = getSolution(date);
  
  cy.clock(date, ['Date']);
  cy.visit('/');

  cy.get('[data-game-ready="true"]')
    .should('exist');

  cy.contains(GAME_OVER_MESSAGE_WIN).should('not.exist');

  cy.enterWord(incorrectWord, false);
  
  cy.get('[data-game-ready="true"] > div')
    .eq(0)
    .within(() => {
      cy.get('> div')
        .each((el, i,) => {
          cy.wrap(el)
            .should('have.text', incorrectWord[i])
            .invoke('attr', 'data-status')
            .should('be.oneOf', revealedStatusArray);
        });
    });
  
  cy.enterWord(incorrectWord);

  cy.get('[data-game-ready="true"] > div')
    .eq(1)
    .within(() => {
      cy.get('> div')
        .each((el, i,) => {
          cy.wrap(el)
            .should('have.text', incorrectWord[i])
            .invoke('attr', 'data-status')
            .should('be.oneOf', revealedStatusArray);
        });
    });
  
  cy.enterWord(solution);

  cy.contains(GAME_OVER_MESSAGE_WIN).should('exist');

  cy.get('[data-game-ready="true"] > div')
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