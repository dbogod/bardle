import ReactGA from 'react-ga';

export const sendGaEventGameStarted = (gameNumber, solution) => {
  ReactGA.event({
    category: 'Game started',
    label: `${gameNumber}: ${solution}`
  });
};

export const sendGaEventGameCompleted = (isGameWon, gameNumber, solution) => {
  ReactGA.event({
    category: 'Game completed',
    action: `Game ${isGameWon ? 'won' : 'lost'}`,
    label: `${gameNumber}: ${solution}`
  });
};