export const TEST_SOLUTION_FIVE_LETTERS_1 = 'abode';
export const TEST_SOLUTION_FIVE_LETTERS_2 = 'rural';
export const TEST_SOLUTION_FIVE_LETTERS_3 = 'tenet';
export const TEST_SOLUTION_SIX_LETTERS = 'kingly';
export const TEST_SOLUTION_SEVEN_LETTERS = 'william';
export const TEST_SOLUTION_EIGHT_LETTERS = 'leanness';

export const TEST_DATE_FIVE_LETTERS = Date.UTC(2022, 4, 25); 
export const TEST_DATE_SIX_LETTERS = Date.UTC(2022, 4, 26);
export const TEST_DATE_SEVEN_LETTERS = Date.UTC(2022, 4, 27);
export const TEST_DATE_EIGHT_LETTERS = Date.UTC(2022, 4, 28);

export const TEST_GAME_PARAMS = {
  five: {
    date: TEST_DATE_FIVE_LETTERS,
    incorrectWord: TEST_SOLUTION_FIVE_LETTERS_1
  },
  six: {
    date: TEST_DATE_SIX_LETTERS,
    incorrectWord: TEST_SOLUTION_SIX_LETTERS
  },
  seven: {
    date: TEST_DATE_SEVEN_LETTERS,
    incorrectWord: TEST_SOLUTION_SEVEN_LETTERS
  },
  eight: {
    date: TEST_DATE_EIGHT_LETTERS,
    incorrectWord: TEST_SOLUTION_EIGHT_LETTERS
  }
};