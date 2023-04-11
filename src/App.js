import { useState, useEffect, useRef, useContext } from 'react';
import throttle from 'lodash/throttle';

import Header from './components/Header';
import Game from './components/Game';
import HowToPlayModal from './components/Modals/HowToPlayModal';
import DevModal from './components/Modals/DevModal';
import AboutModal from './components/Modals/AboutModal';
import StatsModal from './components/Modals/StatsModal';

import { ThemeContext } from './context/Theme';
import { ModalContext } from './context/Modal';

import { getGameNumber, getWordOfTheDay } from './lib/dictionary';
import { initialiseGoogleAnalytics } from './lib/analytics';

import './styles/main.scss';
const App = () => {
  const { currentModal } = useContext(ModalContext);
  const { currentTheme } = useContext(ThemeContext);
  const howToPlayModalRef = useRef();
  const devModalRef = useRef();
  const aboutModalRef = useRef();
  const statsModalRef = useRef();
  const [gameNumber, setGameNumber] = useState(null);
  const [solution, setSolution] = useState(null);
  const [shareableResult, setShareableResult] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSmScreen, setIsSmScreen] = useState(false);
  const { REACT_APP_GOOGLE_ANALYTICS_ID } = process.env;

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

    const updateSolution = async (wordIndex) => {
      const data = await getWordOfTheDay(wordIndex);
      setSolution(data);
    };

    updateSolution(gameNum);
  }, []);

  useEffect(() => {
    const removeKbNavClass = () => document.body.classList.remove('is-kb-nav');
    const keyboardNavigationHandler = e => {
      if (e?.key === 'Tab') {
        document.body.classList.add('is-kb-nav');
      }
    };

    window.addEventListener('touchstart', removeKbNavClass);
    window.addEventListener('click', removeKbNavClass);
    window.addEventListener('keydown', keyboardNavigationHandler);

    return () => {
      window.removeEventListener('touchstart', removeKbNavClass);
      window.removeEventListener('click', removeKbNavClass);
      window.removeEventListener('keydown', keyboardNavigationHandler);
    };
  });
  
  useEffect(() => {
    if (REACT_APP_GOOGLE_ANALYTICS_ID) {
      initialiseGoogleAnalytics(REACT_APP_GOOGLE_ANALYTICS_ID);
    }
  }, [REACT_APP_GOOGLE_ANALYTICS_ID]);

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
            solution={solution.word}
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
            solution={solution} />
        </>
      }
    </>
  );
};

export default App;
