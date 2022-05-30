import { getDictionary, getGameNumber, getWordOfTheDay } from './dictionary';
import {
  TEST_SOLUTION_FIVE_LETTERS_1,
  TEST_SOLUTION_SIX_LETTERS,
  TEST_SOLUTION_SEVEN_LETTERS,
  TEST_SOLUTION_EIGHT_LETTERS
} from '../constants/testParams';
import { DAILY_WORD_ARRAY } from '../constants/solutions/solutions_daily';

const mockDate = new Date('April 23, 2022 01:00:00').valueOf();
const getRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

test('The right dictionary is fetched', async () => {
  let dictionary = await getDictionary(TEST_SOLUTION_FIVE_LETTERS_1);
  
  expect(dictionary[0].length).toEqual(TEST_SOLUTION_FIVE_LETTERS_1.length);
  expect(dictionary.length).toBe(12397);

  dictionary = await getDictionary(TEST_SOLUTION_SIX_LETTERS);

  expect(dictionary[0].length).toEqual(TEST_SOLUTION_SIX_LETTERS.length);
  expect(dictionary.length).toBe(22737);

  dictionary = await getDictionary(TEST_SOLUTION_SEVEN_LETTERS);

  expect(dictionary[0].length).toEqual(TEST_SOLUTION_SEVEN_LETTERS.length);
  expect(dictionary.length).toBe(33982);

  dictionary = await getDictionary(TEST_SOLUTION_EIGHT_LETTERS);

  expect(dictionary[0].length).toEqual(TEST_SOLUTION_EIGHT_LETTERS.length);
  expect(dictionary.length).toBe(42601);
});

test('Game number on the mock date is expected value', () => {
  expect(getGameNumber(mockDate)).toBe(43);
});

test('Word of the day on the mock date is as expected', () => {
  expect(getWordOfTheDay(getGameNumber(mockDate))).toBe('valeria');
});

test('Word of the day is 5-8 characters', () => {
  const index = getRandomIndex(0, DAILY_WORD_ARRAY.length - 1);
  const word = getWordOfTheDay(index);
  expect(word.length).toBeGreaterThanOrEqual(5);
  expect(word.length).toBeLessThanOrEqual(8);
});