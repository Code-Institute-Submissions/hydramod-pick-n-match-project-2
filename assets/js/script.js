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
let gameArea = document.querySelector('.game');
let displayLives = document.querySelector('.lives');
let playerLives = 6;

// set player lives
displayLives.textContent = playerLives;

//get images and put into array
let getImages = () => [
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
  {imgSrc: "./assets/images/owl.jpg", name: "lion"},
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
  {imgSrc: "./assets/images/owl.jpg", name: "lion"},
  {imgSrc: "./assets/images/ram.jpg", name: "ram"},
  {imgSrc: "./assets/images/stag.jpg", name: "stag"},
  {imgSrc: "./assets/images/tiger.jpg", name: "tiger"},
  {imgSrc: "./assets/images/wolf.jpg", name: "wolf"}
];

//randomize images array
let randomize = () => {
  let pics = getImages();
  pics.sort(() => Math.random() - 0.5);
  return pics;
};

//game generate
let picGen = () => {
  let pics = randomize();

  //generate html, looping through all images
  pics.forEach(item => {
    let card = document.createElement('div');
    let face = document.createElement('img');
    let back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';

    //Adding image source
    face.src = item.imgSrc;

    //Dsiplay pics on screen
    gameArea.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

  });
};

picGen();