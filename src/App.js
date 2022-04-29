import { useState, useEffect } from 'react';

import Game from './components/Game';
import { DAILY_WORD_ARRAY } from './constants/solutions/solutions_daily';
import './styles/main.scss';

export const getGameNumber = date => {
  const epoch = new Date(2022, 2, 11).valueOf();
  return Math.floor((date - epoch) / 86400000);
};

export const getWordOfTheDay = index => DAILY_WORD_ARRAY[index];

const App = () => {
  const [gameNumber, setGameNumber] = useState(null);
  const [solution, setSolution] = useState(null);
  
  useEffect(() => {
    const gameNum = getGameNumber(Date.now());
    setGameNumber(gameNum);
    setSolution(getWordOfTheDay(gameNum));
  }, []);
  
  return (
    <>
      {
        gameNumber && solution &&
        <Game
          solution="abode"
          gameNumber={gameNumber}/>
      }
    </>
  );
};

export default App;
