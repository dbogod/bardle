import { UAParser } from 'ua-parser-js';
import { GAME_TITLE } from '../constants/strings';

export const shareResult = text => {
  const parser = new UAParser();
  const device = parser.getDevice();

  if (
    ['mobile', 'tablet', 'wearable'].includes(device.type) &&
    navigator.canShare &&
    navigator.canShare({ text }) &&
    navigator.share
  ) {
    navigator.share({ text });
  } else if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text);
  }
};

export const generateShareableString = (gameNumber, isGameLost, guessHistory, theme) => {
  const grid = guessHistory.map(guess => {
    return guess.map(tile => {
      switch (tile.status) {
        case 'hamlet':
          return '🟩';
        case 'juliet':
          return '🟨';
        default:
          return theme === 'light' ? '⬜' : '⬛';
      }
    }).join('');
  }).join('\n');

  return `${GAME_TITLE} ${gameNumber} ${isGameLost ? 'X' : guessHistory.length}\n\n${grid}`;
};