import { TEST_GAME_PARAMS } from '../../src/constants/testParams';

context('Winning game', function () {
  it('The game can be won (five letters)', () => {
    cy.playWinningGame(TEST_GAME_PARAMS.five);
  });
  it('The game can be won (six letters)', () => {
    cy.playWinningGame(TEST_GAME_PARAMS.six);
  });
  it('The game can be won (seven letters)', () => {
    cy.playWinningGame(TEST_GAME_PARAMS.seven);
  });
  it('The game can be won (eight letters)', () => {
    cy.playWinningGame(TEST_GAME_PARAMS.eight);
  });
});

context('Losing game', function () {
  it('The game can be lost (five letters)', () => {
    cy.playLosingGame(TEST_GAME_PARAMS.five);
  });
  it('The game can be lost (six letters)', () => {
    cy.playLosingGame(TEST_GAME_PARAMS.six);
  });
  it('The game can be lost (seven letters)', () => {
    cy.playLosingGame(TEST_GAME_PARAMS.seven);
  });
  it('The game can be lost (eight letters)', () => {
    cy.playLosingGame(TEST_GAME_PARAMS.eight);
  });
});