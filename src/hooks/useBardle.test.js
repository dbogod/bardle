import {
  renderHook,
  act,
  cleanup,
  waitFor
} from '@testing-library/react';

import useBardle from './useBardle';

import {
  DEFAULT_STATUS,
  CORRECT_STATUS,
  PRESENT_STATUS,
  ABSENT_STATUS,
  GAME_OVER_MESSAGE_WIN,
  GAME_OVER_MESSAGE_LOSE
} from '../constants/strings';

import {
  TEST_SOLUTION_FIVE_LETTERS_1,
  TEST_SOLUTION_FIVE_LETTERS_2,
  TEST_SOLUTION_FIVE_LETTERS_3,
} from '../constants/testParams';

const typeWord = async (hookInstance, word) => {
  await act(() => {
    [...word].forEach(letter => hookInstance.current.keyHandler({ key: letter }));
  });
};

const hitEnterKey = async hookInstance => {
  await act(() => {
    hookInstance.current.keyHandler({ key: 'Enter' });
  });
};

const enterWord = async (hookInstance, word) => {
  await typeWord(hookInstance, word);
  await hitEnterKey(hookInstance);
};

afterEach(() => {
  cleanup();
});

test('Only certain keys are accepted', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1));

  let isNineNumberValid;
  let isNineStringValid;
  let isAtSymbolValid;
  let isShiftValid;
  let isEValid;
  let isApostropheValid;

  await act(() => {
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

test('Current guess is correctly updated by key handler', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1));

  await act(() => {
    result.current.keyHandler({ key: 'Backspace' });
  });

  expect(result.current.currentGuess).toBe('');

  await typeWord(result, 'fa9');

  expect(result.current.currentGuess).toBe('fa');

  await act(() => {
    result.current.keyHandler({ key: 'Backspace' });
    result.current.keyHandler({ key: 'a' });
    result.current.keyHandler({ key: 'b' });
  });

  expect(result.current.currentGuess).toBe('fab');

  await typeWord(result, 'le');

  expect(result.current.currentGuess).toBe('fable');

  await typeWord(result, 'sss');

  expect(result.current.currentGuess).toBe('fable');

  await act(() => {
    result.current.keyHandler({ key: 'Backspace' });
  });

  expect(result.current.currentGuess).toBe('fabl');
});

test('isGameWon is true if player guesses correctly', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1));

  await waitFor(() => {
    expect(result.current.dictionary.length > 0).toBe(true);
  });

  await typeWord(result, 'abode');

  expect(result.current.currentGuess).toBe('abode');

  await hitEnterKey(result);

  expect(result.current.isGameWon).toBe(true);
});

test('Guess is correctly marked up: ABODE vs ABODE', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1));
  let guess;

  await act(() => {
    guess = result.current.markUpGuess(TEST_SOLUTION_FIVE_LETTERS_1).guessWord;
  });

  expect(guess).toEqual([
    { char: 'a', status: CORRECT_STATUS },
    { char: 'b', status: CORRECT_STATUS },
    { char: 'o', status: CORRECT_STATUS },
    { char: 'd', status: CORRECT_STATUS },
    { char: 'e', status: CORRECT_STATUS }
  ]);
});

test('Guess is correctly marked up: SPLIT vs ABODE', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1));
  let guess;

  await act(() => {
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

test('Guess is correctly marked up: AVOID vs ABODE', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1));
  let guess;

  await act(() => {
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

test('Guess is correctly marked up: BOOKS vs ABODE', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1));
  let guess;

  await act(() => {
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

test('Guess is correctly marked up: LORRY vs RURAL', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_2));
  let guess;

  await act(() => {
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

test('Guess is correctly marked up: TATTY vs TENET', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_3));
  let guess;
  await act(() => {
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

test('addGuess updates guess history as expected', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1));

  await act(() => {
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

  await act(() => {
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

test('Submitting a VALID guess is handled as expected', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_2));

  await waitFor(() => {
    expect(result.current.dictionary.length > 0).toBe(true);
  });

  expect(result.current.guessHistory.length).toBe(0);
  expect(result.current.goNumber).toBe(0);
  expect(result.current.currentGuess).toBe('');
  expect(result.current.isGameWon).toBe(false);

  await typeWord(result, 'abode');

  expect(result.current.guessHistory.length).toBe(0);
  expect(result.current.goNumber).toBe(0);
  expect(result.current.currentGuess).toBe('abode');
  expect(result.current.isGameWon).toBe(false);

  await hitEnterKey(result);

  expect(result.current.guessHistory.length).toBe(1);
  expect(result.current.goNumber).toBe(1);
  expect(result.current.currentGuess).toBe('');
  expect(result.current.isGameWon).toBe(false);

  await typeWord(result, 'fable');

  expect(result.current.guessHistory.length).toBe(1);
  expect(result.current.goNumber).toBe(1);
  expect(result.current.currentGuess).toBe('fable');
  expect(result.current.isGameWon).toBe(false);

  await hitEnterKey(result);

  expect(result.current.guessHistory.length).toBe(2);
  expect(result.current.goNumber).toBe(2);
  expect(result.current.currentGuess).toBe('');
  expect(result.current.isGameWon).toBe(false);

  await typeWord(result, 'rural');

  expect(result.current.guessHistory.length).toBe(2);
  expect(result.current.goNumber).toBe(2);
  expect(result.current.currentGuess).toBe('rural');
  expect(result.current.isGameWon).toBe(false);

  await hitEnterKey(result);

  expect(result.current.guessHistory.length).toBe(3);
  expect(result.current.goNumber).toBe(2);
  expect(result.current.currentGuess).toBe('');
  expect(result.current.isGameWon).toBe(true);
});

test('Submitting a guess of INVALID LENGTH is handled as expected', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_2));

  await typeWord(result, 'abod');

  expect(result.current.guessHistory.length).toBe(0);
  expect(result.current.goNumber).toBe(0);
  expect(result.current.currentGuess).toBe('abod');
  expect(result.current.isGameWon).toBe(false);

  await hitEnterKey(result);

  expect(result.current.guessHistory.length).toBe(0);
  expect(result.current.goNumber).toBe(0);
  expect(result.current.currentGuess).toBe('abod');
  expect(result.current.isGameWon).toBe(false);
});

test('Submitting a guess that is an INVALID WORD is handled as expected', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_2));

  await waitFor(() => {
    expect(result.current.dictionary.length > 0).toBe(true);
  });

  await typeWord(result, 'qwert');

  expect(result.current.guessHistory.length).toBe(0);
  expect(result.current.goNumber).toBe(0);
  expect(result.current.currentGuess).toBe('qwert');
  expect(result.current.isGameWon).toBe(false);

  await hitEnterKey(result);

  expect(result.current.guessHistory.length).toBe(0);
  expect(result.current.goNumber).toBe(0);
  expect(result.current.currentGuess).toBe('qwert');
  expect(result.current.isGameWon).toBe(false);
});

test('Keyboard updates as expected', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1));

  await waitFor(() => {
    expect(result.current.dictionary.length > 0).toBe(true);
  });

  await typeWord(result, 'adept');

  expect(result.current.currentGuess).toBe('adept');

  await hitEnterKey(result);

  expect(result.current.keyboardKeys).toEqual([
    { 'char': 'q', 'status': DEFAULT_STATUS },
    { 'char': 'w', 'status': DEFAULT_STATUS },
    { 'char': 'e', 'status': PRESENT_STATUS },
    { 'char': 'r', 'status': DEFAULT_STATUS },
    { 'char': 't', 'status': ABSENT_STATUS },
    { 'char': 'y', 'status': DEFAULT_STATUS },
    { 'char': 'u', 'status': DEFAULT_STATUS },
    { 'char': 'i', 'status': DEFAULT_STATUS },
    { 'char': 'o', 'status': DEFAULT_STATUS },
    { 'char': 'p', 'status': ABSENT_STATUS },
    { 'char': 'a', 'status': CORRECT_STATUS },
    { 'char': 's', 'status': DEFAULT_STATUS },
    { 'char': 'd', 'status': PRESENT_STATUS },
    { 'char': 'f', 'status': DEFAULT_STATUS },
    { 'char': 'g', 'status': DEFAULT_STATUS },
    { 'char': 'h', 'status': DEFAULT_STATUS },
    { 'char': 'j', 'status': DEFAULT_STATUS },
    { 'char': 'k', 'status': DEFAULT_STATUS },
    { 'char': 'l', 'status': DEFAULT_STATUS },
    { 'char': "'", 'status': DEFAULT_STATUS },
    { 'char': 'enter', 'status': DEFAULT_STATUS },
    { 'char': 'z', 'status': DEFAULT_STATUS },
    { 'char': 'x', 'status': DEFAULT_STATUS },
    { 'char': 'c', 'status': DEFAULT_STATUS },
    { 'char': 'v', 'status': DEFAULT_STATUS },
    { 'char': 'b', 'status': DEFAULT_STATUS },
    { 'char': 'n', 'status': DEFAULT_STATUS },
    { 'char': 'm', 'status': DEFAULT_STATUS },
    { 'char': 'del', 'status': DEFAULT_STATUS }
  ]);

  await typeWord(result, 'toast');

  expect(result.current.currentGuess).toBe('toast');

  await hitEnterKey(result);

  expect(result.current.keyboardKeys).toEqual([
    { 'char': 'q', 'status': DEFAULT_STATUS },
    { 'char': 'w', 'status': DEFAULT_STATUS },
    { 'char': 'e', 'status': PRESENT_STATUS },
    { 'char': 'r', 'status': DEFAULT_STATUS },
    { 'char': 't', 'status': ABSENT_STATUS },
    { 'char': 'y', 'status': DEFAULT_STATUS },
    { 'char': 'u', 'status': DEFAULT_STATUS },
    { 'char': 'i', 'status': DEFAULT_STATUS },
    { 'char': 'o', 'status': PRESENT_STATUS },
    { 'char': 'p', 'status': ABSENT_STATUS },
    { 'char': 'a', 'status': CORRECT_STATUS },
    { 'char': 's', 'status': ABSENT_STATUS },
    { 'char': 'd', 'status': PRESENT_STATUS },
    { 'char': 'f', 'status': DEFAULT_STATUS },
    { 'char': 'g', 'status': DEFAULT_STATUS },
    { 'char': 'h', 'status': DEFAULT_STATUS },
    { 'char': 'j', 'status': DEFAULT_STATUS },
    { 'char': 'k', 'status': DEFAULT_STATUS },
    { 'char': 'l', 'status': DEFAULT_STATUS },
    { 'char': "'", 'status': DEFAULT_STATUS },
    { 'char': 'enter', 'status': DEFAULT_STATUS },
    { 'char': 'z', 'status': DEFAULT_STATUS },
    { 'char': 'x', 'status': DEFAULT_STATUS },
    { 'char': 'c', 'status': DEFAULT_STATUS },
    { 'char': 'v', 'status': DEFAULT_STATUS },
    { 'char': 'b', 'status': DEFAULT_STATUS },
    { 'char': 'n', 'status': DEFAULT_STATUS },
    { 'char': 'm', 'status': DEFAULT_STATUS },
    { 'char': 'del', 'status': DEFAULT_STATUS }
  ]);
});

test('User loses game after submitting 6 wrong guesses', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1));

  const assertExpectations = async (num, isGameLost = false) => {
    const hasNum = num !== null;
    const toastObj = hasNum ? {} : { msg: GAME_OVER_MESSAGE_LOSE, type: 'lose' };

    expect(result.current.guessHistory.length).toBe(hasNum ? num : 6);
    expect(result.current.goNumber).toBe(hasNum ? num : 5);
    expect(result.current.currentGuess).toBe('');
    expect(result.current.isGameWon).toBe(false);
    expect(result.current.isGameLost).toBe(isGameLost);

    await act(() => {
      expect(result.current.toast).toEqual(toastObj);
    });
  };

  const submitIncorrectGuess = async (iteration, isGameLost = false) => {
    await enterWord(result, 'fable');
    await assertExpectations(iteration, isGameLost);
  };

  await waitFor(() => {
    expect(result.current.dictionary.length > 0).toBe(true);
  });

  await assertExpectations(0);
  await submitIncorrectGuess(1);
  await submitIncorrectGuess(2);
  await submitIncorrectGuess(3);
  await submitIncorrectGuess(4);
  await submitIncorrectGuess(5);
  await submitIncorrectGuess(null, true);
});

test('User wins game after submitting 5 wrong guesses and 1 correct guess', async () => {
  const { result } = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1));

  const assertExpectations = async (num, isGameWon = false) => {
    const hasNum = num !== null;
    const toastObj = hasNum ? {} : { msg: GAME_OVER_MESSAGE_WIN, type: 'win' };

    expect(result.current.guessHistory.length).toBe(hasNum ? num : 6);
    expect(result.current.goNumber).toBe(hasNum ? num : 5);
    expect(result.current.currentGuess).toBe('');
    expect(result.current.isGameWon).toBe(isGameWon);
    expect(result.current.isGameLost).toBe(false);

    await act(() => {
      expect(result.current.toast).toEqual(toastObj);
    });
  };

  const submitIncorrectGuess = async (iteration, isGameWon = false) => {
    await enterWord(result, 'fable');
    await assertExpectations(iteration, isGameWon);
  };

  await waitFor(() => {
    expect(result.current.dictionary.length > 0).toBe(true);
  });

  await assertExpectations(0);
  await submitIncorrectGuess(1);
  await submitIncorrectGuess(2);
  await submitIncorrectGuess(3);
  await submitIncorrectGuess(4);
  await submitIncorrectGuess(5);
  await enterWord(result, TEST_SOLUTION_FIVE_LETTERS_1);
  await assertExpectations(null, true);
});