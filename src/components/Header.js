import { BiHelpCircle, BiBarChartAlt2, BiSun } from 'react-icons/bi';
import { GAME_TITLE } from '../constants/strings';

import style from '../styles/Header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <button type="button">
        <BiHelpCircle />
      </button>
      <h1>
        {GAME_TITLE}
      </h1>
      <div className={style['buttons-wrapper']}>
        <button type="button">
          <BiBarChartAlt2 />
        </button>
        <button type="button">
          <BiSun />
        </button>
      </div>
    </header>
  );
};

export default Header;