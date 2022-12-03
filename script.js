'use strict';

const gameFragment = document.createDocumentFragment();

const gameSection = document.createElement('section');
gameSection.classList.add('gameSection');

const gameContainer = document.createElement('div');
gameContainer.classList.add('container');

const gameWordDiv = document.createElement('div');
gameWordDiv.classList.add('gameWordDiv');

const gameWordH = document.createElement('h1');
gameWordH.classList.add('gameWordH');

const selectionDiv = document.createElement('div');
selectionDiv.classList.add('selectionDiv');

const selection1 = document.createElement('p');
const selection2 = document.createElement('p');
const selection3 = document.createElement('p');
const selection4 = document.createElement('p');
const selection5 = document.createElement('p');

gameFragment.appendChild(gameSection);
gameSection.appendChild(gameContainer);
gameContainer.appendChild(gameWordDiv);
gameContainer.appendChild(selectionDiv);
gameWordDiv.appendChild(gameWordH);
selectionDiv.append(selection1, selection2, selection3, selection4, selection5);

document.body.append(gameFragment);

const getWords = async function () {
  const response = await fetch('./spanish.json');
  const data = await response.json();
  return data;
};

function getFirstKeys(arr) {
  // create a new array to store the keys
  const keys = [];

  // loop over the input array
  for (const obj of arr) {
    // get all the keys of the object
    const objectKeys = Object.keys(obj);
    // if the object has more than one property, include only the first one
    if (objectKeys.length > 1) {
      keys.push(objectKeys[0]);
    } else {
      // if the object has only one property, include it
      keys.push(objectKeys[0]);
    }
  }

  // return the array of keys
  return keys;
}

function getFirstValues(arr) {
  const values = [];
  for (const obj of arr) {
    const objectValues = Object.values(obj);
    if (objectValues.length > 1) {
      values.push(objectValues[0]);
    } else {
      values.push(objectValues[0]);
    }
  }
  return values;
}

function getRandomNumbers(arr1, arr2) {
  // Get a random number from the first array
  const randomNumber = Math.floor(Math.random() * arr1.length);

  // Create an empty array to hold the random numbers from the second array
  const randomNumbers = [];

  // Generate 5 random numbers from the second array
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * arr2.length);
    randomNumbers.push(randomIndex);
  }

  // Make sure one of the random numbers from the second array equals the random number from the first array
  if (!randomNumbers.includes(randomNumber)) {
    randomNumbers[Math.floor(Math.random() * randomNumbers.length)] =
      randomNumber;
  }

  return [randomNumber, randomNumbers];
}

const saveWords = async () => {
  const words = await getWords();
  const alfabeto = words.sustantivos.alfabeto;
  const numeros = words.sustantivos.numeros;
  const masculino = words.sustantivos.masculino;
  const feminino = words.sustantivos.feminino;
  const adjectivosO = words.adjectivos.o;
  const adjectivosOthers = words.adjectivos.others;
  const verbos = words.verbos;

  const allWords = alfabeto.concat(
    numeros,
    masculino,
    feminino,
    adjectivosO,
    adjectivosOthers,
    verbos
  );

  const keys = getFirstKeys(allWords);
  const values = getFirstValues(allWords);

  // console.log(keys);
  // console.log(values);

  const randomNumbers = getRandomNumbers(keys, values);
  console.log(randomNumbers);
  gameWordH.innerText = keys[randomNumbers[0]];
  randomNumbers[1].forEach((e) => {
    const selections = document.createElement('p');
    selections.innerText = values[e];
    selectionDiv.append(selections);
  });
};

saveWords();
