import { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import PropTypes from 'prop-types';
import { BsShareFill } from 'react-icons/bs';

import Modal from './Modal';
import { GAME_TITLE } from '../../constants/strings';
import { getStats } from '../../lib/localStorage';
import { shareResult } from '../../lib/share';

import style from '../../styles/Modal.module.scss';

const StatsModal = ({ isGameOver, isOpen, modalRef, shareableResult, solution, definition }) => {
  const [statsToDisplay, setStatsToDisplay] = useState(null);
  
  let definitionHtml;
  
  if (definition?.snippet && definition?.snippet.length > 10) {
    const snippetWithHtmlRemoved = definition.snippet.replace(/<[^>]*>/g, '');
    const charCount = Math.min(snippetWithHtmlRemoved.length, 140);
    definitionHtml =`${snippetWithHtmlRemoved.substring(0, charCount)}...`;
  }

  const clickHandler = () => {
    shareResult(shareableResult, window.location.href);
  };

  useEffect(() => {
    const getStatsToDisplay = async () => {
      const savedStats = await getStats();
      setStatsToDisplay(savedStats);
    };

    getStatsToDisplay();
  }, [isOpen]);

  if (!statsToDisplay) {
    return (
      <></>
    );
  }

  const { gamesPlayed, gamesWon, currentStreak, maxStreak, winDist } = statsToDisplay;
  const maxValue = Math.max(...winDist);
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  const solutionTitle = GAME_TITLE ?? 'solution';

  return (
    <Modal
      id="stats-modal"
      title="Statistics"
      modalRef={modalRef}>
      <div className={style['inner-wrapper']}>
        <table className={style['stats-table']}>
          <thead>
            <tr>
              <th scope="col">Played</th>
              <th scope="col">Won</th>
              <th scope="col">Current streak</th>
              <th scope="col">Max streak</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{gamesPlayed}</td>
              <td>{gamesWon}</td>
              <td>{currentStreak}</td>
              <td>{maxStreak}</td>
            </tr>
          </tbody>
        </table>
        <table className={style['stats-histogram']}>
          <caption>
            Guess distribution
          </caption>
          <tbody>
            {
              winDist.map((value, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td style={{ width: `${(100 / maxValue) * value}%` }}>
                    <span>
                      {value}
                    </span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          isGameOver &&
          <>
            <div className={style['solution-wrapper']}>
              <span>Today&apos;s {solutionTitle} was:</span>
              <a href={`https://www.google.com/search?q=${solution}+definition`}>
                <span className={style.solution}>{solution}</span>
              </a>

              {
                definitionHtml &&
                <p dangerouslySetInnerHTML={{ __html: definitionHtml }}/>
              }
              
            </div>
            <div className={style['clock-and-share-wrapper']}>
              <div>
                <p
                  role="heading"
                  aria-level="2">
                  Next {solutionTitle}
                </p>
                <div className={style.clock}>
                  <Countdown
                    date={tomorrow.valueOf()}
                    daysInHours={true}/>
                </div>
              </div>
              <div>
                <button
                  className={style.share}
                  onClick={clickHandler}
                  type="button">
                  <span>Share</span>
                  <BsShareFill/>
                </button>
              </div>
            </div>
          </>
        }
      </div>
    </Modal>
  );
};

StatsModal.propTypes = {
  isGameOver: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modalRef: PropTypes.object.isRequired,
  shareableResult: PropTypes.string.isRequired,
  solution: PropTypes.string.isRequired,
  definition: PropTypes.object
};

export default StatsModal;

