import './style.css'

async function getTheApi() {
  const json = await fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/femmes-illustres-a-paris-portraits/records?limit=20`);
  const theJson = await json.json();
  return theJson;
}
const theJson = await getTheApi();
let searchArray = []; // To fill with appropriate content from json depending on search
let j = 0; // last index of displayed infos
const searchBarSection = document.querySelector("#searchBarSection");
const loadingScreen = document.querySelector("#loadingScreen");
const displaySection = document.querySelector("#displaySection");
const seeMoreSection = document.querySelector("#seeMoreSection");

const loadMoreButton = document.getElementById("loadMore");
loadMoreButton.addEventListener("click", fiveMore);

function disappearWithSmoke(element) {
  return new Promise((resolve) => {
    element.classList.add('smoke-disappear');
    
    element.addEventListener('animationend', () => {
      element.style.display = 'none';
      resolve();
    }, { once: true });
  });
}
function fiveMore(){
  for (let i = j ; i < j+5 ; i = i + 1){
    const divBox = document.createElement(`div`);
    const photoUrl = document.createElement(`img`);
    const divBoxMini = document.createElement(`div`);
    const titre = document.createElement(`h1`);
    const description = document.createElement(`p`);
    const button = document.createElement(`button`);
    const displaySection = document.getElementById("displaySection");
    
    divBox.classList.add(`containerBox`);
    photoUrl.src = theJson.results[i].photos.url; 
    divBoxMini.classList.add(`containerBox2`);
    titre.textContent = theJson.results[i].name;
    description.textContent = theJson.results[i].desc1;
    button.addEventListener("click", () =>{
      seeMore(i);
    });
    button.textContent = "See More";

    displaySection.appendChild(divBox);
    divBox.appendChild(photoUrl);
    divBox.appendChild(divBoxMini);
    divBoxMini.appendChild(titre);
    divBoxMini.appendChild(description);
    divBoxMini.appendChild(button);
  }
j = j + 5 //used to start display at stopped state
};
fiveMore();

function launchSearch(searchString){ // searchString probably the result of an input

};
async function seeMore(index){ // value is stored in correct button already.
  loadMoreButton.classList.add("hidden");
  await disappearWithSmoke(displaySection);
  displaySection.classList.remove("hidden");
  displaySection.classList.add("slide-in-bounce");
  displaySection.style.display = '';

};
function seeLess(){

};