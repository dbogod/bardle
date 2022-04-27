import { SAVE_GAME_KEY } from '../constants/strings';

export const saveGame = (gameNum, keys, history, goNum, isWon, isLost) => {
  localStorage.setItem(SAVE_GAME_KEY, JSON.stringify({
    gameNum,
    keys,
    history,
    goNum,
    isWon,
    isLost
  }));
};

export const getSavedGame = gameNumber => {
  const savedGame = localStorage?.getItem(SAVE_GAME_KEY);

  if (!savedGame) {
    return null;
  }

  const { gameNum, keys, history, goNum, isWon, isLost } = JSON.parse(localStorage.getItem(SAVE_GAME_KEY));
  
  return gameNum === gameNumber ? { gameNum, keys, history, goNum, isWon, isLost } : null;
};