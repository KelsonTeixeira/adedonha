import ALPHABET from "./modules/alphabet.js";

const TRIGGER_BTN = document.querySelector("#trigger-btn");
const DISPLAY_LETTER = document.querySelector("#the-letter");
const CLEAR_BUTTON = document.querySelector("#clear-button");
const SAVED = document.querySelector(".raffled p");
const END_GAME = document.querySelector("#endgame");
const STORAGE_ITEM = "letters";

const setLetter = (raffledLetter) => {
  DISPLAY_LETTER.textContent = raffledLetter;
};

const setSavedLetters = () => {
  const letter = getlocalStorageLetters();
  SAVED.textContent = letter;
};

const getlocalStorageLetters = () => {
  const savedLetters = JSON.parse(localStorage.getItem(STORAGE_ITEM));
  const savedLettersList = savedLetters ? savedLetters : [];
  return savedLettersList;
};

const saveLetter = (raffledLetter) => {
  const savedLetters = getlocalStorageLetters();
  savedLetters.push(raffledLetter);
  const stringifiedList = JSON.stringify(savedLetters);
  localStorage.setItem(STORAGE_ITEM, stringifiedList);
};

const raffleLetter = () => {
  const savedLetters = getlocalStorageLetters();
  const isEndOfGame = savedLetters.length >= ALPHABET.length;
  if (isEndOfGame) return null;

  const min = Math.ceil(0);
  const max = Math.floor(22);
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const letterAlreadyRaffled = savedLetters.includes(ALPHABET[randomNumber]);
  if (letterAlreadyRaffled) return raffleLetter();
  return ALPHABET[randomNumber];
};

const animation = async () => {
  return new Promise((resolve, _reject) => {
    let interval;
    let i = 0;
    interval = setInterval(() => {
      i++;
      if (i > 20) {
        clearInterval(interval);
        resolve(true);
      }
      setLetter(ALPHABET[i]);
    }, 50);
  });
};

const initGame = () => {
  setSavedLetters();
};

const setEndGame = (isEndOfGame = false) => {
  if(isEndOfGame) return END_GAME.style.display = "flex";
  return END_GAME.style.display = "none";
};

const triggerRaffle = async () => {
  const raffledLetter = raffleLetter();
  if (raffledLetter === null) return setEndGame(true);

  await animation();
  saveLetter(raffledLetter);
  setLetter(raffledLetter);
  setSavedLetters();
};

TRIGGER_BTN.addEventListener("click", () => {
  TRIGGER_BTN.style.transform = "translate(3px, 3px)";
  setTimeout(() => {
    TRIGGER_BTN.style.transform = "translate(0, 0)";
  }, 150);
  triggerRaffle();
});

CLEAR_BUTTON.addEventListener("click", () => {
  localStorage.clear(STORAGE_ITEM);
  setLetter(ALPHABET[0]);
  setSavedLetters();
  setEndGame()
});

initGame();
