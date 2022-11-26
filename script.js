'use strict';

const getWords = async function () {
  const response = await fetch('./spanish.json');
  const data = await response.json();
  console.log(data.o);
  return data;
};

const words = getWords();

console.log(words);
