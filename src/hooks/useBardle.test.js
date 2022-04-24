import { renderHook, act } from '@testing-library/react-hooks';
import useBardle from './useBardle';

test('Game number is integer', () => {
  const { result } = renderHook(() => useBardle());
  let gameNum;
  act(() => {
    gameNum = result.current.getGameNumber(Date.now());
  });
  expect(Number.isInteger(gameNum)).toBe(true);
});