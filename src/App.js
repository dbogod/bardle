import { useState, useEffect, useRef, useContext } from 'react';

import HtmlHead from './components/HtmlHead';
import Header from './components/Header';
import Game from './components/Game';
import HelpModal from './components/Modals/HelpModal';
import StatsModal from './components/Modals/StatsModal';

import { ModalContext } from './context/Modal';

import { DAILY_WORD_ARRAY } from './constants/solutions/solutions_daily';

import './styles/main.scss';

export const getGameNumber = date => {
  const epoch = new Date(2022, 2, 11).valueOf();
  return Math.floor((date - epoch) / 86400000);
};

export const getWordOfTheDay = index => DAILY_WORD_ARRAY[index];

const App = () => {
  const { currentModal } = useContext(ModalContext);
  const helpModalRef = useRef();
  const statsModalRef = useRef();
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
            helpModalRef={helpModalRef}
            statsModalRef={statsModalRef}/>
          <Game
            solution="abode"
            gameNumber={gameNumber}
            statsModalRef={statsModalRef}/>
          <HelpModal 
            modalRef={helpModalRef}
            isOpen={currentModal === 'instructions-modal'}/>
          <StatsModal 
            modalRef={statsModalRef}
            isOpen={currentModal === 'stats-modal'}/>
        </>
      }
    </>
  );
};

export default App;
