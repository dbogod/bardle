import { 
  saveGame, 
  getSavedGame, 
  saveThemePreference, 
  getThemePreference,
  saveStats,
  getStats,
  updateStats
} from './localStorage';
import { 
  SAVE_GAME_KEY, 
  STATS_KEY
} from '../constants/strings';

const mockSavedGame = {
  'gameNum': 47,
  'keys': [
    { 'char': 'q', 'status': 'default' },
    { 'char': 'w', 'status': 'iago' },
    { 'char': 'e', 'status': 'hamlet' },
    { 'char': 'r', 'status': 'iago' },
    { 'char': 't', 'status': 'default' },
    { 'char': 'y', 'status': 'iago' },
    { 'char': 'u', 'status': 'default' },
    { 'char': 'i', 'status': 'default' },
    { 'char': 'o', 'status': 'hamlet' },
    { 'char': 'p', 'status': 'iago' },
    { 'char': 'a', 'status': 'hamlet' },
    { 'char': 's', 'status': 'default' },
    { 'char': 'd', 'status': 'hamlet' },
    { 'char': 'f', 'status': 'default' },
    { 'char': 'g', 'status': 'default' },
    { 'char': 'h', 'status': 'default' },
    { 'char': 'j', 'status': 'default' },
    { 'char': 'k', 'status': 'default' },
    { 'char': 'l', 'status': 'iago' },
    { 'char': "'", 'status': 'default' },
    { 'char': 'enter', 'status': 'default' },
    { 'char': 'z', 'status': 'default' },
    { 'char': 'x', 'status': 'default' },
    { 'char': 'c', 'status': 'iago' },
    { 'char': 'v', 'status': 'default' },
    { 'char': 'b', 'status': 'hamlet' },
    { 'char': 'n', 'status': 'default' },
    { 'char': 'm', 'status': 'default' },
    { 'char': 'del', 'status': 'default' }
  ],
  'history': [
    [
      { 'char': 'a', 'status': 'hamlet' },
      { 'char': 'l', 'status': 'iago' },
      { 'char': 'l', 'status': 'iago' },
      { 'char': 'o', 'status': 'juliet' },
      { 'char': 'w', 'status': 'iago' }
    ],
    [
      { 'char': 'p', 'status': 'iago' },
      { 'char': 'e', 'status': 'juliet' },
      { 'char': 'r', 'status': 'iago' },
      { 'char': 'c', 'status': 'iago' },
      { 'char': 'y', 'status': 'iago' }
    ],
    [
      { 'char': 'a', 'status': 'hamlet' },
      { 'char': 'b', 'status': 'hamlet' },
      { 'char': 'o', 'status': 'hamlet' },
      { 'char': 'd', 'status': 'hamlet' },
      { 'char': 'e', 'status': 'hamlet' }
    ]
  ],
  'goNum': 3,
  'isWon': true,
  'isLost': false
};

const mockStats = {
  'gamesPlayed': 10,
  'gamesWon': 7,
  'currentStreak': 2,
  'lastGame': 23,
  'maxStreak': 4,
  'winDist': [0, 0, 2, 3, 1, 1]
};

const mockLocalStorage = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    }
  };
})();

const { gameNum, keys, history, goNum, isWon, isLost } = mockSavedGame;
const { gamesPlayed, gamesWon, currentStreak, lastGame, maxStreak, winDist } = mockStats;

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });
});

test('Game data can be saved to/retrieved from local storage', () => {
  saveGame(gameNum, keys, history, goNum, isWon, isLost);
  
  const storedData = window.localStorage.getItem(SAVE_GAME_KEY);
  
  expect(storedData).toEqual(JSON.stringify(mockSavedGame));
  expect(getSavedGame(47)).toEqual(JSON.parse(storedData));
  window.localStorage.clear();
});

test('Game theme can be saved to/retrieved from local storage', () => {
  saveThemePreference('dark');
  let retrievedTheme = getThemePreference();
  expect(retrievedTheme).toEqual('dark');

  saveThemePreference('foo');
  retrievedTheme = getThemePreference();
  expect(retrievedTheme).toEqual('foo');
  window.localStorage.clear();
});

test('Stats are saved', () => {
  saveStats(gamesPlayed, gamesWon, currentStreak, lastGame, maxStreak, winDist);
  
  const storedData = window.localStorage.getItem(STATS_KEY);
  
  expect(storedData).toEqual(JSON.stringify(mockStats));
  window.localStorage.clear();
});

test('Stats are retrieved', async () => {
  saveStats(gamesPlayed, gamesWon, currentStreak, lastGame, maxStreak, winDist);

  const storedData = await getStats();

  expect(storedData).toEqual(mockStats);
  window.localStorage.clear();
});

test('Stats are updated correctly after win', async () => {
  saveStats(gamesPlayed, gamesWon, currentStreak, lastGame, maxStreak, winDist);
  await updateStats(true, 3, 24);
  const storedData = await getStats();

  expect(storedData).toEqual({
    'gamesPlayed': 11,
    'gamesWon': 8,
    'currentStreak': 3,
    'lastGame': 24,
    'maxStreak': 4,
    'winDist': [0, 0, 2, 4, 1, 1]
  });
  
  window.localStorage.clear();
});

test('Initiated stats are updated correctly after win', async () => {
  saveStats(0, 0, 0, null, 0, [0, 0, 0, 0, 0, 0]);
  await updateStats(true, 3, 24);
  const storedData = await getStats();

  expect(storedData).toEqual({
    'gamesPlayed': 1,
    'gamesWon': 1,
    'currentStreak': 1,
    'lastGame': 24,
    'maxStreak': 1,
    'winDist': [0, 0, 0, 1, 0, 0]
  });

  window.localStorage.clear();
});

test('Stats are updated correctly after loss', async () => {
  saveStats(gamesPlayed, gamesWon, currentStreak, lastGame, maxStreak, winDist);
  await updateStats(false, 3, 24);
  const storedData = await getStats();

  expect(storedData).toEqual({
    'gamesPlayed': 11,
    'gamesWon': 7,
    'currentStreak': 0,
    'lastGame': 24,
    'maxStreak': 4,
    'winDist': [0, 0, 2, 3, 1, 1]
  });

  window.localStorage.clear();
});

test('Stats are not updated twice for the same game', async () => {
  saveStats(gamesPlayed, gamesWon, currentStreak, lastGame, maxStreak, winDist);
  await updateStats(true, 3, 23);
  const storedData = await getStats();

  expect(storedData).toEqual(mockStats);

  window.localStorage.clear();
});