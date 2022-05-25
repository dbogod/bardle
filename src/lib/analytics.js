import ReactGA from 'react-ga';

ReactGA.initialize('dummy', { testMode: true });

export const sendGaEventGameStarted = (gameNumber, solution) => {
  ReactGA.event({
    category: 'Gameplay',
    action: 'Game started',
    label: `${gameNumber}: ${solution}`
  });
};

export const sendGaEventGameCompleted = (isGameWon, gameNumber, solution) => {
  ReactGA.event({
    category: 'Gameplay',
    action: `Game ${isGameWon ? 'won' : 'lost'}`,
    label: `${gameNumber}: ${solution}`
  });
};