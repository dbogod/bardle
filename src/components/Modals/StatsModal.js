import Countdown from 'react-countdown';
import PropTypes from 'prop-types';

import Modal from './Modal';

import style from '../../styles/Modal.module.scss';

const StatsModal = ({ modalRef }) => {
  const winDist = [0, 4, 19, 16, 8, 3];
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
            <td>54</td>
            <td>50</td>
            <td>4</td>
            <td>9</td>
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
      <p role="heading" aria-level="2">
        Next Bardle:
      </p>
      <Countdown date={tomorrow.valueOf()} />
    </Modal>
  );
};

StatsModal.propTypes = {
  modalRef: PropTypes.object.isRequired
};

export default StatsModal;

