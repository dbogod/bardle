const isGtagDefined = () => typeof window.gtag !== 'undefined';

const addGoogleAnalyticsScript = id => {
  const gaScriptSrc = `https://www.googletagmanager.com/gtag/js?${id}`;
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = gaScriptSrc;

  if (!document.querySelector(`[src="${gaScriptSrc}"]`)) {
    document.body.appendChild(gaScript);
  }
};

export const initialiseGoogleAnalytics = async id => {
  await addGoogleAnalyticsScript(id);
  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {window.dataLayer.push(arguments);};

  if (isGtagDefined()) {
    window.gtag('js', new Date());
    window.gtag('config', id);
  }
};

export const sendGaEventGameStarted = (gameNumber, solution) => {
  if (isGtagDefined()) {
    window.gtag('event', 'Game started', {
      'event_category': 'Gameplay',
      'event_label': `${gameNumber}: ${solution}`
    });
  }
};

export const sendGaEventGameCompleted = (isGameWon, gameNumber, solution) => {
  if (isGtagDefined()) {
    window.gtag('event', `Game ${isGameWon ? 'won' : 'lost'}`, {
      'event_category': 'Gameplay',
      'event_label': `${gameNumber}: ${solution}`
    });
  }
};