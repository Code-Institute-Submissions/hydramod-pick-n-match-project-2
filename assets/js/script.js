//**navbar**//

//Select the button element
let button = document.querySelector(".navbar-toggler");

//Select the menu element
let menu = document.querySelector(".navbar-collapse");

//Add a click event listener to the button element
button.addEventListener("click", function () {
  //Toggle the "collapse" class on the menu element
  menu.classList.toggle("collapse");
});

//**smooth scrolling**//

// Select all links with "#" href
let links = document.querySelectorAll('a[href^="#"]');

// Iterate through the links
for (let i = 0; i < links.length; i++) {
  let link = links[i];

  // Add click event listener to each link
  link.addEventListener("click", function (event) {
    event.preventDefault();

    // Get the target element's id
    let targetId = this.getAttribute("href");
    let target = document.querySelector(targetId);

    // Animate the scroll to the target element
    let scrollOptions = {
      left: 0,
      top: target.getBoundingClientRect().top + window.pageYOffset,
      behavior: "smooth"
    };
    window.scrollTo(scrollOptions);
  });
};

/**The Game**/

// Getting game elements
const intro = document.querySelector('.intro-home');
const gameArea = document.querySelector('.game');
const displayLives = document.querySelector('.lives');
const background = document.querySelector('.game-end-home');
let playerLives = 6;
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let result = params.result;
const introSound = new Audio('./assets/audio/Elevator-Music-(Kevin MacLeod).mp3')
const flipSound = new Audio('./assets/audio/card-flip.mp3');
const gameOverSound = new Audio('./assets/audio/game-over.mp3');
const winSound = new Audio('./assets/audio/winner.mp3');

// set player lives
if(displayLives){
  displayLives.textContent = playerLives;
};

//get images and put into array
const getImages = () => [
  {imgSrc: "./assets/images/butterfly.jpg", name: "butterfly"},
  {imgSrc: "./assets/images/cat.jpg", name: "cat"},
  {imgSrc: "./assets/images/dog.jpg", name: "dog"},
  {imgSrc: "./assets/images/dolphin.jpg", name: "dolphin"},
  {imgSrc: "./assets/images/eagle.jpg", name: "eagle"},
  {imgSrc: "./assets/images/elephant.jpg", name: "elephant"},
  {imgSrc: "./assets/images/fish.jpg", name: "fish"},
  {imgSrc: "./assets/images/fox.jpg", name: "fox"},
  {imgSrc: "./assets/images/frog.jpg", name: "frog"},
  {imgSrc: "./assets/images/gorilla.jpg", name: "gorilla"},
  {imgSrc: "./assets/images/lion.jpg", name: "lion"},
  {imgSrc: "./assets/images/owl.jpg", name: "owl"},
  {imgSrc: "./assets/images/ram.jpg", name: "ram"},
  {imgSrc: "./assets/images/stag.jpg", name: "stag"},
  {imgSrc: "./assets/images/tiger.jpg", name: "tiger"},
  {imgSrc: "./assets/images/wolf.jpg", name: "wolf"},
  {imgSrc: "./assets/images/butterfly.jpg", name: "butterfly"},
  {imgSrc: "./assets/images/cat.jpg", name: "cat"},
  {imgSrc: "./assets/images/dog.jpg", name: "dog"},
  {imgSrc: "./assets/images/dolphin.jpg", name: "dolphin"},
  {imgSrc: "./assets/images/eagle.jpg", name: "eagle"},
  {imgSrc: "./assets/images/elephant.jpg", name: "elephant"},
  {imgSrc: "./assets/images/fish.jpg", name: "fish"},
  {imgSrc: "./assets/images/fox.jpg", name: "fox"},
  {imgSrc: "./assets/images/frog.jpg", name: "frog"},
  {imgSrc: "./assets/images/gorilla.jpg", name: "gorilla"},
  {imgSrc: "./assets/images/lion.jpg", name: "lion"},
  {imgSrc: "./assets/images/owl.jpg", name: "owl"},
  {imgSrc: "./assets/images/ram.jpg", name: "ram"},
  {imgSrc: "./assets/images/stag.jpg", name: "stag"},
  {imgSrc: "./assets/images/tiger.jpg", name: "tiger"},
  {imgSrc: "./assets/images/wolf.jpg", name: "wolf"}
];

//randomize images array
const randomize = () => {
  let cardInfo = getImages();
  cardInfo.sort(() => Math.random() - 0.5);
  return cardInfo;
};

//game generate
const cardGen = () => {
  let cardInfo = randomize();

  //generate html, looping through all images
  cardInfo.forEach(item => {
    let card = document.createElement('div');
    let front = document.createElement('img');
    let back = document.createElement('div');
    card.classList = 'card';
    front.classList = 'front';
    back.classList = 'back';

    //Adding image source and animal name
    front.src = item.imgSrc;
    card.setAttribute('name', item.name);
    card.setAttribute('alt', item.name);
    back.setAttribute('alt', 'Question mark');
    back.setAttribute('aria-label', 'Flip Card');

    //Dsiplay cardInfo on screen
    gameArea.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    //flip the cards when clicked
    card.addEventListener('click', (event) => {
      flipSound.play();
      card.classList.toggle('flipCard');
      checkMatch(event);
    });
  });
};

//check if cards match
const checkMatch = (event) => {
  let clickedCard = event.target;
  //add flipped attribute to track flipped cards
  clickedCard.classList.add('flipped');
  let flippedCards = document.querySelectorAll('.flipped');
  //Track flip attribute
  let flipCard = document.querySelectorAll('.flipCard');
  
  if(flippedCards.length === 2) {
    if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
      //remove flipped attribute so the game keeps going
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        //make cards unclickable after a match
        card.style.pointerEvents = 'none';
      });
    } else {
      //remove flipped/flipCard attribute so the game keeps going
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('flipCard'), 1500);
      });
      //update player lives on screen and send to game over screen
      playerLives--;
      displayLives.textContent = playerLives;
      if(playerLives === 0) {
        window.location.href = 'game-end.html?result=lose';
      };
    };
  };
  //check if game is won
  if(flipCard.length === 32) {
    window.location.href = 'game-end.html?result=win';
  };
};

//Reset the game
const resetGame = () => {
  let cardInfo = randomize();
  let front = document.querySelectorAll('.front');
  let card = document.querySelectorAll('.card');
  let back = document.createElement('div');
  cardInfo.forEach((item, i) => {
    card[i].classList.remove('toggleCard');
    //reset and randomize cards
    setTimeout(() => {
      card[i].style.pointerEvents = 'all';
      front[i].src = item.imgSrc;
      card[i].setAttribute('name', item.name);
      card[i].setAttribute('alt', item.name);
      back.setAttribute('alt', 'Question mark');
      back.setAttribute('aria-label', 'Flip Card');
    }, 1000);
  });
  playerLives = 6;
  displayLives.textContent = playerLives;
};

//generate the game
if(gameArea){
  cardGen();
  //button for reset
  document.getElementById('reset').onclick = resetGame;
};

//set images and sound effects for game end screen
if(result === 'lose') {
  background.style.backgroundImage = 'url("./assets/images/gameover.jpg")';
  gameOverSound.play();
} else if (result === 'win') {
  background.style.backgroundImage = 'url("./assets/images/youwin.jpg")';
  winSound.play();
};

//add elevator music for intro and gameplay (because i found it funny)
if(intro || gameArea) {
  window.addEventListener('click', function () {
    introSound.play();
  });
}

