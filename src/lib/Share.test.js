import {
  generateShareableString
} from './share';
import {
  GAME_TITLE,
  DEFAULT_SQUARE_LIGHT,
  DEFAULT_SQUARE_DARK,
  CORRECT_SQUARE,
  PRESENT_SQUARE,
  CORRECT_STATUS, 
  PRESENT_STATUS, 
  ABSENT_STATUS,
  WINNING_STATUS
} from '../constants/strings';

const mockData = (isLoss, currentTheme) => {
  const gameNumber = 23;
  const isGameLost = isLoss;
  const guessHistoryLoss = [
    [
      { 'char': 'm', 'status': CORRECT_STATUS },
      { 'char': 'a', 'status': PRESENT_STATUS },
      { 'char': 'c', 'status': ABSENT_STATUS },
      { 'char': 'b', 'status': ABSENT_STATUS },
      { 'char': 'e', 'status': ABSENT_STATUS },
      { 'char': 't', 'status': ABSENT_STATUS },
      { 'char': 'h', 'status': ABSENT_STATUS }
    ],
    [
      { 'char': 'm', 'status': CORRECT_STATUS },
      { 'char': 'o', 'status': ABSENT_STATUS },
      { 'char': 'a', 'status': PRESENT_STATUS },
      { 'char': 'n', 'status': PRESENT_STATUS },
      { 'char': 'i', 'status': PRESENT_STATUS },
      { 'char': 'n', 'status': ABSENT_STATUS },
      { 'char': 'g', 'status': ABSENT_STATUS }
    ],
    [
      { 'char': 'm', 'status': CORRECT_STATUS },
      { 'char': 'a', 'status': PRESENT_STATUS },
      { 'char': 'c', 'status': ABSENT_STATUS },
      { 'char': 'b', 'status': ABSENT_STATUS },
      { 'char': 'e', 'status': ABSENT_STATUS },
      { 'char': 't', 'status': ABSENT_STATUS },
      { 'char': 'h', 'status': ABSENT_STATUS }
    ],
    [
      { 'char': 'm', 'status': CORRECT_STATUS },
      { 'char': 'o', 'status': ABSENT_STATUS },
      { 'char': 'a', 'status': PRESENT_STATUS },
      { 'char': 'n', 'status': PRESENT_STATUS },
      { 'char': 'i', 'status': PRESENT_STATUS },
      { 'char': 'n', 'status': ABSENT_STATUS },
      { 'char': 'g', 'status': ABSENT_STATUS }
    ],
    [
      { 'char': 'm', 'status': CORRECT_STATUS },
      { 'char': 'a', 'status': PRESENT_STATUS },
      { 'char': 'c', 'status': ABSENT_STATUS },
      { 'char': 'b', 'status': ABSENT_STATUS },
      { 'char': 'e', 'status': ABSENT_STATUS },
      { 'char': 't', 'status': ABSENT_STATUS },
      { 'char': 'h', 'status': ABSENT_STATUS }
    ],
    [
      { 'char': 'm', 'status': CORRECT_STATUS },
      { 'char': 'o', 'status': ABSENT_STATUS },
      { 'char': 'a', 'status': PRESENT_STATUS },
      { 'char': 'n', 'status': PRESENT_STATUS },
      { 'char': 'i', 'status': PRESENT_STATUS },
      { 'char': 'n', 'status': ABSENT_STATUS },
      { 'char': 'g', 'status': ABSENT_STATUS }
    ]
  ];
  
  const guessHistoryWin = [
    [
      { 'char': 'm', 'status': CORRECT_STATUS },
      { 'char': 'a', 'status': PRESENT_STATUS },
      { 'char': 'c', 'status': ABSENT_STATUS },
      { 'char': 'b', 'status': ABSENT_STATUS },
      { 'char': 'e', 'status': ABSENT_STATUS },
      { 'char': 't', 'status': ABSENT_STATUS },
      { 'char': 'h', 'status': ABSENT_STATUS }
    ],
    [
      { 'char': 'm', 'status': CORRECT_STATUS },
      { 'char': 'o', 'status': ABSENT_STATUS },
      { 'char': 'a', 'status': PRESENT_STATUS },
      { 'char': 'n', 'status': PRESENT_STATUS },
      { 'char': 'i', 'status': PRESENT_STATUS },
      { 'char': 'n', 'status': ABSENT_STATUS },
      { 'char': 'g', 'status': ABSENT_STATUS }
    ],
    [
      { 'char': 'm', 'status': CORRECT_STATUS },
      { 'char': 'i', 'status': PRESENT_STATUS },
      { 'char': 'n', 'status': PRESENT_STATUS },
      { 'char': 'a', 'status': PRESENT_STATUS },
      { 'char': 'r', 'status': PRESENT_STATUS },
      { 'char': 'e', 'status': ABSENT_STATUS },
      { 'char': 't', 'status': ABSENT_STATUS }
    ],
    [
      { 'char': 'q', 'status': ABSENT_STATUS },
      { 'char': 'u', 'status': CORRECT_STATUS },
      { 'char': 'a', 'status': PRESENT_STATUS },
      { 'char': 'r', 'status': CORRECT_STATUS },
      { 'char': 'r', 'status': PRESENT_STATUS },
      { 'char': 'e', 'status': ABSENT_STATUS },
      { 'char': 'l', 'status': ABSENT_STATUS }
    ],
    [
      { 'char': 'm', 'status': WINNING_STATUS },
      { 'char': 'u', 'status': WINNING_STATUS },
      { 'char': 'r', 'status': WINNING_STATUS },
      { 'char': 'r', 'status': WINNING_STATUS },
      { 'char': 'a', 'status': WINNING_STATUS },
      { 'char': 'i', 'status': WINNING_STATUS },
      { 'char': 'n', 'status': WINNING_STATUS }
    ]
  ];
  const guessHistory = isLoss ? guessHistoryLoss : guessHistoryWin;
  const theme = currentTheme;
  return { gameNumber, isGameLost, guessHistory, theme };
};

const expectedResult = (isLoss, theme) => {
  const defaultSquare = theme === 'light' ? DEFAULT_SQUARE_LIGHT : DEFAULT_SQUARE_DARK;
  
  return isLoss ? (
    `${CORRECT_SQUARE}${PRESENT_SQUARE}${defaultSquare}${defaultSquare}${defaultSquare}${defaultSquare}${defaultSquare}\n` +
    `${CORRECT_SQUARE}${defaultSquare}${PRESENT_SQUARE}${PRESENT_SQUARE}${PRESENT_SQUARE}${defaultSquare}${defaultSquare}\n` +
    `${CORRECT_SQUARE}${PRESENT_SQUARE}${defaultSquare}${defaultSquare}${defaultSquare}${defaultSquare}${defaultSquare}\n` +
    `${CORRECT_SQUARE}${defaultSquare}${PRESENT_SQUARE}${PRESENT_SQUARE}${PRESENT_SQUARE}${defaultSquare}${defaultSquare}\n` +
    `${CORRECT_SQUARE}${PRESENT_SQUARE}${defaultSquare}${defaultSquare}${defaultSquare}${defaultSquare}${defaultSquare}\n` +
    `${CORRECT_SQUARE}${defaultSquare}${PRESENT_SQUARE}${PRESENT_SQUARE}${PRESENT_SQUARE}${defaultSquare}${defaultSquare}`
  ) : (
    `${CORRECT_SQUARE}${PRESENT_SQUARE}${defaultSquare}${defaultSquare}${defaultSquare}${defaultSquare}${defaultSquare}\n` +
    `${CORRECT_SQUARE}${defaultSquare}${PRESENT_SQUARE}${PRESENT_SQUARE}${PRESENT_SQUARE}${defaultSquare}${defaultSquare}\n` +
    `${CORRECT_SQUARE}${PRESENT_SQUARE}${PRESENT_SQUARE}${PRESENT_SQUARE}${PRESENT_SQUARE}${defaultSquare}${defaultSquare}\n` +
    `${defaultSquare}${CORRECT_SQUARE}${PRESENT_SQUARE}${CORRECT_SQUARE}${PRESENT_SQUARE}${defaultSquare}${defaultSquare}\n` +
    `${CORRECT_SQUARE}${CORRECT_SQUARE}${CORRECT_SQUARE}${CORRECT_SQUARE}${CORRECT_SQUARE}${CORRECT_SQUARE}${CORRECT_SQUARE}`
  );
};

test('The shareable grid is correct (win, light theme)', () => {
  const { gameNumber, isGameLost, guessHistory, theme } = mockData(false, 'light');
  const grid = expectedResult(false, 'light');
  const result = generateShareableString(gameNumber, isGameLost, guessHistory, theme);
  expect(result).toBe(`${GAME_TITLE} 23 5/6 \n\n${grid}`);
});

test('The shareable grid is correct (win, dark theme)', () => {
  const { gameNumber, isGameLost, guessHistory, theme } = mockData(false, 'dark');
  const grid = expectedResult(false, 'dark');
  const result = generateShareableString(gameNumber, isGameLost, guessHistory, theme);
  expect(result).toBe(`${GAME_TITLE} 23 5/6 \n\n${grid}`);
});

test('The shareable grid is correct (loss, light theme)', () => {
  const { gameNumber, isGameLost, guessHistory, theme } = mockData(true, 'light');
  const grid = expectedResult(true, 'light');
  const result = generateShareableString(gameNumber, isGameLost, guessHistory, theme);
  expect(result).toBe(`${GAME_TITLE} 23 X/6 \n\n${grid}`);
});

test('The shareable grid is correct (loss, dark theme)', () => {
  const { gameNumber, isGameLost, guessHistory, theme } = mockData(true, 'dark');
  const grid = expectedResult(true, 'dark');
  const result = generateShareableString(gameNumber, isGameLost, guessHistory, theme);
  expect(result).toBe(`${GAME_TITLE} 23 X/6 \n\n${grid}`);
});

