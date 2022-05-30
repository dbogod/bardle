import {
  ABSENT_STATUS,
  CORRECT_STATUS,
  FILLED_STATUS,
  PRESENT_STATUS,
  WINNING_STATUS,
} from '../../../src/constants/strings';

import {
  TEST_SOLUTION_SIX_LETTERS,
  TEST_DATE_SIX_LETTERS
} from '../../../src/constants/testParams';

context('Keyboard', () => {
  const getRandomLetterIndex = word => Math.floor(Math.random() * (word.length + 1));
  const revealedStatusArray = [WINNING_STATUS, CORRECT_STATUS, ABSENT_STATUS, PRESENT_STATUS];
  
  beforeEach(() => {
    cy.clock(TEST_DATE_SIX_LETTERS, ['Date']);
    cy.visit('/');
    cy.gameReady();
  });

  it('Tapping the keyboard (hardware) works', function () {
    const randomNumber = getRandomLetterIndex(TEST_SOLUTION_SIX_LETTERS);

    [...TEST_SOLUTION_SIX_LETTERS].forEach((letter, i) => {
      cy.get('body')
        .type(i === 0 ? `{backspace}{${letter}}` : letter);

      if (i === randomNumber) {
        cy.get('body')
          .type(`{backspace}{${letter}}`);
      }

      if (i === TEST_SOLUTION_SIX_LETTERS.length - 1) {
        cy.get('body')
          .type('xyz');
      }
    });

    cy.assertTilesStatus(0, TEST_SOLUTION_SIX_LETTERS, 'eq', FILLED_STATUS);

    cy.hardEnter();
    cy.assertTilesStatus(0, TEST_SOLUTION_SIX_LETTERS, 'be.oneOf', revealedStatusArray);
  });

  it('Tapping the keyboard (software) works', function () {
    const randomNumber = getRandomLetterIndex(TEST_SOLUTION_SIX_LETTERS);
    [...TEST_SOLUTION_SIX_LETTERS].forEach((letter, i) => {
      if (i === 0) {
        cy.softDelete();
      }

      cy.get(`[data-testid=${letter}]`).click();

      if (i === randomNumber) {
        cy.softDelete();
        cy.get(`[data-testid=${letter}]`).click();
      }

      if (i === TEST_SOLUTION_SIX_LETTERS.length - 1) {
        cy.tryWord(0, 'xyz', true, false);
      }
    });

    cy.assertTilesStatus(0, TEST_SOLUTION_SIX_LETTERS, 'eq', FILLED_STATUS);

    cy.softEnter();
    cy.assertTilesStatus(0, TEST_SOLUTION_SIX_LETTERS, 'be.oneOf', revealedStatusArray);
  });
});