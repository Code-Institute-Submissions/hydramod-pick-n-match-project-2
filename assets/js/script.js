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
const gameGrid = document.querySelector('.grid');

const displayLives = document.querySelector('.lives');
let playerLives;

const background = document.querySelector('.game-end-home');
const startButtonEasy = document.querySelector('.button-start-easy');
const startButtonMedium = document.querySelector('.button-start-medium');
const startButtonHard = document.querySelector('.button-start-hard');
const startButtonReset = document.querySelector('.button-start-reset');
const endButton = document.querySelector('.button-end');

//get difficulty level and game result from url query
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let result = params.result;
let difficulty = params.difficulty;

//set sound effects paths
let buttonSound = './assets/audio/button.mp3';
let introSound = './assets/audio/Elevator-Music-(Kevin MacLeod).mp3';
let flipSound = './assets/audio/card-flip.mp3';
let matchSound = './assets/audio/match.mp3';
let noMatchSound = './assets/audio/nomatch.mp3';
let gameOverSound = './assets/audio/game-over.mp3';
let winSound = './assets/audio/winner.mp3';


//lazy load sounds for efficiency
const loadSound = (path, callback) => {
  const audio = new Audio();
  audio.addEventListener('canplaythrough', () => {
    console.log(`${path} loaded`);
    callback(audio);
  });
  audio.src = path;
};

//Factory pattern to manage creation and caching of audio elements. 
//play sound effect when called
const soundFactory = (() => {
  const sounds = {};

  const loadSound = (audioPath, callback) => {
    const audio = new Audio(audioPath);
    audio.addEventListener('loadeddata', () => {
      callback(audio);
    });
  };

  return {
    play: (audioPath) => {
      if (!sounds[audioPath]) {
        loadSound(audioPath, (audio) => {
          sounds[audioPath] = audio;
          audio.play();
        });
      } else {
        sounds[audioPath].play();
      }
    }
  };
})();

const playSound = (audioPath) => {
  soundFactory.play(audioPath);
};

// set player lives
if(displayLives){
  displayLives.textContent = playerLives;
};

// Get images and put into an array
const getImages = () => [
  { imgSrc: "./assets/images/butterfly.webp", name: "butterfly" },
  { imgSrc: "./assets/images/cat.webp", name: "cat" },
  { imgSrc: "./assets/images/dog.webp", name: "dog" },
  { imgSrc: "./assets/images/dolphin.webp", name: "dolphin" },
  { imgSrc: "./assets/images/eagle.webp", name: "eagle" },
  { imgSrc: "./assets/images/elephant.webp", name: "elephant" },
  { imgSrc: "./assets/images/fish.webp", name: "fish" },
  { imgSrc: "./assets/images/fox.webp", name: "fox" },
  { imgSrc: "./assets/images/frog.webp", name: "frog" },
  { imgSrc: "./assets/images/gorilla.webp", name: "gorilla" },
  { imgSrc: "./assets/images/lion.webp", name: "lion" },
  { imgSrc: "./assets/images/owl.webp", name: "owl" },
  { imgSrc: "./assets/images/ram.webp", name: "ram" },
  { imgSrc: "./assets/images/stag.webp", name: "stag" },
  { imgSrc: "./assets/images/tiger.webp", name: "tiger" },
  { imgSrc: "./assets/images/wolf.webp", name: "wolf" },
];

// Shuffle the array and return only matched pairs for the game to work
const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate game according to difficulty
const cardGen = (difficulty) => {
  let cardCount, gridColumns, gridRows;
  switch (difficulty) {
    case "easy":
      cardCount = 6;
      gridColumns = "repeat(3, 1fr)";
      gridRows = "repeat(4, 8rem)";
      playerLives = 6;
      break;
    case "medium":
      cardCount = 12;
      gridColumns = "repeat(4, 1fr)";
      gridRows = "repeat(6, 8rem)";
      playerLives = 4;
      break;
    case "hard":
      cardCount = 16;
      gridColumns = "repeat(4, 1fr)";
      gridRows = "repeat(8, 8rem)";
      playerLives = 4;
      break;
    default:
      cardCount = 6;
      gridColumns = "repeat(, 1fr)";
      gridRows = "repeat(2, 8rem)";
      playerLives = 6;
  }

  let cardInfo = shuffle(getImages());
  const pairs = cardInfo.slice(0, cardCount);
  const shuffledPairs = shuffle([...pairs, ...pairs]);

  // Set up grid according to game difficulty
  gameGrid.style.gridTemplateColumns = gridColumns;
  gameGrid.style.gridTemplateRows = gridRows;

  // Update displayLives element with the new value
  if(displayLives){
    displayLives.textContent = playerLives;
  };

  saveDifficulty(difficulty);

  // Generate HTML for each card
  shuffledPairs.forEach((item) => {
    let card = document.createElement("div");
    let front = document.createElement("img");
    let back = document.createElement("div");
    card.classList = "card";
    front.classList = "front";
    back.classList = "back";

    // Add image source and animal name
    front.src = item.imgSrc;
    card.setAttribute("name", item.name);
    card.setAttribute("alt", item.name);
    back.setAttribute("alt", "Question mark");
    back.setAttribute("aria-label", "Flip Card");

    // Display card on screen
    gameArea.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    // Flip the cards when clicked
    card.addEventListener("click", (event) => {
      playSound(flipSound);
      card.classList.toggle("flipCard");
      checkMatch(event);
    });
  });

  // Flip all cards over for a short time, then flip them back
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.add("flipCard");
    card.style.pointerEvents = 'none';
  });
  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove("flipCard");
      card.style.pointerEvents = 'auto';
    });
  }, 7500); // adjust delay time
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
      playSound(matchSound);
      playerLives++;
      displayLives.textContent = playerLives;
      //remove flipped attribute so the game keeps going
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.classList.add('matched');
        //make cards unclickable after a match
        card.style.pointerEvents = 'none';
      });
    } else {
      playSound(noMatchSound);
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
  if(difficulty === 'easy' && flipCard.length === 12) {
    window.location.href = 'game-end.html?result=win';
  } else if(difficulty === 'medium' && flipCard.length === 24) {
    window.location.href = 'game-end.html?result=win';
  } else if(difficulty === 'hard' && flipCard.length === 32) {
    window.location.href = 'game-end.html?result=win';
  };
};

// Save difficulty level after game is played
const saveDifficulty = (difficulty) => {
  localStorage.setItem('difficulty', difficulty);
};

let storedDifficulty = localStorage.getItem('difficulty');

// Reset the game with difficulty level
const resetGame = (storedDifficulty) => {
  let cardCount;
  if (storedDifficulty === 'easy') {
    cardCount = 6; // set 6 card pairs for easy difficulty
    playerLives = 6;
  } else if (storedDifficulty === 'medium') {
    cardCount = 12; // set 12 card pairs for medium difficulty
    playerLives = 4;
  } else if (storedDifficulty === 'hard') {
    cardCount = 16; // set 16 card pairs for hard difficulty
    playerLives = 4;
  } else {
    // default to easy difficulty
    cardCount = 6;
    playerLives = 6;

  }

  let cardInfo = randomize(cardCount);
  let front = document.querySelectorAll('.front');
  let card = document.querySelectorAll('.card');
  let back = document.createElement('div');
  cardInfo.forEach((item, i) => {
    card[i].classList.remove('toggleCard');
    // reset and randomize cards
    setTimeout(() => {
      card[i].style.pointerEvents = 'all';
      front[i].src = item.imgSrc;
      card[i].setAttribute('name', item.name);
      card[i].setAttribute('alt', item.name);
      back.setAttribute('alt', 'Question mark');
      back.setAttribute('aria-label', 'Flip Card');
    }, 1000);
  });
  displayLives.textContent = playerLives;
};

//generate the game
if(gameArea){
  cardGen(difficulty);
  //button for reset
  document.getElementById('reset').onclick = resetGame;
};

//set images and sound effects for game end screen
if(result === 'lose') {
  background.style.backgroundImage = 'url("./assets/images/gameover.webp")';
  window.onload = function() {
    playSound(gameOverSound);
  };
} else if (result === 'win') {
  background.style.backgroundImage = 'url("./assets/images/youwin.webp")';
  window.onload =function() {
    playSound(winSound);
  };
};

//add elevator music for intro and gameplay (because i found it funny)
if(intro || gameArea) {
  window.addEventListener('click', function () {
    playSound(introSound);
  });
};

//Add button sounds
if(intro) {
  startButtonEasy.addEventListener('click', function(event) {
    event.preventDefault(); // prevent default button behavior
    playSound(buttonSound); // play sound effect
    setTimeout(function() { // wait for sound effect to finish
      window.location.href = startButtonEasy.href; // Follow link
    }, buttonSound.duration * 1000); // multiply duration by 1000 to convert to milliseconds
  });

  startButtonMedium.addEventListener('click', function(event) {
    event.preventDefault(); // prevent default button behavior
    playSound(buttonSound); // play sound effect
    setTimeout(function() { // wait for sound effect to finish
      window.location.href = startButtonMedium.href; // Follow link
    }, buttonSound.duration * 1000); // multiply duration by 1000 to convert to milliseconds
  });
  
  startButtonHard.addEventListener('click', function(event) {
    event.preventDefault(); // prevent default button behavior
    playSound(buttonSound); // play sound effect
    setTimeout(function() { // wait for sound effect to finish
      window.location.href = startButtonHard.href; // Follow link
    }, buttonSound.duration * 1000); // multiply duration by 1000 to convert to milliseconds
  });
}

if(background) {
  startButtonReset.addEventListener('click', function(event) {
    event.preventDefault(); // prevent default button behavior
    playSound(buttonSound); // play sound effect
    setTimeout(function() { // wait for sound effect to finish
      let url = `game.html?difficulty=${storedDifficulty}`;
      window.location.href = url; // Follow link
    }, buttonSound.duration * 1000); // multiply duration by 1000 to convert to milliseconds
  });
  
  endButton.addEventListener('click', function (event) {
    event.preventDefault(); // Stop default behavior
    playSound(buttonSound); // Play sound effect
    setTimeout(function() { // Wait for sound effect to finish
      window.location.href = endButton.href; // Follow link
    }, buttonSound.duration * 1000); // Multiply duration by 1000 to convert to milliseconds
  });
};

