import { useState, useEffect, useRef } from 'react';

import HtmlHead from './components/HtmlHead';
import Header from './components/Header';
import Game from './components/Game';
import HelpModal from './components/Modals/HelpModal';
import StatsModal from './components/Modals/StatsModal';

import { DAILY_WORD_ARRAY } from './constants/solutions/solutions_daily';

import './styles/main.scss';

export const getGameNumber = date => {
  const epoch = new Date(2022, 2, 11).valueOf();
  return Math.floor((date - epoch) / 86400000);
};

export const getWordOfTheDay = index => DAILY_WORD_ARRAY[index];

const App = () => {
  const helpModal = useRef();
  const statsModal = useRef();
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
        <>
          <HtmlHead/>
          <Header
            helpModalRef={helpModal}
            statsModalRef={statsModal}/>
          <Game
            solution="abode"
            gameNumber={gameNumber}
            statsModalRef={statsModal}/>
          <HelpModal modalRef={helpModal}/>
          <StatsModal modalRef={statsModal}/>
        </>
      }
    </>
  );
};

export default App;
