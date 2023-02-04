/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById('games-container');

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    // create a new div element, which will become the game card

    // add the class game-card to the list

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")

    // append the game to the games-container
    console.log(i);
    document.getElementById(
      'games-container'
    ).innerHTML += ` <div class="game-card">
    <img class='game-img' src="${games[i].img}"/>  
    <h3>${games[i].name}</h3> 
    <p>${games[i].description}</p> 
    <p>Goal: $${games[i].goal}</p> 
    <p>Pledged: $${games[i].pledged}</p> <p>Backers: ${games[i].backers}</p> </div> `;
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById('num-contributions');

// use reduce() to count the number of total contributions by summing the backers
contributionsCard.innerHTML = GAMES_JSON.reduce((acc, item) => {
  return acc + item.backers;
}, 0).toLocaleString();

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `$${contributionsCard.innerHTML}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById('total-raised');

// set inner HTML using template literal
raisedCard.innerHTML = `$${GAMES_JSON.reduce((acc, item) => {
  return acc + item.pledged;
}, 0).toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById('num-games');

// set inner HTML using template literal
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfunded_games = GAMES_JSON.filter((item) => {
    return item.pledged < item.goal;
  });

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfunded_games);

  return unfunded_games;
}

console.log(filterUnfundedOnly());

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const funded_games = GAMES_JSON.filter((item) => {
    return item.pledged >= item.goal;
  });

  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(funded_games);

  return funded_games;
}

console.log(filterFundedOnly());

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById('unfunded-btn');
const fundedBtn = document.getElementById('funded-btn');
const allBtn = document.getElementById('all-btn');

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById('description-container');

// use filter or reduce to count the number of unfunded games
const unfunded_games = GAMES_JSON.filter((item) => {
  return item.pledged < item.goal;
});

let sum = 0;

// use filter or reduce to count the number of funded games
const funded_games = GAMES_JSON.filter((item) => {
  item.pledged >= item.goal ? (sum += item.pledged) : null;
  return item.pledged >= item.goal;
});

const displayStr = `A total of $${sum.toLocaleString()} has been raised for ${
  funded_games.length
} games. 
Currently, there are ${
  unfunded_games.length
} games that are unfunded. We need your help to fund these games!`;

console.log(displayStr);

// create a string that explains the number of unfunded games using the ternary operator
const unfundedString = `There are currently ${unfunded_games.length} games that are unfunded. `;

// create a new DOM element containing the template string and append it to the description container
const unfundedElement = document.createElement('p');
unfundedElement.innerHTML = unfundedString;
descriptionContainer.appendChild(unfundedElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById('first-game');
const secondGameContainer = document.getElementById('second-game');

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const first_game = [...sortedGames][0];
const second_game = [...sortedGames][1];

console.log(first_game);
console.log(second_game);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameName = document.createElement('h3');
firstGameName.innerHTML = first_game.name;
firstGameContainer.appendChild(firstGameName);

// do the same for the runner up item
const secondGameName = document.createElement('h3');
secondGameName.innerHTML = second_game.name;
secondGameContainer.appendChild(secondGameName);

// dark theme
const darkThemeBtn = document.getElementById('dark-theme');
const lightThemeBtn = document.getElementById('light-theme');
const title = document.getElementById('title');
const title2 = document.getElementById('title2');
const title3 = document.getElementById('title3');
const description = document.getElementById('description-container');
const text = document.getElementById('text');

darkThemeBtn.addEventListener('click', () => {
  document.body.classList.add('dark-mode');
  document.body.style.backgroundColor = '#000';
  title.style.color = '#fff';
  title2.style.color = '#fff';
  title3.style.color = '#fff';
  description.style.color = '#fff';
  text.style.color = '#fff';
  document.body.classList.remove('light-mode');
});

lightThemeBtn.addEventListener('click', () => {
  document.body.classList.add('light-mode');
  document.body.style.backgroundColor = '#758190';
  title.style.color = '#000';
  title2.style.color = '#000';
  title3.style.color = '#000';
  description.style.color = '#000';
  text.style.color = '#000';
  document.body.classList.remove('dark-mode');
});
