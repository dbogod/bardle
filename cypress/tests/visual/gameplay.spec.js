import { TEST_GAME_PARAMS } from '../../../src/constants/testParams';

context('Visual regression', function () {
  it('The game looks right at the end of a winning game (5 letters)', () => {
    cy.playWinningGame(TEST_GAME_PARAMS.five, true);
  });
  it('The game looks right at the end of a winning game (8 letters)', () => {
    cy.playWinningGame(TEST_GAME_PARAMS.eight, true, true);
  });
  it('The game looks right at the end of a losing game (5 letters)', () => {
    cy.playLosingGame(TEST_GAME_PARAMS.five, true, true);
  });
  it('The game looks right at the end of a losing game (8 letters)', () => {
    cy.playLosingGame(TEST_GAME_PARAMS.eight, true);
  });
});