import { SAVE_GAME_KEY, THEME_KEY, STATS_KEY } from '../constants/strings';

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

export const saveStats = (gamesPlayed, gamesWon, currentStreak, maxStreak, winDist) => {
  localStorage.setItem(STATS_KEY, JSON.stringify({
    gamesPlayed,
    gamesWon,
    currentStreak,
    maxStreak,
    winDist
  }));
};

export const getStats = async () => {
  const savedStats = localStorage?.getItem(STATS_KEY);

  if (!savedStats) {
    // Initiate stats in storage 
    await saveStats(0, 0, 0, 0, [ 0, 0, 0, 0, 0, 0 ]);
  }

  const { gamesPlayed, gamesWon, currentStreak, maxStreak, winDist } = JSON.parse(localStorage.getItem(STATS_KEY));
  return { gamesPlayed, gamesWon, currentStreak, maxStreak, winDist };
};

export const updateStats = async (isGameWon, goNumber) => {
  const { gamesPlayed, gamesWon, currentStreak, maxStreak, winDist } = await getStats();

  const updatedGamesPlayed = gamesPlayed + 1;
  const updatedGamesWon = isGameWon ? gamesWon + 1 : gamesWon;
  const updatedCurrentStreak = isGameWon ? currentStreak + 1 : 0;
  const updatedMaxStreak = Math.max(updatedCurrentStreak, maxStreak);
  const updatedWinDist = winDist;

  if (isGameWon) {
    updatedWinDist[goNumber] = updatedWinDist[goNumber] + 1;
  }
  
  saveStats(updatedGamesPlayed, updatedGamesWon, updatedCurrentStreak, updatedMaxStreak, updatedWinDist);
};

export const saveThemePreference = theme => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getThemePreference = () => {
  const savedTheme = localStorage?.getItem(THEME_KEY);

  if (!savedTheme) {
    return null;
  }

  return localStorage.getItem(THEME_KEY);
};