import {
  TEST_SOLUTION_1,
  TEST_SOLUTION_SIX_LETTERS,
  TEST_SOLUTION_SEVEN_LETTERS,
  TEST_SOLUTION_EIGHT_LETTERS
} from '../../src/constants/strings';

const gameParams = {
  five: {
    date: Date.UTC(2022, 4, 25),
    incorrectWord: TEST_SOLUTION_1
  },
  six: {
    date: Date.UTC(2022, 4, 26),
    incorrectWord: TEST_SOLUTION_SIX_LETTERS
  },
  seven: {
    date: Date.UTC(2022, 4, 27),
    incorrectWord: TEST_SOLUTION_SEVEN_LETTERS
  },
  eight: {
    date: Date.UTC(2022, 4, 28),
    incorrectWord: TEST_SOLUTION_EIGHT_LETTERS
  }
};

context('Winning game', function () {
  it.only('The game can be won (five letters)', () => {
    cy.playWinningGame(gameParams.five);
  });
  it.only('The game can be won (six letters)', () => {
    cy.playWinningGame(gameParams.six);
  });
  it.only('The game can be won (seven letters)', () => {
    cy.playWinningGame(gameParams.seven);
  });
  it.only('The game can be won (eight letters)', () => {
    cy.playWinningGame(gameParams.eight);
  });
});