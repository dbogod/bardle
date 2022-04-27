import { render, screen, renderHook, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TEST_SOLUTION_1 } from '../constants/strings';
import useBardle from '../hooks/useBardle';
import Keyboard from './Keyboard';

test('All keyboard keys render', () => {
  const { result } = renderHook(() => useBardle());
  render(
    <Keyboard
      markedUpKeyboard={result.current.keyboardKeys}
      keyHandler={result.current.keyHandler}/>
  );

  const kbKeys = screen.queryAllByRole('button');
  expect(kbKeys.length).toBe(29);
});

test('Current guess is updated when clicking keyboard keys', async () => {
  const { result } = renderHook(() => useBardle(TEST_SOLUTION_1));
  const user = userEvent.setup();
  
  render(
    <Keyboard
      markedUpKeyboard={result.current.keyboardKeys}
      keyHandler={result.current.keyHandler}/>
  );

  const kbKeys = screen.queryAllByRole('button');
  const getKey = char => kbKeys.filter(kbKey => kbKey.textContent === char)[0];
  user.click(getKey('a'));
  user.click(getKey('b'));
  user.click(getKey('o'));
  user.click(getKey('o'));
  user.click(getKey('del'));
  user.click(getKey('d'));
  user.click(getKey('e'));
  
  await waitFor(() => {
    expect(result.current.currentGuess).toBe('abode');
  });
});
