import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { ThemeContext } from '../context/Theme';

const HtmlHead = () => {
  const { currentTheme } = useContext(ThemeContext);
  return (
    <Helmet  htmlAttributes={{ lang: 'en-GB', 'data-theme': currentTheme }}/>
  );
};

export default HtmlHead;