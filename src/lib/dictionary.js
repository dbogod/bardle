/* eslint-disable */
import axios from 'axios'
import { DAILY_WORD_ARRAY } from '../constants/solutions/solutions_daily'
import { modernDictionary } from '../constants/glossary/modernDictionary'

export const getDictionary = async (solution) => {
  let numberString

  switch (solution.length) {
    case 5:
      numberString = 'five'
      break
    case 6:
      numberString = 'six'
      break
    case 7:
      numberString = 'seven'
      break
    default:
      numberString = 'eight'
  }

  return (
    await import(`../constants/validGuesses/validGuesses_${numberString}`)
  )[`VALID_GUESSES_${numberString.toUpperCase()}`]
}

export const getSolutionDefinition = (word) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${word}&format=json&origin=*`
  return axios
    .get(url)
    .then(({ data }) => {
      if (data.query?.search.length > 0) {
        return data.query?.search[0]
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const getGameNumber = (date) => {
  const epoch = new Date(2022, 2, 11).valueOf()
  // Divide by ms per day to get number of days since epoch
  return Math.floor((date - epoch) / 86400000)
}

export const _getWordOfTheDay = (index) => DAILY_WORD_ARRAY[index]

export const getWordOfTheDay = (id) => {
  const url = `http://shakespeareswords.matous.eu/api/bardle/word-of-the-day?id=${id}`
  return axios.get(url).then(({ data }) => {
    return data
  })
}

export const processGlossary = (glossary) => {
  const basicFiltered = glossary.filter((item) => {
    const { word } = item
    // Is 5-8 letters long
    const isCorrectLength = word.length > 4 && word.length < 9

    // Not in modern dictionary exc proper noun
    const isInModern = !/^[A-Z]/.test(word) && modernDictionary.includes(word)
    // Has only characters A-Z/a-z /apostrophe
    const isAcceptedChars = /^[A-Z']*$/gi.test(word)
    // Ending S (excluding SS)
    const isPlural = /^.*s$/i.test(word) && !/^.*ss$/i.test(word)
    return isCorrectLength && isAcceptedChars && !isInModern && !isPlural
  })

  {
    "DisplayId": 1,
    "Id": 19818,
    "Lines": null,
    "Play": "",
    "Definition": "piece of curved wood forming part of a wheel rim",
    "Word": "felly",
    "Type": "felly (n.)",
    "Success": true,
    "ResponseDescription": "Successful"
}

  console.log({ basicFiltered })

  // // Create lists
  // // Ending ED/'ED but not EED
  // const wordsEndingEd = []
  const endsEd = (word) =>
    /^.*ed$/i.test(word) && word.charAt(word.length - 3) !== 'e'
  // basicFiltered.forEach(({ word }) => {
  //   if (endsEd(word)) {
  //     wordsEndingEd.push(word)
  //   }
  // })

  // console.log({ wordsEndingEd })

  // // Ending ING/'ING
  // const longerWordsEndingIng = []
  const endsIngLong = (word) => /^.{3,}ing$/i.test(word)
  // basicFiltered.forEach(({ word }) => {
  //   if (endsIngLong(word)) {
  //     longerWordsEndingIng.push(word)
  //   }
  // })

  // console.log({ longerWordsEndingIng })

  // // Ending ETH/'ETH
  // const wordsEndingEth = []
  const endsEth = (word) => /^.*eth$/i.test(word)
  // basicFiltered.forEach(({ word }) => {
  //   if (endsEth(word)) {
  //     wordsEndingEth.push(word)
  //   }
  // })

  // console.log({ wordsEndingEth })

  // // Ending 'ST
  // const wordsEndingSt = []
  // const endSt = (word) => /^.*'st$/i.test(word)
  // basicFiltered.forEach(({ word }) => {
  //   if (endSt(word)) {
  //     wordsEndingSt.push(word)
  //   }
  // })

  // console.log({ wordsEndingSt })

  // // 2nd char is apostrophe
  // const wordsWithSecondCharApostrophe = []
  const secondCharApos = (word) => word.charAt(1) === "'"
  // basicFiltered.forEach(({ word }) => {
  //   if (secondCharApos(word)) {
  //     wordsWithSecondCharApostrophe.push(word)
  //   }
  // })

  // console.log({ wordsWithSecondCharApostrophe })

  const completeFiltered = basicFiltered.filter(({ word }) => {
    return (
      !endsEd(word) &&
      !endsEth(word) &&
      !endsIngLong(word) &&
      !secondCharApos(word)
    )
  })

  const words = completeFiltered.map(({ word }) => word.toLowerCase())
  console.log({ words })

  console.log('number of solutions (current):', DAILY_WORD_ARRAY.length)
  const solutionsNotInSxWords = DAILY_WORD_ARRAY.filter(
    (solution) => !words.includes(solution),
  )
  console.log({ solutionsNotInSxWords })

  return completeFiltered
}

export const processCharacters = (items) => {
  const newItems = items
    .map((item) => {
      const newItem = { ...item }
      const nameArray = newItem.Character.split('')
      const indexOfFirstParen = nameArray.indexOf('(')

      newItem.lines = newItem.Lines
      newItem.play = newItem.Play
      newItem.word = nameArray.slice(0, indexOfFirstParen).join('').trim()
      delete newItem.Character
      delete newItem.Lines
      delete newItem.Play

      return newItem
    })
    .filter((newItem) => {
      return (
        newItem.word.length >= 5 &&
        newItem.word.length <= 8 &&
        newItem.lines >= 100
      )
    })

  return newItems
}

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export const updateGlossary = (gloss, chars) => {
  const allItems = [...gloss, ...chars]
  let updated = allItems
    .map((item) => {
      const { word, id, lines, play } = item
      const definition = item.definition
        ? item.definition
        : item.play
        ? `Character from "${item.play}"`
        : ''
      const type = item.type ? item.type : 'Character'

      return {
        id: id || null,
        lines: lines || null,
        play: play || '',
        definition,
        word,
        type,
      }
    })
    .filter(({ word }) => {
      // Not in modern dictionary exc proper noun
      const isInModern = modernDictionary.includes(word.toLowerCase())
      // Has only characters A-Z/a-z /apostrophe
      const isAcceptedChars = /^[A-Z']*$/gi.test(word)

      return !isInModern && isAcceptedChars
    })

  let fiveLetters = []
  let sixLetters = []
  let sevenLetters = []
  let eightLetters = []

  updated.forEach((item) => {
    if (item.play && item.play === 'Double Falsehood') {
      return
    }

    if (item.word.length === 5) {
      fiveLetters.push(item)
    }

    if (item.word.length === 6) {
      sixLetters.push(item)
    }

    if (item.word.length === 7) {
      sevenLetters.push(item)
    }

    if (item.word.length === 8) {
      eightLetters.push(item)
    }
  })

  fiveLetters = shuffle(fiveLetters)
  sixLetters = shuffle(sixLetters)
  sevenLetters = shuffle(sevenLetters)
  eightLetters = shuffle(eightLetters)

  const trimArray = (array) =>
    array.filter((value) => Object.keys(value).length !== 0)

  let finalArray = []
  for (let i = 0; i < fiveLetters.length; i++) {
    finalArray.push(fiveLetters[i])
    finalArray.push(sixLetters[i])
    finalArray.push(sevenLetters[i])
    finalArray.push(eightLetters[i])

    fiveLetters[i] = {}
    sixLetters[i] = {}
    sevenLetters[i] = {}
    eightLetters[i] = {}
  }

  fiveLetters = trimArray(fiveLetters)
  sixLetters = trimArray(sixLetters)
  sevenLetters = trimArray(sevenLetters)
  eightLetters = trimArray(eightLetters)

  for (let i = 0; i < eightLetters.length; i++) {
    finalArray.push(sixLetters[i])
    finalArray.push(sevenLetters[i])
    finalArray.push(eightLetters[i])

    sixLetters[i] = {}
    sevenLetters[i] = {}
    eightLetters[i] = {}
  }

  sixLetters = trimArray(sixLetters)
  sevenLetters = trimArray(sevenLetters)
  eightLetters = trimArray(eightLetters)

  for (let i = 0; i < sixLetters.length; i++) {
    finalArray.push(sixLetters[i])
    finalArray.push(sevenLetters[i])

    sixLetters[i] = {}
    sevenLetters[i] = {}
  }

  sixLetters = trimArray(sixLetters)
  sevenLetters = trimArray(sevenLetters)

  for (let i = 0; i < sevenLetters.length; i++) {
    finalArray.push(sevenLetters[i])

    sevenLetters[i] = {}
  }

  sevenLetters = trimArray(sevenLetters)

  return finalArray
}
