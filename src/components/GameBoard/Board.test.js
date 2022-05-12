import {
  render,
  screen
} from '@testing-library/react';

import Board from './Board';
import {
  CORRECT_STATUS,
  PRESENT_STATUS,
  ABSENT_STATUS
} from '../../constants/strings';

let guessHistory;
let currentGuess;
let wordLength;
const boardWrapperSelector = 'board-wrapper';
const boardSelector = 'board';

beforeEach(() => {
  guessHistory = [
    [
      { char: 'd', status: PRESENT_STATUS },
      { char: 'r', status: ABSENT_STATUS },
      { char: 'e', status: PRESENT_STATUS },
      { char: 'a', status: PRESENT_STATUS },
      { char: 'm', status: ABSENT_STATUS }
    ],
    [
      { char: 'a', status: CORRECT_STATUS },
      { char: 'd', status: PRESENT_STATUS },
      { char: 'o', status: CORRECT_STATUS },
      { char: 'b', status: PRESENT_STATUS },
      { char: 'e', status: CORRECT_STATUS }
    ]
  ];

  currentGuess = '';
  wordLength = 5;
});

test('The board renders', () => {
  render(
    <Board
      rowAnimation={''}
      isSmScreen={false}
      guessHistory={guessHistory}
      currentGuess={currentGuess}
      wordLength={wordLength}/>
  );
  
  const wrappers = screen.queryAllByTestId(boardWrapperSelector);
  
  expect(wrappers.length).toBe(1);
  
  const boards = screen.queryAllByTestId(boardSelector);

  expect(boards.length).toBe(1);
  
  const rows = boards[0]?.children;
  
  expect(rows.length).toBe(6);
  
  const firstRowTiles = rows[0].children;
  
  expect(firstRowTiles.length).toBe(wordLength);
});

test('Guessed words are rendered', () => {
  render(
    <Board
      rowAnimation={''}
      isSmScreen={false}
      guessHistory={guessHistory}
      currentGuess={currentGuess}
      wordLength={wordLength}/>
  );

  const boards = screen.queryAllByTestId(boardSelector);

  expect(boards.length).toBe(1);

  const rows = boards[0]?.children;

  expect(rows.length).toBe(6);

  const firstRowTiles = rows[0]?.children;

  expect(firstRowTiles.length).toBe(wordLength);

  for (let i = 0; i < firstRowTiles.length; i++) {
    expect(firstRowTiles[i].textContent).toBe(guessHistory[0][i].char);
    expect(firstRowTiles[i].dataset.status).toBe(guessHistory[0][i].status);
  }

  const secondRowTiles = rows[1].children;

  expect(secondRowTiles.length).toBe(wordLength);

  for (let i = 0; i < secondRowTiles.length; i++) {
    expect(secondRowTiles[i].textContent).toBe(guessHistory[1][i].char);
    expect(secondRowTiles[i].dataset.status).toBe(guessHistory[1][i].status);
  }

  const thirdRowTiles = rows[2].children;

  expect(thirdRowTiles.length).toBe(wordLength);

  for (let i = 0; i < thirdRowTiles.length; i++) {
    expect(thirdRowTiles[i].textContent).toBe('');
  }
});

test('Six tiles are rendered', () => {
  wordLength = 6;
  render(
    <Board
      rowAnimation={''}
      isSmScreen={false}
      guessHistory={[]}
      currentGuess={''}
      wordLength={wordLength}/>
  );

  const firstRowTiles = screen.queryAllByTestId(boardSelector)[0]?.children[0].children;

  expect(firstRowTiles.length).toBe(wordLength);
});

test('Seven tiles are rendered', () => {
  wordLength = 7;
  render(
    <Board
      rowAnimation={''}
      isSmScreen={false}
      guessHistory={[]}
      currentGuess={''}
      wordLength={wordLength}/>
  );

  const firstRowTiles = screen.queryAllByTestId(boardSelector)[0]?.children[0].children;

  expect(firstRowTiles.length).toBe(wordLength);
});

test('Eight tiles are rendered', () => {
  wordLength = 8;
  render(
    <Board
      rowAnimation={''}
      isSmScreen={false}
      guessHistory={[]}
      currentGuess={''}
      wordLength={wordLength}/>
  );

  const firstRowTiles = screen.queryAllByTestId(boardSelector)[0]?.children[0].children;

  expect(firstRowTiles.length).toBe(wordLength);
});