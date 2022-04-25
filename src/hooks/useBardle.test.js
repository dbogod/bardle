import { renderHook, act } from '@testing-library/react';
import useBardle from './useBardle';

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
  const { result } = renderHook(() => useBardle('abode'));
  
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
  const { result } = renderHook(() => useBardle('abode'));

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