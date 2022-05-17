import { useState, useEffect, useRef, useContext } from 'react';
import throttle from 'lodash/throttle';
import ReactGA from 'react-ga';

import Header from './components/Header';
import Game from './components/Game';
import HowToPlayModal from './components/Modals/HowToPlayModal';
import DevModal from './components/Modals/DevModal';
import AboutModal from './components/Modals/AboutModal';
import StatsModal from './components/Modals/StatsModal';

import { ThemeContext } from './context/Theme';
import { ModalContext } from './context/Modal';

import { getSolutionDefinition } from './lib/dictionary';

import { DAILY_WORD_ARRAY } from './constants/solutions/solutions_daily';

import './styles/main.scss';

export const getGameNumber = date => {
  const epoch = new Date(2022, 2, 11).valueOf();
  return Math.floor((date - epoch) / 86400000);
};

export const getWordOfTheDay = index => DAILY_WORD_ARRAY[index];

if (process?.env?.REACT_APP_GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
}

const App = () => {
  const { currentModal } = useContext(ModalContext);
  const { currentTheme } = useContext(ThemeContext);
  const howToPlayModalRef = useRef();
  const devModalRef = useRef();
  const aboutModalRef = useRef();
  const statsModalRef = useRef();
  const [gameNumber, setGameNumber] = useState(null);
  const [solution, setSolution] = useState(null);
  const [solutionDefinition, setSolutionDefinition] = useState(null);
  const [shareableResult, setShareableResult] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSmScreen, setIsSmScreen] = useState(false);

  useEffect(() => {
    const updateAppHeight = throttle(() => {
      document.documentElement.style.height = `${window.innerHeight}px`;
    }, 100);

    if (window && document?.documentElement) {
      setIsSmScreen(window.innerHeight < 700);
      window.addEventListener('resize', updateAppHeight);
      updateAppHeight();
    }

    if (document?.body?.dataset) {
      document.body.dataset.theme = currentTheme;
    }

    return () => window.removeEventListener('resize', updateAppHeight);
  }, [currentTheme]);

  useEffect(() => {
    const gameNum = getGameNumber(Date.now());
    setGameNumber(gameNum);
    setSolution(getWordOfTheDay(gameNum));
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getSolutionDefinition(solution);
      if (res?.title !== 'Null' && res.snippet) {
        const { snippet, title } = res;
        setSolutionDefinition({ snippet, title });
      }
    })();
  }, [solution]);

  return (
    <>
      {
        gameNumber && solution &&
        <>
          <Header
            howToPlayModalRef={howToPlayModalRef}
            devModalRef={devModalRef}
            aboutModalRef={aboutModalRef}
            statsModalRef={statsModalRef}/>
          <Game
            solution={solution}
            gameNumber={gameNumber}
            statsModalRef={statsModalRef}
            setShareableResult={setShareableResult}
            setIsGameOver={setIsGameOver}
            isSmScreen={isSmScreen}/>
          <HowToPlayModal
            modalRef={howToPlayModalRef}/>
          <DevModal
            modalRef={devModalRef}/>
          <AboutModal
            modalRef={aboutModalRef}/>
          <StatsModal
            modalRef={statsModalRef}
            isOpen={currentModal === 'stats-modal'}
            shareableResult={shareableResult}
            isGameOver={isGameOver}
            solution={solution}
            definition={solutionDefinition}/>
        </>
      }
    </>
  );
};

export default App;
