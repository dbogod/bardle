import { renderHook, act } from '@testing-library/react';
import useBardle from './useBardle';

import {
  CORRECT_STATUS,
  PRESENT_STATUS,
  ABSENT_STATUS
} from '../constants/strings';

const TEST_SOLUTION_1 = 'abode';
const TEST_SOLUTION_2 = 'rural';
const TEST_SOLUTION_3 = 'tenet';

test('Only certain keys are accepted', () => {
  const { result } = renderHook(() => useBardle());
  let isNineNumberValid;
  let isNineStringValid;
  let isAtSymbolValid;
  let isShiftValid;
  let isEValid;
  let isApostropheValid;

  act(() => {
    isNineNumberValid = result.current.isValidKey(9);
    isNineStringValid = result.current.isValidKey('9');
    isAtSymbolValid = result.current.isValidKey('@');
    isShiftValid = result.current.isValidKey('Shift');
    isEValid = result.current.isValidKey('e');
    isApostropheValid = result.current.isValidKey('\'');
  });

  expect(isNineNumberValid).toBe(false);
  expect(isNineStringValid).toBe(false);
  expect(isShiftValid).toBe(false);
  expect(isAtSymbolValid).toBe(false);
  expect(isEValid).toBe(true);
  expect(isApostropheValid).toBe(true);
});

test('Current guess is correctly updated by key handler', () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_1));

  act(() => {
    result.current.keyHandler({ key: 'Backspace' });
  });

  expect(result.current.currentGuess).toBe('');

  act(() => {
    result.current.keyHandler({ key: 'f' });
    result.current.keyHandler({ key: 'a' });
    result.current.keyHandler({ key: '9' });
  });

  expect(result.current.currentGuess).toBe('fa');

  act(() => {
    result.current.keyHandler({ key: 'Backspace' });
    result.current.keyHandler({ key: 'a' });
    result.current.keyHandler({ key: 'b' });
  });

  expect(result.current.currentGuess).toBe('fab');

  act(() => {
    result.current.keyHandler({ key: 'l' });
    result.current.keyHandler({ key: 'e' });
  });

  expect(result.current.currentGuess).toBe('fable');

  act(() => {
    result.current.keyHandler({ key: 's' });
    result.current.keyHandler({ key: 's' });
    result.current.keyHandler({ key: 's' });
  });

  expect(result.current.currentGuess).toBe('fable');

  act(() => {
    result.current.keyHandler({ key: 'Backspace' });
  });

  expect(result.current.currentGuess).toBe('fabl');
});

test('isWinningGuess is true if player guesses correctly', () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_1));

  act(() => {
    result.current.keyHandler({ key: 'a' });
    result.current.keyHandler({ key: 'b' });
    result.current.keyHandler({ key: 'o' });
    result.current.keyHandler({ key: 'd' });
    result.current.keyHandler({ key: 'e' });
  });

  expect(result.current.currentGuess).toBe('abode');

  act(() => {
    result.current.keyHandler({ key: 'Enter' });
  });

  expect(result.current.isWinningGuess).toBe(true);
});

test('Guess is correctly marked up: ABODE vs ABODE', () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_1));
  let guess;
  act(() => {
    guess = result.current.markUpGuess(TEST_SOLUTION_1).guessWord;
  });

  expect(guess).toEqual([
    { char: 'a', status: CORRECT_STATUS },
    { char: 'b', status: CORRECT_STATUS },
    { char: 'o', status: CORRECT_STATUS },
    { char: 'd', status: CORRECT_STATUS },
    { char: 'e', status: CORRECT_STATUS }
  ]);
});

test('Guess is correctly marked up: SPLIT vs ABODE', () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_1));
  let guess;
  act(() => {
    guess = result.current.markUpGuess('split').guessWord;
  });

  expect(guess).toEqual([
    { char: 's', status: ABSENT_STATUS },
    { char: 'p', status: ABSENT_STATUS },
    { char: 'l', status: ABSENT_STATUS },
    { char: 'i', status: ABSENT_STATUS },
    { char: 't', status: ABSENT_STATUS }
  ]);
});

test('Guess is correctly marked up: AVOID vs ABODE', () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_1));
  let guess;
  act(() => {
    guess = result.current.markUpGuess('avoid').guessWord;
  });

  expect(guess).toEqual([
    { char: 'a', status: CORRECT_STATUS },
    { char: 'v', status: ABSENT_STATUS },
    { char: 'o', status: CORRECT_STATUS },
    { char: 'i', status: ABSENT_STATUS },
    { char: 'd', status: PRESENT_STATUS }
  ]);
});

test('Guess is correctly marked up: BOOKS vs ABODE', () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_1));
  let guess;
  act(() => {
    guess = result.current.markUpGuess('books').guessWord;
  });

  expect(guess).toEqual([
    { char: 'b', status: PRESENT_STATUS },
    { char: 'o', status: ABSENT_STATUS },
    { char: 'o', status: CORRECT_STATUS },
    { char: 'k', status: ABSENT_STATUS },
    { char: 's', status: ABSENT_STATUS }
  ]);
});

test('Guess is correctly marked up: LORRY vs RURAL', () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_2));
  let guess;
  act(() => {
    guess = result.current.markUpGuess('lorry').guessWord;
  });

  expect(guess).toEqual([
    { char: 'l', status: PRESENT_STATUS },
    { char: 'o', status: ABSENT_STATUS },
    { char: 'r', status: CORRECT_STATUS },
    { char: 'r', status: PRESENT_STATUS },
    { char: 'y', status: ABSENT_STATUS }
  ]);
});

test('Guess is correctly marked up: TATTY vs TENET', () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_3));
  let guess;
  act(() => {
    guess = result.current.markUpGuess('tatty').guessWord;
  });

  expect(guess).toEqual([
    { char: 't', status: CORRECT_STATUS },
    { char: 'a', status: ABSENT_STATUS },
    { char: 't', status: PRESENT_STATUS },
    { char: 't', status: ABSENT_STATUS },
    { char: 'y', status: ABSENT_STATUS }
  ]);
});

test('Guess history updates as expected', () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_1));

  act(() => {
    result.current.addGuess({
      guessWord: [
        { char: 'l', status: ABSENT_STATUS },
        { char: 'o', status: PRESENT_STATUS },
        { char: 'r', status: ABSENT_STATUS },
        { char: 'r', status: ABSENT_STATUS },
        { char: 'y', status: ABSENT_STATUS }
      ],
      keys: result.current.keyboardKeys
    });
  });

  expect(result.current.guessHistory).toEqual([
    [
      { char: 'l', status: ABSENT_STATUS },
      { char: 'o', status: PRESENT_STATUS },
      { char: 'r', status: ABSENT_STATUS },
      { char: 'r', status: ABSENT_STATUS },
      { char: 'y', status: ABSENT_STATUS }
    ]
  ]);

  act(() => {
    result.current.addGuess({
      guessWord: [
        { char: 'a', status: CORRECT_STATUS },
        { char: 'v', status: ABSENT_STATUS },
        { char: 'o', status: CORRECT_STATUS },
        { char: 'i', status: ABSENT_STATUS },
        { char: 'd', status: PRESENT_STATUS }
      ],
      keys: result.current.keyboardKeys
    });
  });

  expect(result.current.guessHistory).toEqual([
    [
      { char: 'l', status: ABSENT_STATUS },
      { char: 'o', status: PRESENT_STATUS },
      { char: 'r', status: ABSENT_STATUS },
      { char: 'r', status: ABSENT_STATUS },
      { char: 'y', status: ABSENT_STATUS }
    ],
    [
      { char: 'a', status: CORRECT_STATUS },
      { char: 'v', status: ABSENT_STATUS },
      { char: 'o', status: CORRECT_STATUS },
      { char: 'i', status: ABSENT_STATUS },
      { char: 'd', status: PRESENT_STATUS }
    ]
  ]);
});

test('Submitting a VALID guess is handled as expected', () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_2));

  expect(result.current.guessHistory.length).toBe(0);
  expect(result.current.goNumber).toBe(0);
  expect(result.current.currentGuess).toBe('');
  expect(result.current.isWinningGuess).toBe(false);

  act(() => {
    result.current.keyHandler({ key: 'a' });
    result.current.keyHandler({ key: 'b' });
    result.current.keyHandler({ key: 'o' });
    result.current.keyHandler({ key: 'd' });
    result.current.keyHandler({ key: 'e' });
  });

  expect(result.current.guessHistory.length).toBe(0);
  expect(result.current.goNumber).toBe(0);
  expect(result.current.currentGuess).toBe('abode');
  expect(result.current.isWinningGuess).toBe(false);

  act(() => {
    result.current.keyHandler({ key: 'Enter' });
  });

  expect(result.current.guessHistory.length).toBe(1);
  expect(result.current.goNumber).toBe(1);
  expect(result.current.currentGuess).toBe('');
  expect(result.current.isWinningGuess).toBe(false);

  act(() => {
    result.current.keyHandler({ key: 'f' });
    result.current.keyHandler({ key: 'a' });
    result.current.keyHandler({ key: 'b' });
    result.current.keyHandler({ key: 'l' });
    result.current.keyHandler({ key: 'e' });
  });

  expect(result.current.guessHistory.length).toBe(1);
  expect(result.current.goNumber).toBe(1);
  expect(result.current.currentGuess).toBe('fable');
  expect(result.current.isWinningGuess).toBe(false);

  act(() => {
    result.current.keyHandler({ key: 'Enter' });
  });

  expect(result.current.guessHistory.length).toBe(2);
  expect(result.current.goNumber).toBe(2);
  expect(result.current.currentGuess).toBe('');
  expect(result.current.isWinningGuess).toBe(false);

  act(() => {
    result.current.keyHandler({ key: 'r' });
    result.current.keyHandler({ key: 'u' });
    result.current.keyHandler({ key: 'r' });
    result.current.keyHandler({ key: 'a' });
    result.current.keyHandler({ key: 'l' });
  });

  expect(result.current.guessHistory.length).toBe(2);
  expect(result.current.goNumber).toBe(2);
  expect(result.current.currentGuess).toBe('rural');
  expect(result.current.isWinningGuess).toBe(false);

  act(() => {
    result.current.keyHandler({ key: 'Enter' });
  });

  expect(result.current.guessHistory.length).toBe(3);
  expect(result.current.goNumber).toBe(3);
  expect(result.current.currentGuess).toBe('');
  expect(result.current.isWinningGuess).toBe(true);

});

test('Submitting an INVALID guess is handled as expected', () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_2));

  act(() => {
    result.current.keyHandler({ key: 'a' });
    result.current.keyHandler({ key: 'b' });
    result.current.keyHandler({ key: 'o' });
    result.current.keyHandler({ key: 'd' });
  });

  expect(result.current.guessHistory.length).toBe(0);
  expect(result.current.goNumber).toBe(0);
  expect(result.current.currentGuess).toBe('abod');
  expect(result.current.isWinningGuess).toBe(false);

  act(() => {
    result.current.keyHandler({ key: 'Enter' });
  });

  expect(result.current.guessHistory.length).toBe(0);
  expect(result.current.goNumber).toBe(0);
  expect(result.current.currentGuess).toBe('abod');
  expect(result.current.isWinningGuess).toBe(false);
});