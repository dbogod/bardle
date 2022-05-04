import { BROWSER_TITLE } from '../constants/strings';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { ThemeContext } from '../context/Theme';

const HtmlHead = () => {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <Helmet 
      htmlAttributes={{ lang: 'en-GB', 'data-theme': currentTheme }}>
      <title>
        {BROWSER_TITLE}
      </title>
    </Helmet>
  );
};

export default HtmlHead;