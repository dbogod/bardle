import { useState, useEffect } from 'react';

import { DAILY_WORD_ARRAY } from '../constants/solutions/solutions_daily';

const useBardle = () => {
  const [gameNumber, setGameNumber] = useState(null);
  const [solution, setSolution] = useState(null);

  const getGameNumber = async () => {
    const epoch = new Date(2022, 2, 11).valueOf();
    return Math.floor((Date.now() - epoch) / 86400000);
  };

  const getWordOfTheDay = index => DAILY_WORD_ARRAY[index];
  
  useEffect(async () => {
    const gameNum = await getGameNumber();
    setGameNumber(gameNum);
    setSolution(getWordOfTheDay(gameNumber));
  });
  
  return { gameNumber, solution };
};

export default useBardle;