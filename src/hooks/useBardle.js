const useBardle = solution => {
  if (!solution) {
    return;
  }

  const isValidKey = value => /^[A-Za-z']^/.test(value);

  const keyHandler = key => {
    if (key === 'Backspace') {
      // Remove last character
    }

    if (!isValidKey(key)) {
      return;
    }
  };

  return { keyHandler };
};

export default useBardle;