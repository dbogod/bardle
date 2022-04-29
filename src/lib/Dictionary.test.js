import { getDictionary } from './dictionary';
import {
  TEST_SOLUTION_1,
  TEST_SOLUTION_SIX_LETTERS,
  TEST_SOLUTION_SEVEN_LETTERS,
  TEST_SOLUTION_EIGHT_LETTERS
} from '../constants/strings';

test('The right dictionary is fetched', async () => {
  let dictionary = await getDictionary(TEST_SOLUTION_1);
  
  expect(dictionary[0].length).toEqual(TEST_SOLUTION_1.length);
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