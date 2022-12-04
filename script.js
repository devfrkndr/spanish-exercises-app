'use strict';

const gameFragment = document.createDocumentFragment();

const gameSection = document.createElement('section');
gameSection.classList.add('gameSection');

const gameContainer = document.createElement('div');
gameContainer.classList.add('container');

const gameWordDiv = document.createElement('div');
gameWordDiv.classList.add('gameWordDiv');

const gameWordH = document.createElement('div');
gameWordH.classList.add('gameWordH');

const selectionDiv = document.createElement('div');
selectionDiv.classList.add('selectionDiv');
selectionDiv.setAttribute('id', 'selectionDiv');

gameFragment.appendChild(gameSection);
gameSection.appendChild(gameContainer);
gameContainer.appendChild(gameWordDiv);
gameContainer.appendChild(selectionDiv);
gameWordDiv.appendChild(gameWordH);

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
const startGame = async function () {
  const words = await getWords();
  const alfabeto = words.alfabeto;
  const numeros = words.numeros;
  const masculino = words.masculino;
  const feminino = words.feminino;
  const adjectivosO = words.adjectivos.o;
  const adjectivosOthers = words.adjectivos.others;
  const verbos = words.verbos;
  const preguntas = words.preguntas;
  const dias = words.dias;

  const allWords = alfabeto.concat(
    numeros,
    masculino,
    feminino,
    adjectivosO,
    adjectivosOthers,
    verbos,
    preguntas,
    dias
  );

  const keys = getFirstKeys(allWords);
  const values = getFirstValues(allWords);
  const randomNumbers = getRandomNumbers(keys, values);
  let selectionsList = [];

  function playRound() {
    const randomWord = keys[randomNumbers[0]];
    if (getFirstKeys(masculino).includes(randomWord)) {
      gameWordH.innerText = `el ${randomWord}`;
    } else if (getFirstKeys(feminino).includes(randomWord)) {
      gameWordH.innerText = `la ${randomWord}`;
    } else {
      gameWordH.innerText = `${randomWord}`;
    }
    gameWordH.setAttribute('id', `${randomNumbers[0]}`);
    randomNumbers[1].forEach((e) => {
      const selections = document.createElement('div');
      selections.innerText = values[e];
      selections.classList.add('selections');
      selections.setAttribute('id', `${e}`);
      selectionDiv.append(selections);
      selectionsList.push(selections);
    });
  }

  playRound();

  selectionsList.forEach((e) => {
    e.addEventListener('click', function () {
      if (e.id === gameWordH.id) {
        console.log('true');
        e.style.backgroundColor = '#E5EBB2';
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        e.style.backgroundColor = '#B97A95';
      }
    });
  });
};

startGame();
