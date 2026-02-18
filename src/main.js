import './style.css';
import * as stuff from "../functions.js";

async function getTheApi() {
  const json = await fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/femmes-illustres-a-paris-portraits/records?limit=100`);
  const theJson = await json.json();
  return theJson;
}
const theJson = await getTheApi();
console.log(theJson.results.length);
let j = 0; // last index of displayed infos
const searchBarSection = document.querySelector("#searchBarSection");
const loadingScreen = document.querySelector("#loadingScreen");
const displaySection = document.querySelector("#displaySection");
const seeMoreSection = document.querySelector("#seeMoreSection");
console.log(seeMoreSection);
const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", () =>{
  const inPut = document.querySelector("#input").value;
  launchSearch(inPut);
})
seeMoreSection.style.display = 'none';
let currentDisplay = displaySection;
let lastDisplay = displaySection;
let checkForSeeLess ;

function disappearWithSmoke(element) {
  return new Promise((resolve) => {
    element.classList.add('smoke-disappear');
    
    element.addEventListener('animationend', () => {
      element.style.display = 'none';
      resolve();
    }, { once: true });
  });
}
async function displayDisappear(displayed){
  stuff.resetClass(displayed);
  await disappearWithSmoke(displayed);
}
function displayAppear(displayed){
  stuff.resetClass(displayed);
  displayed.classList.add("slide-in-bounce");
}
let moreButton ;
function fiveMore(){
  
  if(moreButton){
    moreButton.remove();
  }
  for (let i = j ; i < j+5 ; i = i + 1){
    const divBox = document.createElement(`div`);
    const photoUrl = document.createElement(`img`);
    const divBoxMini = document.createElement(`div`);
    const titre = document.createElement(`h1`);
    const description = document.createElement(`p`);
    const button = document.createElement(`button`);
    
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
  moreButton = document.createElement(`button`);
  moreButton.textContent = `Load More`;
  moreButton.addEventListener("click", fiveMore);
  displaySection.appendChild(moreButton);
j = j + 5 //used to start display at stopped state
};
fiveMore();

async function launchSearch(searchString){ // searchString probably the result of an input
  currentDisplay = searchBarSection;
  const searchArray = [];// To fill with appropriate content from json depending on search
  for (let i = 0 ; i < theJson.results.length ; i = i + 1){
    let check = 0;
    if (theJson.results[i]["name"].toLowerCase().includes(searchString.toLowerCase().trim()) == true){
      check = 1;
      searchArray.push(i);
    }
  }
  for (let i = 0 ; i < theJson.results.length ; i = i + 1){
    let h = 1;
    let check = 0;
    while(theJson.results[i][`desc${h}`] != null && theJson.results[i][`desc${h}`] != undefined){
      if (theJson.results[i][`desc${h}`].toLowerCase().includes(searchString.toLowerCase().trim()) == true){
        check = 1;
      }    
      h = h + 1;
    }
    if(check == 1){
      if(!searchArray.includes(i)){
        searchArray.push(i);
      }
    }
  }
  await displayDisappear(lastDisplay);
  searchBarSection.replaceChildren();
  const namecheck = [];
  for (let i = 0 ; i < searchArray.length ; i = i + 1){
    if(!namecheck.includes(theJson.results[searchArray[i]].name)){
    
      namecheck.push(theJson.results[searchArray[i]].name);
      const divBox = document.createElement(`div`);
      const photoUrl = document.createElement(`img`);
      const divBoxMini = document.createElement(`div`);
      const titre = document.createElement(`h1`);
      const description = document.createElement(`p`);
      const button = document.createElement(`button`);
      
      divBox.classList.add(`containerBox`);
      photoUrl.src = theJson.results[searchArray[i]].photos.url; 
      divBoxMini.classList.add(`containerBox2`);
      titre.textContent = theJson.results[searchArray[i]].name;
      description.textContent = theJson.results[searchArray[i]].desc1;
      button.addEventListener("click", () =>{
        seeMore(searchArray[i]);
      });
      button.textContent = "See More";
      
      searchBarSection.appendChild(divBox);
      divBox.appendChild(photoUrl);
      divBox.appendChild(divBoxMini);
      divBoxMini.appendChild(titre);
      divBoxMini.appendChild(description);
      divBoxMini.appendChild(button);
    }        
  }

  displayAppear(currentDisplay);
  lastDisplay = currentDisplay;
  console.log(seeMoreSection);
};

async function seeMore(index){ // value is stored in correct button already.
  currentDisplay = seeMoreSection;
  console.log(seeMoreSection);
  stuff.emptySection(seeMoreSection);
  const divBox = document.createElement(`div`);
  const photoUrl = document.createElement(`img`);
  const divBoxMini = document.createElement(`div`);
  const titre = document.createElement(`h1`);
  const description = document.createElement(`p`);
  const button = document.createElement(`button`);
  
  divBox.classList.add(`containerBox`);
  photoUrl.src = theJson.results[index].photos.url; 
  divBoxMini.classList.add(`containerBox2`);
  titre.textContent = theJson.results[index].name;
  let j = 1;
  while(theJson.results[index][`desc${j}`] != null && theJson.results[index][`desc${j}`] != undefined){
    description.textContent = description.textContent + theJson.results[index][`desc${j}`];
    j = j + 1;
  }
  button.addEventListener("click", () =>{
    seeLess();
  });
  button.textContent = "See Less";

  seeMoreSection.appendChild(divBox);
  divBox.appendChild(photoUrl);
  divBox.appendChild(divBoxMini);
  divBoxMini.appendChild(titre);
  divBoxMini.appendChild(description);
  divBoxMini.appendChild(button);

  await displayDisappear(lastDisplay);
  if(lastDisplay == searchBarSection){
    checkForSeeLess = 0;
  }
  else{checkForSeeLess = 1;}
  displayAppear(currentDisplay);
  lastDisplay = currentDisplay;
};

async function seeLess(){
  await displayDisappear(currentDisplay);
  if(checkForSeeLess = 0){
    displayAppear(searchBarSection);
    lastDisplay=searchBarSection;
  }
  else{
    displayAppear(displaySection);
    lastDisplay=displaySection;
  }
};