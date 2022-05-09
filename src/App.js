import { useState, useEffect, useRef, useContext } from 'react';

import HtmlHead from './components/HtmlHead';
import Header from './components/Header';
import Game from './components/Game';
import HelpModal from './components/Modals/HelpModal';
import AboutModal from './components/Modals/AboutModal';
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
  const aboutModalRef = useRef();
  const statsModalRef = useRef();
  const [gameNumber, setGameNumber] = useState(null);
  const [solution, setSolution] = useState(null);
  const [shareableResult, setShareableResult] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

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
            aboutModalRef={aboutModalRef}
            statsModalRef={statsModalRef}/>
          <Game
            solution="abode"
            gameNumber={gameNumber}
            statsModalRef={statsModalRef}
            setShareableResult={setShareableResult}
            setIsGameOver={setIsGameOver}/>
          <HelpModal 
            modalRef={helpModalRef}
            isOpen={currentModal === 'instructions-modal'}/>
          <AboutModal
            modalRef={aboutModalRef}
            isOpen={currentModal === 'about-modal'}/>
          <StatsModal 
            modalRef={statsModalRef}
            isOpen={currentModal === 'stats-modal'}
            shareableResult={shareableResult}
            isGameOver={isGameOver}/>
        </>
      }
    </>
  );
};

export default App;
