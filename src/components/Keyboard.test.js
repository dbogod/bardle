import {
  render,
  screen,
  renderHook,
  waitFor,
  cleanup,
  act
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useBardle from '../hooks/useBardle';

import Keyboard from './Keyboard';

import { RevealProvider } from '../context/Reveal';

import { TEST_SOLUTION_FIVE_LETTERS_1 } from '../constants/testParams';

let result;

beforeEach(async () => {
  const wrapper = ({ children }) => <RevealProvider>{children}</RevealProvider>;
  result = renderHook(() => useBardle(47, TEST_SOLUTION_FIVE_LETTERS_1), { wrapper }).result;

  await act(async () => {
    await result.current.fetchDictionary();
  });
});

afterEach(() => {
  cleanup();
});

test('All keyboard keys render', async () => {
  render(
    <Keyboard
      markedUpKeyboard={result.current.keyboardKeys}
      keyHandler={result.current.keyHandler}/>
  );

  const kbKeys = screen.queryAllByRole('button');
  expect(kbKeys.length).toBe(29);
});

test('Current guess is updated when clicking keyboard keys', async () => {
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
  user.click(getKey('Del'));
  user.click(getKey('d'));
  user.click(getKey('e'));

  await waitFor(() => {
    expect(result.current.currentGuessWord).toBe('abode');
  });
});

test('You can tab through the keyboard', async () => {
  const { getByText } = render(
    <Keyboard
      markedUpKeyboard={result.current.keyboardKeys}
      keyHandler={result.current.keyHandler}/>
  );
  const user = userEvent.setup();
  const qButton = getByText('q');
  const wButton = getByText('w');
  const eButton = getByText('e');

  expect(qButton).toBeInTheDocument();
  expect(wButton).toBeInTheDocument();
  expect(eButton).toBeInTheDocument();

  user.tab({ shift: false });
  await waitFor(() => expect(qButton).toHaveFocus());

  user.tab({ shift: false });
  await waitFor(() => expect(wButton).toHaveFocus());

  user.tab({ shift: false });
  await waitFor(() => expect(eButton).toHaveFocus());

  user.tab({ shift: true });
  await waitFor(() => expect(wButton).toHaveFocus());

  user.tab({ shift: false });
  await waitFor(() => expect(eButton).toHaveFocus());
});
