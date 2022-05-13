
const triggerBtn = document.querySelector('#trigger-btn');

function setLetter(raffledLetter){
  const letter = document.querySelector('#the-letter');
  letter.textContent = raffledLetter;
}

function raffleNumber(){
  const alphabet = [
    "A","B","C","D","E","F","G","H","I","J","L",
    "M","N","O","P","Q","R","S","T","U","V","X","Z"
  ];
  
  const min = Math.ceil(0);
  const max = Math.floor(22);
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return alphabet[randomNumber];
}

function triggerRaffle(){
  let interval;
  let i = 0;
  interval = setInterval(()=> {
    i++;
    if(i > 20){
      clearInterval(interval);
    }
    const raffledLetter = raffleNumber();
    setLetter(raffledLetter);
  }, 50);
}

triggerBtn.addEventListener('mousedown', () => {
  triggerBtn.style.transform = 'translate(3px, 3px)';
  setTimeout(() => {
    triggerBtn.style.transform = 'translate(0, 0)';
  }, 150);
  triggerRaffle();
});

document.addEventListener('keypress', (event) => {
  if(event.code === 'Space'){
    triggerRaffle();
  }
});