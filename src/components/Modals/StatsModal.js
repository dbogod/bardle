import { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import PropTypes from 'prop-types';

import Modal from './Modal';
import { getStats } from '../../lib/localStorage';
import { shareResult } from '../../lib/share';

import style from '../../styles/Modal.module.scss';

const StatsModal = ({ isGameOver, isOpen, modalRef, shareableResult }) => {
  const [statsToDisplay, setStatsToDisplay] = useState(null);

  const clickHandler = () => {
    shareResult(shareableResult);
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

  return (
    <Modal
      id="stats-modal"
      title="Statistics"
      modalRef={modalRef}>
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
      <div>
        <p
          role="heading"
          aria-level="2">
          Next Bardle
        </p>
        <Countdown date={tomorrow.valueOf()}/>
        {
          isGameOver &&
          <button
            onClick={clickHandler}
            type="button">
            Share
          </button>
        }
      </div>
    </Modal>
  );
};

StatsModal.propTypes = {
  isGameOver: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modalRef: PropTypes.object.isRequired,
  shareableResult: PropTypes.string.isRequired
};

export default StatsModal;

