import { saveGame, getSavedGame, saveThemePreference, getThemePreference } from './localStorage';
import { SAVE_GAME_KEY, SAVE_THEME_KEY } from '../constants/strings';

const mockData = {
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

const { gameNum, keys, history, goNum, isWon, isLost } = mockData;

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });
});

test('Game data can be saved to/retrieved from local storage', () => {
  saveGame(gameNum, keys, history, goNum, isWon, isLost);
  
  const storedData = window.localStorage.getItem(SAVE_GAME_KEY);
  
  expect(storedData).toEqual(JSON.stringify(mockData));
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