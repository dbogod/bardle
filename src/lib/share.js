import { UAParser } from 'ua-parser-js';
import { 
  CORRECT_STATUS, 
  PRESENT_STATUS,
  WINNING_STATUS, 
  GAME_TITLE,
  DEFAULT_SQUARE_LIGHT,
  DEFAULT_SQUARE_DARK,
  CORRECT_SQUARE,
  PRESENT_SQUARE
} from '../constants/strings';

export const shareResult = (text, url) => {
  const parser = new UAParser();
  const device = parser.getDevice();

  if (
    ['mobile', 'tablet', 'wearable'].includes(device.type) &&
    navigator.canShare &&
    navigator.canShare({ url, text }) &&
    navigator.share
  ) {
    navigator.share({ url, text });
  } else if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text);
  }
};

export const generateShareableString = (gameNumber, isGameLost, guessHistory, theme) => {
  const grid = guessHistory.map(guess => {
    return guess.map(tile => {
      switch (tile.status) {
        case CORRECT_STATUS:
        case WINNING_STATUS:
          return CORRECT_SQUARE;
        case PRESENT_STATUS:
          return PRESENT_SQUARE;
        default:
          return theme === 'light' ? DEFAULT_SQUARE_LIGHT : DEFAULT_SQUARE_DARK;
      }
    }).join('');
  }).join('\n');

  return `${GAME_TITLE} ${gameNumber} ${isGameLost ? 'X' : guessHistory.length}/6 \n\n${grid}\n`;
};