const gameContainer = document.getElementById("game");
let end = document.querySelector(".theEnd");
let restart = document.querySelector(".restart");
let shown = 0;
let first = null;
let second = null;
let blocked = false;

const FLAVORS = [
  "https://www.jessiesheehanbakes.com/wp-content/uploads/2014/07/IMG_75B0899B93A6-1-1200x1188.jpeg",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190611-coconut-ice-cream-009-portrait-pf-1561393438.png?crop=1.00xw:0.668xh;0,0.154xh&resize=980:*",
  "https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg",
  "https://minimalistbaker.com/wp-content/uploads/2015/08/AMAZING-5-Ingredient-Vanilla-Coconut-Ice-Cream-Incredibly-simple-perfectly-sweet-INSANELY-creamy-vegan-glutenfree-icecream-dessert-recipe-vanilla-coconuticecream-coconut.jpg",
  "https://v1019.com/wp-content/uploads/sites/51/2021/06/shutterstock_1061412119-scaled.jpg",
  "https://www.milkmaid.in/sites/default/files/2022-03/Strawberry-IceCream-590x436.jpg",
  //matches
  "https://www.jessiesheehanbakes.com/wp-content/uploads/2014/07/IMG_75B0899B93A6-1-1200x1188.jpeg",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190611-coconut-ice-cream-009-portrait-pf-1561393438.png?crop=1.00xw:0.668xh;0,0.154xh&resize=980:*",
  "https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg",
  "https://minimalistbaker.com/wp-content/uploads/2015/08/AMAZING-5-Ingredient-Vanilla-Coconut-Ice-Cream-Incredibly-simple-perfectly-sweet-INSANELY-creamy-vegan-glutenfree-icecream-dessert-recipe-vanilla-coconuticecream-coconut.jpg",
  "https://v1019.com/wp-content/uploads/sites/51/2021/06/shutterstock_1061412119-scaled.jpg",
  "https://www.milkmaid.in/sites/default/files/2022-03/Strawberry-IceCream-590x436.jpg"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledFlavors = shuffle(FLAVORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForFlavors(flavorsArray) {
  for (let flavor of flavorsArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.style.backgroundImage = "url(https://img.freepik.com/free-vector/seamless-pattern-sprinkles_165705-153.jpg?w=2000)";
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(flavor);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(blocked) return;
  if (event.target.classList.contains('flipped')) return;

  let current = event.target;
  current.style.backgroundImage = "url('" + current.classList[0] + "')";
  // current.style.transition = "all .3s";

  if (!first || !second){
    current.classList.add('flipped');
    first = first || current;

    if (current === first){
      second = null;
    } else {
      second = current;
    }
  }



  //checks for a match between first and second card
  if(first && second) {
    blocked = true;

    let color1 = first.className;
    let color2 = second.className;

    if(color1 === color2){
      shown += 2;
      first.removeEventListener('click', handleCardClick);
      second.removeEventListener('click', handleCardClick);

      //reset first and second card
      first = null;
      second= null;
      blocked = false;
    } else {
      //if colors are not a match return the set of cards to their original form/color
      setTimeout(function(){
        first.style.backgroundImage = "url(https://img.freepik.com/free-vector/seamless-pattern-sprinkles_165705-153.jpg?w=2000)";
        second.style.backgroundImage = "url(https://img.freepik.com/free-vector/seamless-pattern-sprinkles_165705-153.jpg?w=2000)";

        first.classList.remove('flipped');
        second.classList.remove('flipped');

        first = null;
        second = null;
        blocked = false;
      }, 800)
      }
    }

    if(shown === FLAVORS.length) {
      end.style.display = 'block';
    }
  }

// when the DOM loads
createDivsForFlavors(shuffledFlavors);


restart.addEventListener('click', e => {
  window.location.reload();
});
