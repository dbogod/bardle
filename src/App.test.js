import { getGameNumber, getWordOfTheDay } from './App';
import { DAILY_WORD_ARRAY } from './constants/solutions/solutions_daily';

const mockDate = new Date('April 23, 2022 01:00:00').valueOf();
const getRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

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