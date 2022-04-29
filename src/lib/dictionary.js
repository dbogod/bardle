export const getDictionary = async solution => {
  let numberString;

  switch (solution.length) {
    case 5:
      numberString = 'five';
      break;
    case 6:
      numberString = 'six';
      break;
    case 7:
      numberString = 'seven';
      break;
    default:
      numberString = 'eight';
  }
  
  return (
    await import(
      `../constants/validGuesses/validGuesses_${numberString}`
    ))[`VALID_GUESSES_${numberString.toUpperCase()}`];
};