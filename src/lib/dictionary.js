import axios from 'axios';

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

export const getSolutionDefinition = word => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${word}&format=json&origin=*`;
  return axios.get(url)
    .then(({ data }) => {
      if (data.query?.search.length > 0) {
        return data.query?.search[0];
      }
    })
    .catch(err => {
      throw new Error(err);
    });
};