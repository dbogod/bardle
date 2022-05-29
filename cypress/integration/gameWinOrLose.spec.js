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
  it('The game can be won (five letters)', () => {
    cy.playWinningGame(gameParams.five);
  });
  it('The game can be won (six letters)', () => {
    cy.playWinningGame(gameParams.six);
  });
  it('The game can be won (seven letters)', () => {
    cy.playWinningGame(gameParams.seven);
  });
  it('The game can be won (eight letters)', () => {
    cy.playWinningGame(gameParams.eight);
  });
});

context('Losing game', function () {
  it('The game can be lost (five letters)', () => {
    cy.playLosingGame(gameParams.five);
  });
  it('The game can be lost (six letters)', () => {
    cy.playLosingGame(gameParams.six);
  });
  it('The game can be lost (seven letters)', () => {
    cy.playLosingGame(gameParams.seven);
  });
  it('The game can be lost (eight letters)', () => {
    cy.playLosingGame(gameParams.eight);
  });
});